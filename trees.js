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
    // Generate a unique ID for the input field using the item name
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
          <button class="btn btn-success" onclick="addToCart('${item.name}', ${item.price}, '${inputId}')">Add to Cart</button>
      </div>
    `;
  }
  
 
const stockContainer = document.getElementById("trees");
for (let item of stockItems) {
  const itemHTML = generateStockItemHTML(item);
  stockContainer.insertAdjacentHTML("beforeend", itemHTML);
}

function incrementQuantity(button) {
  const input = button.parentNode.parentNode.querySelector("input[name='quantity']");
  const currentValue = parseInt(input.value);
  if (currentValue < 10) {
    input.value = currentValue + 1;
  }
}

function decrementQuantity(button) {
  const input = button.parentNode.parentNode.querySelector("input[name='quantity']");
  const currentValue = parseInt(input.value);
  if (currentValue > 1) {
    input.value = currentValue - 1;
  }
}

function addToCart(itemName, itemPrice, inputId) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const quantity = parseInt(document.getElementById(inputId).value);

  for (let i = 0; i < quantity; i++) {
    cartItems.push({ name: itemName, price: itemPrice });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  const cartLabel = document.getElementById("cart");
  const cartItemCount = document.getElementById("cart-items");
  cartItemCount.textContent = cartItems.length;
  updateCartLabel(cartItems.length);

  // Optionally, you can display a confirmation message
  alert(quantity + " item(s) added to cart!");

  // Clear the input field after adding to cart
  document.getElementById(inputId).value = "1";
}

function updateCartLabel(itemCount) {
  const cartLabel = document.getElementById("cart");
  cartLabel.textContent = `Cart: ${itemCount} item${itemCount === 1 ? "" : "s"}`;
}

function redirectToCheckout() {
    window.location.href = "checkout.html";
  }
  
  const cartLogo = document.getElementById("shopping-cart");
  cartLogo.addEventListener("click", redirectToCheckout);
  
