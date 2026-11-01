/**
 * FASHION HUB - Product Page & Details Interaction Script
 */

function switchMainImage(src) {
    const mainImg = document.getElementById('mainProductImage');
    if (mainImg) {
        mainImg.src = src;
    }
}

function selectSize(sizeLabel) {
    const hiddenSizeInput = document.getElementById('selectedSizeInput');
    if (hiddenSizeInput) {
        hiddenSizeInput.value = sizeLabel;
    }
}

function filterProductsByGender(gender) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('gender', gender);
    window.location.href = currentUrl.toString();
}

function sortProducts(sortBy) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('sort', sortBy);
    window.location.href = currentUrl.toString();
}
