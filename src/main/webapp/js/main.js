/**
 * FASHION HUB - Interactive JavaScript Utilities
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Fashion Hub Application initialized.");
});

function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
    }
}

function validateLoginForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!password) {
        alert('Please enter your password.');
        return false;
    }
    return true;
}

function validateRegisterForm() {
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!name) {
        alert('Full name is required.');
        return false;
    }
    if (!email || !email.includes('@')) {
        alert('A valid email address is required.');
        return false;
    }
    if (phone.length < 10) {
        alert('Please enter a valid phone number (at least 10 digits).');
        return false;
    }
    if (pass.length < 6) {
        alert('Password must be at least 6 characters.');
        return false;
    }
    if (pass !== confirm) {
        alert('Passwords do not match. Please re-enter.');
        return false;
    }
    return true;
}
