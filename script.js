function toggleCard(card)
{
    card.classList.toggle("active");
}

const anniversaryDate = new Date("2026-05-16");

const today = new Date();

const difference = today - anniversaryDate;

const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
);

document.addEventListener("DOMContentLoaded", function()
{
    const daysElement =
    document.getElementById("daysTogether");

    if(daysElement)
    {
        daysElement.innerHTML =
        days + " Days ❤️";
    }
});
