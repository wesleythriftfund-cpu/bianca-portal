function toggleCard(card)
{
    card.classList.toggle("active");
}

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
};
