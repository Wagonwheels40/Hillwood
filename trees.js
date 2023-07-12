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
        <p>Price: $${item.price}</p>
        <div class="quantity">
          <a href="#" class="quantity__minus"><span>-</span></a>
          <input name="quantity" type="text" class="quantity__input" value="1">
          <a href="#" class="quantity__plus"><span>+</span></a>
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

function incrementQuantity(inputId) {
const input = document.getElementById(inputId);
const currentValue = parseInt(input.value);
if (currentValue < 10) {
  input.value = currentValue + 1;
}
}

function decrementQuantity(inputId) {
const input = document.getElementById(inputId);
const currentValue = parseInt(input.value);
if (currentValue > 1) {
  input.value = currentValue - 1;
}
}

function addToCart(itemName, itemPrice, inputId) {
const quantityInput = document.getElementById(inputId);
const quantity = parseInt(quantityInput.value);

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

for (let i = 0; i < quantity; i++) {
  cartItems.push({ name: itemName, price: itemPrice });
}

localStorage.setItem("cartItems", JSON.stringify(cartItems));

const cartItemCount = document.getElementById("cart-items");
cartItemCount.textContent = cartItems.length;

alert(quantity + " item(s) added to cart!");

quantityInput.value = "1";
}

const addToCartButtons = document.getElementsByClassName("add-to-cart-button");
for (let button of addToCartButtons) {
button.addEventListener("click", function() {
  const itemName = button.getAttribute("data-name");
  const itemPrice = parseFloat(button.getAttribute("data-price"));
  const inputId = button.getAttribute("data-field");
  addToCart(itemName, itemPrice, inputId);
});
}

const decrementButtons = document.querySelectorAll('.btn-number[data-type="minus"]');
for (let button of decrementButtons) {
const inputId = button.getAttribute("data-field");
button.addEventListener("click", function() {
  decrementQuantity(inputId);
});
}

const incrementButtons = document.querySelectorAll('.btn-number[data-type="plus"]');
for (let button of incrementButtons) {
const inputId = button.getAttribute("data-field");
button.addEventListener("click", function() {
  incrementQuantity(inputId);
});
}
