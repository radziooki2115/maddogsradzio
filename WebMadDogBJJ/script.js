// zamykanie i otwieranie wuzka
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// otwarcie wuzka i zamkniecie
cartIcon.onclick = () => {
    cart.classList.toggle("active");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// działanie wuzka
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    // Resetowanie koszyka po zalodaowaniu strony
    clearCart();

    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCartButtons = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }
}

function clearCart() {
    // Usuwanie wszystkich przedmiotow z koszyka po f5
    var cartContent = document.getElementsByClassName("cart-content")[0];
    cartContent.innerHTML = ''; // Usuwa zawarto koszyka


    document.getElementsByClassName("total-price")[0].innerText = "0$";

    // Resetowanie liczby przedmiotów w koszyku
    let cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute('data-quantitiy', '0');
}

function addToCartClicked(event) {
    var button = event.target;
    var productBox = button.closest(".product-box");
    var title = productBox.getElementsByClassName("product-title")[0].innerText;
    var price = productBox.getElementsByClassName("price")[0].innerText;
    var productImg = productBox.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartContent = document.getElementsByClassName("cart-content")[0];

    var cartItems = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartItems.length; i++) {
        var cartItemTitle = cartItems[i].getElementsByClassName("cart-product-title")[0].innerText;
        if (cartItemTitle === title) {
            var quantityElement = cartItems[i].getElementsByClassName("cart-quantity")[0];
            quantityElement.value = parseInt(quantityElement.value) + 1;
            updatetotal();
            return;
        }
    }

    var cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImg}" class="cart-image">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;

        total += price * quantity;
    }

    document.getElementsByClassName("total-price")[0].innerText = total.toFixed(2) + "$";
}
