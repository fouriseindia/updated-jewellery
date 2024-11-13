

function increaseQty(id) {
    let qtyInput = document.getElementById('qty' + id);
    let qty = parseInt(qtyInput.value);
    qtyInput.value = qty + 1;
}

function decreaseQty(id) {
    let qtyInput = document.getElementById('qty' + id);
    let qty = parseInt(qtyInput.value);
    if (qty > 1) {
        qtyInput.value = qty - 1;
    }
}