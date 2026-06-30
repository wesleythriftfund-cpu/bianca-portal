import {
    db,
    collection,
    getDocs
} from "./firebase.js";

// Toggle cards
function toggleCard(card)
{
    card.classList.toggle("active");
}

// Make available to HTML onclick=""
window.toggleCard = toggleCard;

// ===========================
// Load Journal Entries
// ===========================
async function loadJournal()
{
    try
    {
        const querySnapshot = await getDocs(collection(db, "journal"));

        console.log("Journal Entries:");

        querySnapshot.forEach((doc) =>
        {
            console.log(doc.data());
        });
    }
    catch(error)
    {
        console.error("Error loading journal:", error);
    }
}

// ===========================
// Days Together
// ===========================
window.onload = function()
{
    const anniversaryDate = new Date(2026, 4, 16);

    const today = new Date();

    const difference = today - anniversaryDate;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const daysElement =
        document.getElementById("daysTogether");

    if(daysElement)
    {
        daysElement.innerHTML =
            days + " days ❤️";
    }

    console.log("Firebase Connected!", db);

    // Load journal entries from Firebase
    loadJournal();
};
