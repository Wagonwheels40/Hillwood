function parseQueryString() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get('cartItems');
}

function updateDisplayedCartItems(cartItemsData) {
  if (cartItemsData) {
    const cartItems = JSON.parse(decodeURIComponent(cartItemsData));
    const orderItemsElement = document.querySelector('.order-items');

    let orderItemsHTML = '';
    let totalAmount = 0;

    cartItems.forEach((item) => {
      orderItemsHTML += `${item.name} - $${item.price}<br>`;
      totalAmount += item.price;
    });

    orderItemsHTML += `Total Amount: $${totalAmount}`;
    orderItemsElement.innerHTML = orderItemsHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsData = parseQueryString();
  if (cartItemsData) {
    updateDisplayedCartItems(cartItemsData);
  }
});
