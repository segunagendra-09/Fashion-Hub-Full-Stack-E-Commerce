<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="Your Shopping Bag | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="cart-page-container">
    <h1 class="page-title">Your Shopping Bag</h1>

    <c:if test="${not empty sessionScope.cartSuccessMessage}">
        <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> ${sessionScope.cartSuccessMessage}</div>
        <c:remove var="cartSuccessMessage" scope="session"/>
    </c:if>

    <c:choose>
        <c:when test="${empty cart || empty cart.items}">
            <div class="empty-state">
                <i class="fa-solid fa-bag-shopping empty-icon"></i>
                <h2>Your Shopping Bag is Currently Empty</h2>
                <p>Explore our latest arrivals and elevate your wardrobe today.</p>
                <a href="${pageContext.request.contextPath}/products" class="btn btn-primary mt-4">CONTINUE SHOPPING</a>
            </div>
        </c:when>

        <c:otherwise>
            <div class="cart-layout-grid">
                <!-- ITEMS TABLE -->
                <div class="cart-items-column">
                    <div class="cart-table-header">
                        <span>Product Details</span>
                        <span>Size</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Subtotal</span>
                        <span>Action</span>
                    </div>

                    <c:forEach var="item" items="${cart.items}">
                        <div class="cart-item-row">
                            <div class="item-product-info">
                                <img src="${item.product.imageUrl}" alt="${item.product.productName}" class="item-thumb" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'">
                                <div>
                                    <h4 class="item-title"><a href="${pageContext.request.contextPath}/product-details?id=${item.productId}">${item.product.productName}</a></h4>
                                    <span class="item-cat">${item.product.categoryName}</span>
                                </div>
                            </div>

                            <div class="item-size">
                                <span class="size-badge">${item.sizeLabel}</span>
                            </div>

                            <div class="item-price">
                                ₹<fmt:formatNumber value="${item.unitPrice}" pattern="#,##0" />
                            </div>

                            <div class="item-quantity">
                                <form action="${pageContext.request.contextPath}/update-cart" method="POST" class="qty-form">
                                    <input type="hidden" name="cartItemId" value="${item.cartItemId}">
                                    <select name="quantity" class="qty-select" onchange="this.form.submit()">
                                        <c:forEach var="q" begin="1" end="10">
                                            <option value="${q}" ${item.quantity == q ? 'selected' : ''}>${q}</option>
                                        </c:forEach>
                                    </select>
                                </form>
                            </div>

                            <div class="item-subtotal">
                                <strong>₹<fmt:formatNumber value="${item.subtotal}" pattern="#,##0" /></strong>
                            </div>

                            <div class="item-action">
                                <form action="${pageContext.request.contextPath}/remove-cart" method="POST">
                                    <input type="hidden" name="cartItemId" value="${item.cartItemId}">
                                    <button type="submit" class="btn-remove-item" title="Remove Item"><i class="fa-regular fa-trash-can"></i></button>
                                </form>
                            </div>
                        </div>
                    </c:forEach>

                    <div class="cart-footer-nav">
                        <a href="${pageContext.request.contextPath}/products" class="btn-back-link"><i class="fa-solid fa-arrow-left"></i> CONTINUE SHOPPING</a>
                    </div>
                </div>

                <!-- ORDER SUMMARY SIDEBAR -->
                <div class="cart-summary-card">
                    <h3>Order Summary</h3>
                    <div class="summary-line">
                        <span>Bag Subtotal</span>
                        <span>₹<fmt:formatNumber value="${cart.totalAmount}" pattern="#,##0" /></span>
                    </div>
                    <div class="summary-line">
                        <span>Estimated Shipping</span>
                        <span class="text-green">FREE</span>
                    </div>
                    <div class="summary-line">
                        <span>GST & Taxes</span>
                        <span>Included</span>
                    </div>
                    <hr>
                    <div class="summary-total">
                        <span>Total Payable</span>
                        <span class="total-amount">₹<fmt:formatNumber value="${cart.totalAmount}" pattern="#,##0" /></span>
                    </div>

                    <a href="${pageContext.request.contextPath}/checkout" class="btn btn-primary btn-checkout">
                        PROCEED TO CHECKOUT <i class="fa-solid fa-arrow-right"></i>
                    </a>

                    <div class="guarantee-box">
                        <i class="fa-solid fa-lock"></i>
                        <span>100% Encrypted & Secure Checkout</span>
                    </div>
                </div>
            </div>
        </c:otherwise>
    </c:choose>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
