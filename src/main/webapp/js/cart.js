/**
 * FASHION HUB - Shopping Cart Dynamic Interaction Script
 */

function updateCartQuantity(cartItemId, newQty) {
    if (newQty < 1) return;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'update-cart';

    const itemInput = document.createElement('input');
    itemInput.type = 'hidden';
    itemInput.name = 'cartItemId';
    itemInput.value = cartItemId;

    const qtyInput = document.createElement('input');
    qtyInput.type = 'hidden';
    qtyInput.name = 'quantity';
    qtyInput.value = newQty;

    form.appendChild(itemInput);
    form.appendChild(qtyInput);
    document.body.appendChild(form);
    form.submit();
}

function removeCartItem(cartItemId) {
    if (confirm('Are you sure you want to remove this item from your bag?')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'remove-cart';

        const itemInput = document.createElement('input');
        itemInput.type = 'hidden';
        itemInput.name = 'cartItemId';
        itemInput.value = cartItemId;

        form.appendChild(itemInput);
        document.body.appendChild(form);
        form.submit();
    }
}
