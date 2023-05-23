const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const checkoutItemsContainer = document.getElementById("checkout-items");

// Generate HTML for each item in the cart
function generateCheckoutItemHTML(item) {
  return `
    <div class="checkout-item">
      <p>Item: ${item.name}</p>
      <p>Price: $${item.price}</p>
    </div>
  `;
}

// Loop through cart items and generate HTML for each item in the checkout page
for (let item of cartItems) {
  const checkoutItemHTML = generateCheckoutItemHTML(item);
  checkoutItemsContainer.insertAdjacentHTML("beforeend", checkoutItemHTML);
}
