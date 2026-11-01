<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="Checkout | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="checkout-page-container">
    <h1 class="page-title">Checkout</h1>

    <form action="${pageContext.request.contextPath}/place-order" method="POST" id="checkoutForm">
        <div class="checkout-grid">
            <!-- LEFT COLUMN: ADDRESS & PAYMENT -->
            <div class="checkout-main">

                <!-- 1. DELIVERY ADDRESS -->
                <div class="checkout-section-card">
                    <div class="section-title-row">
                        <span class="step-num">1</span>
                        <h2>Delivery Address</h2>
                    </div>

                    <div class="form-group">
                        <label for="deliveryAddress">Shipping Address *</label>
                        <textarea id="deliveryAddress" name="deliveryAddress" rows="4" class="custom-textarea" required>${user.address}</textarea>
                        <span class="field-help">Make sure phone number (+91 ${user.phone}) and address details are complete.</span>
                    </div>
                </div>

                <!-- 2. PAYMENT METHOD -->
                <div class="checkout-section-card">
                    <div class="section-title-row">
                        <span class="step-num">2</span>
                        <h2>Payment Method</h2>
                    </div>

                    <div class="payment-methods-group">
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="UPI" checked>
                            <div class="payment-info">
                                <span class="method-name"><i class="fa-solid fa-qrcode text-gold"></i> UPI / Google Pay / PhonePe / Paytm</span>
                                <span class="method-desc">Instant payment authorization</span>
                            </div>
                        </label>

                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="Credit/Debit Card">
                            <div class="payment-info">
                                <span class="method-name"><i class="fa-solid fa-credit-card text-gold"></i> Credit / Debit Card</span>
                                <span class="method-desc">Visa, MasterCard, Amex & Rupay</span>
                            </div>
                        </label>

                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="Cash on Delivery">
                            <div class="payment-info">
                                <span class="method-name"><i class="fa-solid fa-hand-holding-dollar text-gold"></i> Cash on Delivery (COD)</span>
                                <span class="method-desc">Pay upon doorstep receipt</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: ORDER SUMMARY -->
            <div class="checkout-summary-column">
                <div class="checkout-summary-card">
                    <h3>Order Items (${cart.itemCount})</h3>

                    <div class="checkout-items-list">
                        <c:forEach var="item" items="${cart.items}">
                            <div class="summary-item-row">
                                <img src="${item.product.imageUrl}" alt="${item.product.productName}" class="thumb-mini" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'">
                                <div class="item-meta">
                                    <span class="title">${item.product.productName}</span>
                                    <span class="sub">Size: <strong>${item.sizeLabel}</strong> | Qty: ${item.quantity}</span>
                                </div>
                                <span class="price">₹<fmt:formatNumber value="${item.subtotal}" pattern="#,##0" /></span>
                            </div>
                        </c:forEach>
                    </div>

                    <hr>

                    <div class="summary-line">
                        <span>Items Total</span>
                        <span>₹<fmt:formatNumber value="${cart.totalAmount}" pattern="#,##0" /></span>
                    </div>
                    <div class="summary-line">
                        <span>Delivery Fee</span>
                        <span class="text-green">FREE</span>
                    </div>
                    <div class="summary-total">
                        <span>Total Payable</span>
                        <span class="total-amount">₹<fmt:formatNumber value="${cart.totalAmount}" pattern="#,##0" /></span>
                    </div>

                    <button type="submit" class="btn btn-primary btn-place-order">
                        PLACE ORDER NOW <i class="fa-solid fa-check"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
