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
          <a href="#" class="quantity__minus"><span>-</span></a>
          <input name="quantity" type="text" class="quantity__input" value="1">
          <a href="#" class="quantity__plus"><span>+</span></a>
        </div>
        <div class="cart-buttons">
        <a class="btn btn-primary" data-name="${item.name}" data-price="${item.price}" data-field="${inputId}">Add to Cart</a>
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

$(document).ready(function() {
  const minus = $('.quantity__minus');
  const plus = $('.quantity__plus');
  const input = $('.quantity__input');

  minus.click(function(e) {
    e.preventDefault();
    var inputElement = $(this).siblings('.quantity__input');
    var value = parseInt(inputElement.val());
    if (value > 1) {
      value--;
    }
    inputElement.val(value);
  });

  plus.click(function(e) {
    e.preventDefault();
    var inputElement = $(this).siblings('.quantity__input');
    var value = parseInt(inputElement.val());
    value++;
    inputElement.val(value);
  });
});

function addToCart(itemName, itemPrice, inputId) {
  const quantityInput = $('#' + inputId);
  const quantity = parseInt(quantityInput.val());

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (let i = 0; i < quantity; i++) {
    cartItems.push({ name: itemName, price: itemPrice });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const cartItemCount = $('#cart-count');
  cartItemCount.text(cartItems.length);

  alert(quantity + " item(s) added to cart!");

  quantityInput.val("1");
}

const addToCartButtons = $('.cart-buttons .btn');
for (let button of addToCartButtons) {
  button.addEventListener("click", function() {
    const itemName = button.getAttribute("data-name");
    const itemPrice = parseFloat(button.getAttribute("data-price"));
    const inputId = button.getAttribute("data-field");
    addToCart(itemName, itemPrice, inputId);
  });
}
