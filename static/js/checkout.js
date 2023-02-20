if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

var sum = 0;
totalprice = 0
if ($.isEmptyObject(cart)) {
    // If object is empty
    mystr = "<p>Your cart is empty, please add some items before checking out ! </p>"
    $('#items').append(mystr);
} else {
    for (item in cart) {
        let name = cart[item][1];
        let qty = cart[item][0];
        let itemprice = cart[item][2];
        sum = sum + qty;
        totalprice = totalprice + qty * itemprice
        mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${name}
            <div class="itemprice">
            <span class="badge badge-primary badge-pill">${qty}</span>
            <span class="badge badge-warning badge-pill">price :${itemprice}</span>
            </div>
            </li>`
        $('#items').append(mystr);
    }

};
document.getElementById('cart').innerHTML = sum;
document.getElementById('totalprice').innerHTML = totalprice;
$('#itemsJson').val(JSON.stringify(cart));