if (localStorage.getItem("cart") == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem("cart"));
    updateCart(cart)
};
$('.divpr').on('click', 'button.cart', function() {
    var idstr = this.id.toString();
    if (cart[idstr] != undefined) {
        qty = cart[idstr][0] + 1;

    } else {
        qty = 1;
        pname = document.getElementById('name' + idstr).innerHTML;
        price = document.getElementById('price' + idstr).innerHTML;
        cart[idstr] = [qty, pname, parseInt(price)];
    }
    updateCart(cart);

});
$('#popcart').popover();
updatePopover(cart);

function clearCart() {
    cart = JSON.parse(localStorage.getItem('cart'));
    for (var item in cart) {
        document.getElementById('div' + item).innerHTML = '<button id="' + item + '" class="btn btn-primary cart">Add To Cart</button>'
    }
    localStorage.clear();
    cart = {};
    updateCart(cart);
}

function updatePopover(cart) {
    var popStr = "";
    popStr = popStr + "<h5> Cart for your items in my shopping cart </h5><div class='mx-2 my-2'>";
    var i = 1;
    for (var item in cart) {
        popStr = popStr + "<b>" + i + "</b>. ";
        popStr = popStr + document.getElementById('name' + item).innerHTML.slice(0, 19) + "... Qty: " + cart[item][0] + '<br>';
        i = i + 1;
    }
    popStr = popStr + "</div><button class='btn btn-danger' onclick='clearCart()' id ='clearCart'>Clear Cart</button>"
        // popStr = popStr + "</div> <a href='{% url 'CheckOut' %}'><button class='btn btn-primary' id ='checkout'>Checkout</button></a> <button class='btn btn-danger' onclick='clearCart()' id ='clearCart'>Clear Cart</button>"
    document.getElementById('popcart').setAttribute('data-content', popStr);
    $('#popcart').popover();
}

function updateCart(cart) {
    var sum = 0
    for (var item in cart) {
        sum = sum = cart[item][0]
        document.getElementById('div' + item).innerHTML = "<button id='minus" + item + "' class='btn btn-primary minus'>-</button> <span id='val" + item + "''>" + cart[item][0] + "</span> <button id='plus" + item + "' class='btn btn-primary plus'> + </button>";
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart').innerHTML = sum;
    updatePopover(cart);
};
// If plus or minus button is clicked, change the cart as well as the display value
$('.divpr').on("click", "button.minus", function() {
    a = this.id.slice(7, );
    console.log(cart)
    cart['pr' + a][0] = cart['pr' + a][0] - 1;
    cart['pr' + a][0] = Math.max(0, cart['pr' + a][0]);
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a][0];
    updateCart(cart);
});
$('.divpr').on("click", "button.plus", function() {
    a = this.id.slice(6, );
    cart['pr' + a][0] = cart['pr' + a][0] + 1;
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a][0];
    updateCart(cart);
});