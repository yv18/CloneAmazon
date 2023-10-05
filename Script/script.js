const scrollButton = document.getElementById("btn1");
scrollButton.addEventListener("click", scrollToTop);
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

// store data for the product
let products = [
  {
    id: 1,
    name: "I-phone 12 mini",
    image: "../Images/iphone12.jpg",
    price: 459,
    category: "Smartphone",
  },
  {
    id: 2,
    name: "Galaxy Note 10",
    image: "../Images/Galaxy Note 10.jpg",
    price: 256,
    category: "Smartphone",
  },
  {
    id: 3,
    name: "Apple MacBook Air Laptop",
    image: "../Images/Apple 2020 MacBook Air Laptop.jpg",
    price: 1789,
    category: "Smartphone",
  },
  {
    id: 4,
    name: "S23 Ultra Pro",
    image: "../Images/box4_image.jpg",
    price: 1499,
    category: "Smartphone",
  },
  {
    id: 5,
    name: "Black Shirt",
    image: "../Images/clothe1_Blackshirt.jpg",
    price: 59,
    category: "clothes",
  },
  {
    id: 6,
    name: "T-shirt",
    image: "../Images/clothe2_T-shirt.jpg",
    price: 1299,
    category: "clothes",
  },
  {
    id: 7,
    name: "Men's Jacket",
    image: "../Images/clothe3_jacket.jpg",
    price: 1299,
    category: "clothes",
  },
  {
    id: 8,
    name: "Flannel shirt Jacket",
    image: "../Images/clothe4_Flannelshirtjacket.jpg",
    price: 1299,
    category: "clothes",
  },
  {
    id: 9,
    name: "Men Black Shoes",
    image: "../Images/Mensvlackshoes.jpg",
    price: 119,
    category: "shoes",
  },
  {
    id: 10,
    name: "Nike White Shoes",
    image: "../Images/shoes2.jpg",
    price: 256,
    category: "shoes",
  },
  {
    id: 11,
    name: "Air 1 shoes",
    image: "../Images/shoes3.jpg",
    price: 229,
    category: "shoes",
  },
  {
    id: 12,
    name: "Casual white shoes",
    image: "../Images/shoes4.jpg",
    price: 49,
    category: "shoes",
  },
  {
    id: 13,
    name: "Puffs",
    image: "../Images/go1.jpg",
    price: 13,
    category: "Grocery",
  },
  {
    id: 14,
    name: "Heritage Ghee",
    image: "../Images/go2.jpg",
    price: 109,
    category: "Grocery",
  },
  {
    id: 15,
    name: "Fruits",
    image: "../Images/go3.jpg",
    price: 29,
    category: "Grocery",
  },
  {
    id: 16,
    name: "vegetables flakes",
    image: "../Images/go4.jpg",
    price: 1299,
    category: "Grocery",
  },
];

let listCards = [];

function initApp() {
  products.forEach((product) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="${product.image}">
      <div class="title">${product.name}</div>
      <div class="price">$${product.price.toLocaleString()}</div>
      <div class="button"><button onclick="addToCart(${
        product.id - 1
      })">Add To Cart</button></div>`;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    // fetch the product details from list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
    // Show a confirmation message when the product is added to the cart
    alert("Your product " + products[key].name + " is added to the cart.");
  } else {
    // If the product is already in the cart.
    alert(
      "Your product " + products[key].name + " is already added to the cart!"
    );
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
        <div><img src="${value.image}"/></div>
        <div>${value.name}</div>
        <div>$${value.price.toLocaleString()}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = "Total Amount $" + totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", checkout);

function checkout() {
  alert("Thank you for your purchase! Your order is being processed.");
  listCards = []; // Clear the shopping cart
  reloadCard(); // Update the cart section
}

/* Input_Search */
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm);
  });

  list.innerHTML = "";
  filteredProducts.forEach((product) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="${product.image}">
      <div class="title">${product.name}</div>
      <div class="price">$${product.price.toLocaleString()}</div>
      <div class="button"><button onclick="addToCart(${product.id - 1})">Add To Cart</button></div>`;
    list.appendChild(newDiv);
  });
}

function initApp(categoryFilter = "all") {
  list.innerHTML = ""; // Clear the current product list

  products.forEach((product) => {
    // If a category filter is applied, skip products of other categories
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return;
    }

    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <img src="${product.image}">
      <div class="title">${product.name}</div>
      <div class="price">$${product.price.toLocaleString()}</div>
      <div class="button"><button onclick="addToCart(${product.id - 1})">Add To Cart</button></div>`;
    list.appendChild(newDiv);
  });
}

/* filter */
const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {
  const selectedCategory = categoryFilter.value;
  initApp(selectedCategory);
});
