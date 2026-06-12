function toggleCard(card)
{
card.classList.toggle("active");
}

function toggleAnniversary()
{
const popup =
document.getElementById("anniversaryPopup");

```
if(popup.style.display === "flex")
{
    popup.style.display = "none";
}
else
{
    popup.style.display = "flex";
}
```

}
