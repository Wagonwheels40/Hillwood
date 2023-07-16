const stockItems = [
  {
      name: "Fruit Tree (Apple)",
      price: 25,
      imgSrc: "/images/apple.jpg"
  },
  {
      name: "Fruit Tree (Olive)",
      price: 5,
      imgSrc: "/images/olive.jpg"
  },
  {
      name: "Shade Tree (Oak)",
      price: 25,
      imgSrc: "/images/oak.jpg"
  },
  {
      name: "Shade Tree (Maple)",
      price: 25,
      imgSrc: "/images/maple.jpg"
  },
  {
      name: "Evergreen Tree (Pine)",
      price: 25,
      imgSrc: "/images/pine.jpg"
  },
  {
      name: "Evergreen Tree (Fir)",
      price: 25,
      imgSrc: "/images/fir.jpg"
  },
];

function generateStockItemHTML(item) {
  const inputId = `quantity-${item.name.replace(/\s+/g, '-').toLowerCase()}`;

  return `
  <div class="stock-item-container">
      <div class="stock-item">
          <div class="card">
              <img src="${item.imgSrc}" alt="${item.name}">
              <div class="card-body">
                  <h2>${item.name}</h2>
                  <h5>Price: $${item.price}</h5>
                  <div class="quantity">
                      <a href="#" class="quantity__minus" onclick="decrement('${inputId}')"><span>-</span></a>
                      <input name="quantity" id="${inputId}" type="text" class="quantity__input" value="1">
                      <a href="#" class="quantity__plus" onclick="increment('${inputId}')"><span>+</span></a>
                  </div>
                  <div class="cart-buttons">
                      <a class="btn btn-primary" data-name="${item.name}" data-price="${item.price}" data-field="${inputId}" onclick="addToCart('${item.name}', ${item.price}, '${inputId}')">Add to Cart</a>
                  </div>
                  <br>
              </div>
          </div>
      </div>
  </div>
  `;
}

const stockContainer = document.getElementById("trees");
for (let item of stockItems) {
  const itemHTML = generateStockItemHTML(item);
  stockContainer.insertAdjacentHTML("beforeend", itemHTML);
}

function increment(inputId) {
  const inputElement = document.getElementById(inputId);
  let value = parseInt(inputElement.value);
  value++;
  inputElement.value = value;
}

function decrement(inputId) {
  const inputElement = document.getElementById(inputId);
  let value = parseInt(inputElement.value);
  if (value > 1) {
      value--;
  }
  inputElement.value = value;
}

function addToCart(itemName, itemPrice, inputId) {
  const quantityInput = document.getElementById(inputId);
  const quantity = parseInt(quantityInput.value);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (let i = 0; i < quantity; i++) {
    cartItems.push({ name: itemName, price: itemPrice });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const cartItemCount = document.getElementById('cart-count');
  cartItemCount.innerText = cartItems.length;

  alert(quantity + " item(s) added to cart!");

  quantityInput.value = "1";

  // Encode the cart items data in the URL and redirect to checkout.html
  const encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));
  window.location.href = `checkout.html?cartItems=${encodedCartItems}`;
}

function checkout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // You can proceed to the checkout page with cartItems data or perform further operations as needed.
  console.log(cartItems);
}

// Initialize cart item count
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartItemCount = document.getElementById('cart-count');
cartItemCount.innerText = cartItems.length;
