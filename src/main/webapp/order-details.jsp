<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="Order Details #FH-${order.orderId} | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="account-page-container">
    <div class="breadcrumb-container" style="padding-left: 0;">
        <a href="${pageContext.request.contextPath}/home.jsp">Home</a>
        <span>/</span>
        <a href="${pageContext.request.contextPath}/my-orders">My Orders</a>
        <span>/</span>
        <span class="active">Order #FH-${order.orderId}</span>
    </div>

    <div class="order-detail-header">
        <div>
            <h1>Order #FH-${order.orderId}</h1>
            <p>Placed on <fmt:formatDate value="${order.orderDate}" pattern="MMMM dd, yyyy 'at' hh:mm a" /></p>
        </div>
        <div class="header-right">
            <span class="status-badge status-${order.orderStatus.toLowerCase()}">${order.orderStatus}</span>
        </div>
    </div>

    <!-- ORDER PROGRESS TRACKER STEPPER -->
    <div class="order-stepper-card">
        <div class="stepper-wrapper">
            <div class="step-item ${order.orderStatus == 'PLACED' || order.orderStatus == 'CONFIRMED' || order.orderStatus == 'SHIPPED' || order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}">
                <div class="step-icon"><i class="fa-solid fa-receipt"></i></div>
                <div class="step-label">Order Placed</div>
            </div>
            <div class="step-line ${order.orderStatus == 'CONFIRMED' || order.orderStatus == 'SHIPPED' || order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}"></div>

            <div class="step-item ${order.orderStatus == 'CONFIRMED' || order.orderStatus == 'SHIPPED' || order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}">
                <div class="step-icon"><i class="fa-solid fa-boxes-packing"></i></div>
                <div class="step-label">Confirmed</div>
            </div>
            <div class="step-line ${order.orderStatus == 'SHIPPED' || order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}"></div>

            <div class="step-item ${order.orderStatus == 'SHIPPED' || order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}">
                <div class="step-icon"><i class="fa-solid fa-truck-ramp-box"></i></div>
                <div class="step-label">Shipped</div>
            </div>
            <div class="step-line ${order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}"></div>

            <div class="step-item ${order.orderStatus == 'OUT FOR DELIVERY' || order.orderStatus == 'DELIVERED' ? 'active' : ''}">
                <div class="step-icon"><i class="fa-solid fa-truck-fast"></i></div>
                <div class="step-label">Out For Delivery</div>
            </div>
            <div class="step-line ${order.orderStatus == 'DELIVERED' ? 'active' : ''}"></div>

            <div class="step-item ${order.orderStatus == 'DELIVERED' ? 'active' : ''}">
                <div class="step-icon"><i class="fa-solid fa-house-chimney-check"></i></div>
                <div class="step-label">Delivered</div>
            </div>
        </div>
    </div>

    <!-- ORDER ITEMS TABLE & INFO -->
    <div class="order-detail-grid">
        <div class="detail-items-card">
            <h3>Ordered Items</h3>
            <div class="detail-items-list">
                <c:forEach var="item" items="${order.items}">
                    <div class="detail-item-row">
                        <c:if test="${not empty item.imageUrl}">
                            <img src="${item.imageUrl}" alt="${item.productName}" class="item-img" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'">
                        </c:if>
                        <div class="item-details">
                            <h4 class="product-name">${item.productName}</h4>
                            <span class="meta">Size: <strong>${item.sizeLabel}</strong> | Unit Price: ₹<fmt:formatNumber value="${item.unitPrice}" pattern="#,##0" /></span>
                        </div>
                        <div class="item-qty">Qty: ${item.quantity}</div>
                        <div class="item-subtotal">₹<fmt:formatNumber value="${item.subtotal}" pattern="#,##0" /></div>
                    </div>
                </c:forEach>
            </div>
        </div>

        <div class="detail-summary-card">
            <h3>Delivery & Payment</h3>
            <div class="info-block">
                <label>Shipping Address</label>
                <p>${order.deliveryAddress}</p>
            </div>
            <div class="info-block">
                <label>Payment Method</label>
                <p>${order.paymentMethod}</p>
            </div>
            <hr>
            <div class="summary-line">
                <span>Subtotal</span>
                <span>₹<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0" /></span>
            </div>
            <div class="summary-line">
                <span>Shipping Fee</span>
                <span class="text-green">FREE</span>
            </div>
            <div class="summary-total">
                <span>Total Paid</span>
                <span class="total-amount">₹<fmt:formatNumber value="${order.totalAmount}" pattern="#,##0" /></span>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
