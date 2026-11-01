<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<header class="main-header">
    <!-- Top Announcement Bar & Delivery Location Selector -->
    <div class="top-location-bar">
        <div class="top-bar-container">
            <div class="top-promo">
                <i class="fa-solid fa-sparkles text-gold"></i>
                <span>PAN-INDIA EXPRESS SHIPPING OVER ₹999 &bull; CODE: <strong class="text-gold">ELEVATE</strong></span>
            </div>
            <div class="location-selector" title="Delivery Location">
                <i class="fa-solid fa-location-dot text-gold"></i>
                <span class="loc-label">Deliver to:</span>
                <span class="loc-address">Maruthi Nagar Main Road, BTM Layout, Bengaluru - 560068</span>
                <i class="fa-solid fa-chevron-right loc-chevron"></i>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="header-container">
        <!-- Brand Logo -->
        <a href="${pageContext.request.contextPath}/home.jsp" class="brand-logo">
            <span class="logo-text">FASHION <span class="accent">HUB</span></span>
        </a>

        <!-- Navigation Links -->
        <nav class="nav-menu">
            <a href="${pageContext.request.contextPath}/home.jsp" class="nav-link active">HOME</a>
            <a href="${pageContext.request.contextPath}/products?gender=Men" class="nav-link">MEN</a>
            <a href="${pageContext.request.contextPath}/products?gender=Women" class="nav-link">WOMEN</a>
            <a href="${pageContext.request.contextPath}/products" class="nav-link">NEW ARRIVALS</a>
            <a href="${pageContext.request.contextPath}/products?view=categories" class="nav-link">CATEGORIES</a>
            <a href="${pageContext.request.contextPath}/products?minDiscount=15" class="nav-link offer-link">OFFERS</a>
        </nav>

        <!-- Right Utilities -->
        <div class="nav-utilities">
            <form action="${pageContext.request.contextPath}/search" method="GET" class="search-form">
                <input type="text" name="q" placeholder="Search..." class="search-input" value="${param.q}">
                <button type="submit" class="search-btn" title="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>

            <a href="${pageContext.request.contextPath}/wishlist.jsp" class="utility-icon" title="Wishlist">
                <i class="fa-regular fa-heart"></i>
            </a>

            <a href="${pageContext.request.contextPath}/cart" class="utility-icon" title="Cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <c:if test="${not empty sessionScope.user}">
                    <span class="cart-count-badge">Cart</span>
                </c:if>
            </a>

            <div class="user-dropdown">
                <c:choose>
                    <c:when test="${not empty sessionScope.user}">
                        <a href="${pageContext.request.contextPath}/profile" class="profile-btn" title="Profile">
                            <i class="fa-regular fa-user"></i>
                            <span class="user-name">${sessionScope.user.fullName}</span>
                        </a>
                        <div class="dropdown-content">
                            <a href="${pageContext.request.contextPath}/profile"><i class="fa-solid fa-id-card"></i> Profile</a>
                            <a href="${pageContext.request.contextPath}/my-orders"><i class="fa-solid fa-box-archive"></i> My Orders</a>
                            <a href="${pageContext.request.contextPath}/cart"><i class="fa-solid fa-cart-shopping"></i> Cart</a>
                            <hr>
                            <a href="${pageContext.request.contextPath}/logout" class="logout-link"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageContext.request.contextPath}/login" class="profile-btn" title="Profile">
                            <i class="fa-regular fa-user"></i>
                        </a>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
</header>
