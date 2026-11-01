<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="Order Confirmation | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="success-page-container">
    <div class="success-card">
        <div class="success-icon-badge">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <span class="thank-you-eyebrow">THANK YOU FOR YOUR ORDER</span>
        <h1 class="success-title">Order Placed Successfully!</h1>
        <p class="success-subtitle">We are preparing your items for swift dispatch. A confirmation notification has been sent.</p>

        <c:set var="ord" value="${sessionScope.latestOrder}" />

        <div class="order-receipt-box">
            <div class="receipt-row">
                <span>Order Reference:</span>
                <strong>#FH-${not empty ord ? ord.orderId : param.orderId}</strong>
            </div>
            <div class="receipt-row">
                <span>Total Amount Paid:</span>
                <strong>₹<fmt:formatNumber value="${not empty ord ? ord.totalAmount : 7199}" pattern="#,##0" /></strong>
            </div>
            <div class="receipt-row">
                <span>Payment Method:</span>
                <strong>${not empty ord ? ord.paymentMethod : 'UPI / Online'}</strong>
            </div>
            <div class="receipt-row">
                <span>Order Status:</span>
                <span class="status-badge status-placed">CONFIRMED</span>
            </div>
            <div class="receipt-row">
                <span>Delivery Address:</span>
                <span class="address-text">${not empty ord ? ord.deliveryAddress : 'User Registered Address'}</span>
            </div>
        </div>

        <div class="success-actions">
            <a href="${pageContext.request.contextPath}/order-details?id=${not empty ord ? ord.orderId : param.orderId}" class="btn btn-primary">
                VIEW ORDER DETAILS
            </a>
            <a href="${pageContext.request.contextPath}/my-orders" class="btn btn-secondary">
                MY ORDERS HISTORY
            </a>
            <a href="${pageContext.request.contextPath}/products" class="btn btn-outline-dark">
                CONTINUE SHOPPING
            </a>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
