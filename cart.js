function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear the container before adding items
  
    let totalPrice = 0;
    for (let item of cartItems) {
      const itemHTML = generateCartItemHTML(item);
      cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
      totalPrice += item.price;
    }
  
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = "Total Price: $" + totalPrice;
  }
  
  function generateCartItemHTML(item) {
    return `
      <div class="cart-item">
        <p>Item: ${item.name}</p>
        <p>Price: $${item.price}</p>
      </div>
    `;
  }
  
  // Call the displayCartItems function when the page loads
  window.addEventListener("DOMContentLoaded", displayCartItems);
  
  // Ensure the cart items are displayed immediately after adding to cart
  displayCartItems();