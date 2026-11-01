/**
 * FASHION HUB - Form Validation Utilities
 */

function validateCheckoutForm() {
    const address = document.getElementById('deliveryAddress')?.value.trim();
    const city = document.getElementById('city')?.value.trim();
    const postalCode = document.getElementById('postalCode')?.value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (!address) {
        alert('Please enter delivery address.');
        return false;
    }
    if (!city) {
        alert('Please enter city.');
        return false;
    }
    if (!postalCode || postalCode.length !== 6) {
        alert('Please enter a valid 6-digit postal PIN code.');
        return false;
    }
    if (!paymentMethod) {
        alert('Please select a payment method.');
        return false;
    }
    return true;
}

function validateProfileUpdate() {
    const fullName = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();

    if (!fullName) {
        alert('Full name cannot be empty.');
        return false;
    }
    if (!phone || phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return false;
    }
    return true;
}
