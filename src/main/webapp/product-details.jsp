<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="${product.productName} | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="breadcrumb-container">
    <a href="${pageContext.request.contextPath}/home.jsp">Home</a>
    <span>/</span>
    <a href="${pageContext.request.contextPath}/products">Collection</a>
    <span>/</span>
    <a href="${pageContext.request.contextPath}/products?categoryId=${product.categoryId}">${product.categoryName}</a>
    <span>/</span>
    <span class="active">${product.productName}</span>
</div>

<div class="product-details-container">
    <!-- LEFT: IMAGE GALLERY -->
    <div class="details-gallery">
        <div class="main-image-frame">
            <img id="mainProductImg" src="${product.imageUrl}" alt="${product.productName}" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'">
        </div>
    </div>

    <!-- RIGHT: PRODUCT INFO & BUY FORM -->
    <div class="details-info-panel">
        <span class="brand-eyebrow">FASHION HUB &bull; ${product.gender} COLLECTION</span>
        <h1 class="details-title">${product.productName}</h1>

        <div class="details-rating">
            <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
            </div>
            <span class="review-count">4.9 &bull; 128 Verified Reviews</span>
        </div>

        <div class="details-price-row">
            <span class="price-current">₹<fmt:formatNumber value="${product.discountedPrice}" pattern="#,##0" /></span>
            <c:if test="${product.discountPercent > 0}">
                <span class="price-original">₹<fmt:formatNumber value="${product.price}" pattern="#,##0" /></span>
                <span class="discount-pill">SAVE ${product.discountPercent}% OFF</span>
            </c:if>
        </div>
        <p class="tax-inclusive">Inclusive of all taxes. Free shipping applied at checkout.</p>

        <hr class="divider-line">

        <c:if test="${not empty sessionScope.cartErrorMessage}">
            <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> ${sessionScope.cartErrorMessage}</div>
            <c:remove var="cartErrorMessage" scope="session"/>
        </c:if>

        <form action="${pageContext.request.contextPath}/add-to-cart" method="POST" id="addToCartForm" onsubmit="return validateSizeSelected()">
            <input type="hidden" name="productId" value="${product.productId}">

            <!-- SIZE SELECTION -->
            <div class="size-selection-box">
                <div class="size-label-row">
                    <label class="section-label">Select Size *</label>
                    <a href="#" onclick="alert('Size Guide: Standard International Fitting. S: 38 inch chest / 28 waist, M: 40 chest / 30 waist, L: 42 chest / 32 waist, XL: 44 chest / 34 waist.'); return false;" class="size-guide-link"><i class="fa-solid fa-ruler"></i> Size Guide</a>
                </div>

                <div class="size-chips-grid">
                    <c:forEach var="sz" items="${product.sizes}">
                        <label class="size-chip ${!sz.available || sz.stockQuantity == 0 ? 'disabled' : ''}">
                            <input type="radio" name="sizeLabel" value="${sz.sizeLabel}" ${!sz.available || sz.stockQuantity == 0 ? 'disabled' : ''} required>
                            <span class="chip-label">${sz.sizeLabel}</span>
                        </label>
                    </c:forEach>
                </div>
            </div>

            <!-- QUANTITY SELECTOR -->
            <div class="quantity-box">
                <label class="section-label">Quantity</label>
                <div class="qty-control">
                    <button type="button" class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" id="qtyInput" name="quantity" value="1" min="1" max="10" readonly>
                    <button type="button" class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <!-- CTA BUTTONS -->
            <div class="action-buttons-group">
                <button type="submit" class="btn btn-primary btn-add-cart">
                    <i class="fa-solid fa-bag-shopping"></i> ADD TO CART
                </button>
                <button type="button" class="btn btn-outline-wishlist" onclick="alert('Item added to your Wishlist!');">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        </form>

        <!-- DESCRIPTION & DETAILS ACCORDION -->
        <div class="product-description-block">
            <h3>Product Overview</h3>
            <p>${product.description}</p>
            <ul class="spec-list">
                <li><i class="fa-solid fa-check text-gold"></i> <strong>Material:</strong> Premium long-staple cotton / Italian finish</li>
                <li><i class="fa-solid fa-check text-gold"></i> <strong>Fit:</strong> Tailored Modern Fit</li>
                <li><i class="fa-solid fa-check text-gold"></i> <strong>Care:</strong> Dry clean or gentle cold wash</li>
            </ul>
        </div>
    </div>
</div>

<script>
    function adjustQty(amount) {
        const input = document.getElementById('qtyInput');
        let val = parseInt(input.value) || 1;
        val = Math.max(1, Math.min(10, val + amount));
        input.value = val;
    }

    function validateSizeSelected() {
        const radios = document.getElementsByName('sizeLabel');
        let selected = false;
        for (let r of radios) {
            if (r.checked) selected = true;
        }
        if (!selected) {
            alert('Please select a size (XS, S, M, L, XL, etc.) before adding to cart.');
            return false;
        }
        return true;
    }
</script>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
