const stockItems = [
  {
      name: "Fruit Tree (Apple)",
      price: 25,
      imgSrc: "path/to/image1.jpg"
  },
  {
      name: "Fruit Tree (Pear)",
      price: 10,
      imgSrc: "path/to/image2.jpg"
  },
  {
      name: "Fruit Tree (Olive)",
      price: 5,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Shade Tree (Oak)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Shade Tree (Maple)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Evergreen Tree (Pine)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Evergreen Tree (Fir)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Ornamental Tree (Magnolia)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Flowering Tree (Cherry)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
  {
      name: "Conifers Tree (Juniper)",
      price: 25,
      imgSrc: "path/to/image3.jpg"
  },
];

function generateStockItemHTML(item) {
const inputId = `quantity-${item.name.replace(/\s+/g, '-').toLowerCase()}`;

return `
  <div class="col-md-6">
    <p>Item: ${item.name}</p>
    <p>Price: $${item.price}</p>
    <div class="input-group">
      <span class="input-group-btn">
        <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="${inputId}">
          <span class="glyphicon glyphicon-minus"></span>
        </button>
      </span>
      <input type="text" id="${inputId}" name="quantity" class="form-control input-number" value="1" min="1" max="10">
      <span class="input-group-btn">
        <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="${inputId}">
          <span class="glyphicon glyphicon-plus"></span>
        </button>
      </span>
    </div>
    <br>
    <button class="btn btn-success add-to-cart-button" data-name="${item.name}" data-price="${item.price}" data-field="${inputId}">Add to Cart</button>
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
