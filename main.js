// Get the input element and add event listeners to the plus and minus buttons
const quantityInput = document.getElementById("quantity");
document.querySelectorAll(".btn-number").forEach(button => {
    button.addEventListener("click", () => {
        const increment = button.getAttribute("data-type") === "plus" ? 1 : -1;
        const newValue = Math.max(parseInt(quantityInput.value) + increment, 1);
        quantityInput.value = newValue;
    });
});

// Add event listener to the add to cart button
const addToCartButton = document.querySelector(".btn-success");
addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);
    addToCard(quantity);
    quantityInput.value = "1";
});

// Function to add the quantity to the cart 
function addToCard(quantity) {
    // Add code here to add the quantity to the cart
}