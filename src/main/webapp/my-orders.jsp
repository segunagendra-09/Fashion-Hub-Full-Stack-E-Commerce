<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="My Orders | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="account-page-container">
    <div class="account-header">
        <h1>My Orders</h1>
        <p>Review and track your recent purchases and order history.</p>
    </div>

    <c:choose>
        <c:when test="${empty orders}">
            <div class="empty-state">
                <i class="fa-solid fa-box-open empty-icon"></i>
                <h2>No Orders Placed Yet</h2>
                <p>You haven't made any purchases yet. Discover your signature style today.</p>
                <a href="${pageContext.request.contextPath}/products" class="btn btn-primary mt-3">EXPLORE PRODUCTS</a>
            </div>
        </c:when>

        <c:otherwise>
            <div class="orders-list">
                <c:forEach var="o" items="${orders}">
                    <div class="order-summary-card">
                        <div class="order-card-header">
                            <div>
                                <span class="order-id">Order #FH-${o.orderId}</span>
                                <span class="order-date"><fmt:formatDate value="${o.orderDate}" pattern="dd MMM yyyy, hh:mm a" /></span>
                            </div>
                            <div>
                                <span class="status-badge status-${o.orderStatus.toLowerCase()}">${o.orderStatus}</span>
                            </div>
                        </div>

                        <div class="order-card-body">
                            <div class="order-items-preview">
                                <c:forEach var="item" items="${o.items}" varStatus="loop">
                                    <div class="preview-item">
                                        <c:if test="${not empty item.imageUrl}">
                                            <img src="${item.imageUrl}" alt="${item.productName}" class="mini-img">
                                        </c:if>
                                        <span class="preview-name">${item.productName} (Size: ${item.sizeLabel}) x ${item.quantity}</span>
                                    </div>
                                </c:forEach>
                            </div>

                            <div class="order-card-right">
                                <div class="total-price">₹<fmt:formatNumber value="${o.totalAmount}" pattern="#,##0" /></div>
                                <a href="${pageContext.request.contextPath}/order-details?id=${o.orderId}" class="btn btn-sm btn-outline">
                                    View Details <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </c:otherwise>
    </c:choose>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
