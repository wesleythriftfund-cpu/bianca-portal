import {
    db,
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    query,
    orderBy
} from "./firebase.js";

// ==========================
// Elements
// ==========================

const journalContainer = document.getElementById("journalEntries");
const saveButton = document.getElementById("saveEntry");
const authorInput = document.getElementById("author");
const messageInput = document.getElementById("message");

let pages = [];
let currentPage = 0;

// ==========================
// Load Book
// ==========================

async function loadBook()
{
    try
    {

        const journalQuery = query(

            collection(db, "journal"),

            orderBy("createdAt", "asc")

        );

        const snapshot = await getDocs(journalQuery);

        const entries = [];

        snapshot.forEach(doc =>
        {

            entries.push(doc.data());

        });

        buildPages(entries);

    }

    catch(error)
    {

        console.error(error);

    }

}

// ==========================
// Build Pages
// ==========================

function buildPages(entries)
{

    const grouped = {};

    entries.forEach(entry =>
    {

        if(!entry.createdAt)
        {
            return;
        }

        const dateKey =
        entry.createdAt
        .toDate()
        .toLocaleDateString("en-GB");

        if(!grouped[dateKey])
        {

            grouped[dateKey] = [];

        }

        grouped[dateKey].push(entry);

    });

    pages = Object.entries(grouped);

    // Always open today's page if it exists

    const today =
    new Date().toLocaleDateString("en-GB");

    const todayIndex =
    pages.findIndex(page => page[0] === today);

    if(todayIndex >= 0)
    {

        currentPage = todayIndex;

    }
    else
    {

        currentPage = pages.length - 1;

    }

    renderPage();

    updateNavigation();

}

// ==========================
// Render Current Page
// ==========================

function renderPage()
{

    const pageDate =
    document.getElementById("pageDate");

    const pageDay =
    document.getElementById("pageDay");

    const pageNumber =
    document.getElementById("currentPage");

    journalContainer.innerHTML = "";

    // No pages yet
    if(pages.length === 0)
    {

        const today = new Date();

        pageDate.textContent =
        today.toLocaleDateString(
            "en-GB",
            {
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        );

        pageDay.textContent =
        today.toLocaleDateString(
            "en-GB",
            {
                weekday:"long"
            }
        );

        pageNumber.textContent =
        " 1";

        journalContainer.innerHTML = `
            <p class="emptyPage">
                Today is waiting for its first memory ❤️
            </p>
        `;

        return;

    }

    const [dateKey, entries] = pages[currentPage];

    const date =
    new Date(
        dateKey.split("/").reverse().join("-")
    );

    pageDate.textContent =
    date.toLocaleDateString(
        "en-GB",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    pageDay.textContent =
    date.toLocaleDateString(
        "en-GB",
        {
            weekday:"long"
        }
    );

    pageNumber.textContent =
    currentPage + 1;
    entries.forEach(entry =>
    {

        const note =
        document.createElement("div");

        note.className = "entry";

        note.innerHTML = `
            <p>${entry.message}</p>
            <small>${entry.author}</small>
        `;

        journalContainer.appendChild(note);

    });

}

// ==========================
// Previous
// ==========================

document
.getElementById("previousPage")
.addEventListener("click", () =>
{

    if(currentPage === 0)
    {
        return;
    }

    currentPage--;

    renderPage();

    updateNavigation();

});

// ==========================
// Next
// ==========================

document
.getElementById("nextPage")
.addEventListener("click", () =>
{

    if(currentPage >= pages.length - 1)
    {
        return;
    }

    currentPage++;

    renderPage();

    updateNavigation();

});

// ==========================
// Navigation Buttons
// ==========================

function updateNavigation()
{

    const previous =
    document.getElementById("previousPage");

    const next =
    document.getElementById("nextPage");

    previous.disabled =
    currentPage === 0;

    next.disabled =
    currentPage === pages.length - 1;

}

// ==========================
// Save Entry
// ==========================

saveButton.addEventListener("click", async () =>
{

    const message =
    messageInput.value.trim();

    if(message === "")
    {

        alert("Write something first ❤️");

        return;

    }

    try
    {

        await addDoc(
            collection(db,"journal"),
            {

                author: authorInput.value,

                message: message,

                createdAt: serverTimestamp()

            }
        );

        messageInput.value = "";

        await loadBook();

    }

    catch(error)
    {

        console.error(error);

    }

});

// ==========================
// Start
// ==========================

loadBook();