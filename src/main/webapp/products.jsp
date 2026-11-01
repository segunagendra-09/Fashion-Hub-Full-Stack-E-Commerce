<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="Collection | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="products-page-layout">
    <!-- FILTER SIDEBAR -->
    <aside class="filter-sidebar">
        <form action="${pageContext.request.contextPath}/products" method="GET" id="filterForm">
            <div class="filter-header">
                <h3><i class="fa-solid fa-sliders"></i> Filters</h3>
                <a href="${pageContext.request.contextPath}/products" class="clear-filters-link">Reset All</a>
            </div>

            <!-- Search Field in Filter -->
            <div class="filter-group">
                <label class="filter-label">Keyword Search</label>
                <input type="text" name="q" value="${searchQuery}" placeholder="e.g. jacket, silk, shirt" class="filter-input">
            </div>

            <!-- Gender Filter -->
            <div class="filter-group">
                <label class="filter-label">Gender</label>
                <div class="radio-chip-group">
                    <label class="chip-option">
                        <input type="radio" name="gender" value="" ${empty selectedGender ? 'checked' : ''} onchange="this.form.submit()">
                        <span>All</span>
                    </label>
                    <label class="chip-option">
                        <input type="radio" name="gender" value="Men" ${selectedGender == 'Men' ? 'checked' : ''} onchange="this.form.submit()">
                        <span>Men</span>
                    </label>
                    <label class="chip-option">
                        <input type="radio" name="gender" value="Women" ${selectedGender == 'Women' ? 'checked' : ''} onchange="this.form.submit()">
                        <span>Women</span>
                    </label>
                </div>
            </div>

            <!-- Categories -->
            <div class="filter-group">
                <label class="filter-label">Category</label>
                <select name="categoryId" class="custom-select" onchange="this.form.submit()">
                    <option value="">All Categories</option>
                    <c:forEach var="cat" items="${categories}">
                        <option value="${cat.categoryId}" ${selectedCategory == cat.categoryId ? 'selected' : ''}>
                            ${cat.categoryName}
                        </option>
                    </c:forEach>
                </select>
            </div>

            <!-- Price Range -->
            <div class="filter-group">
                <label class="filter-label">Price Range (₹)</label>
                <div class="price-inputs">
                    <input type="number" name="minPrice" placeholder="Min ₹" value="${minPrice > 0 ? minPrice : ''}">
                    <span>-</span>
                    <input type="number" name="maxPrice" placeholder="Max ₹" value="${maxPrice > 0 ? maxPrice : ''}">
                </div>
            </div>

            <!-- Discount Filter -->
            <div class="filter-group">
                <label class="filter-label">Minimum Discount</label>
                <select name="minDiscount" class="custom-select" onchange="this.form.submit()">
                    <option value="0" ${minDiscount == 0 ? 'selected' : ''}>All Offers</option>
                    <option value="10" ${minDiscount == 10 ? 'selected' : ''}>10% Off or more</option>
                    <option value="15" ${minDiscount == 15 ? 'selected' : ''}>15% Off or more</option>
                    <option value="20" ${minDiscount == 20 ? 'selected' : ''}>20% Off or more</option>
                </select>
            </div>

            <button type="submit" class="btn btn-apply-filters">APPLY FILTERS</button>
        </form>
    </aside>

    <!-- MAIN PRODUCT LISTING -->
    <main class="products-main-content">
        <div class="catalog-top-bar">
            <div>
                <h1 class="catalog-title">
                    <c:choose>
                        <c:when test="${not empty searchQuery}">Search Results for "${searchQuery}"</c:when>
                        <c:when test="${not empty selectedGender}">${selectedGender}'s Collection</c:when>
                        <c:otherwise>All Products & Collections</c:otherwise>
                    </c:choose>
                </h1>
                <p class="catalog-count">Showing <strong>${products.size()}</strong> items</p>
            </div>

            <div class="sort-control">
                <label for="sortSelect">Sort By:</label>
                <select id="sortSelect" class="custom-select-small" onchange="applySort(this.value)">
                    <option value="featured" ${sortBy == 'featured' ? 'selected' : ''}>Featured</option>
                    <option value="price_asc" ${sortBy == 'price_asc' ? 'selected' : ''}>Price: Low to High</option>
                    <option value="price_desc" ${sortBy == 'price_desc' ? 'selected' : ''}>Price: High to Low</option>
                    <option value="newest" ${sortBy == 'newest' ? 'selected' : ''}>Newest Arrivals</option>
                    <option value="discount" ${sortBy == 'discount' ? 'selected' : ''}>Highest Discount</option>
                </select>
            </div>
        </div>

        <c:choose>
            <c:when test="${empty products}">
                <div class="empty-state">
                    <i class="fa-solid fa-shirt-long empty-icon"></i>
                    <h3>No products match your criteria</h3>
                    <p>Try resetting filters or adjusting search terms.</p>
                    <a href="${pageContext.request.contextPath}/products" class="btn btn-primary mt-3">Reset All Filters</a>
                </div>
            </c:when>
            <c:otherwise>
                <div class="product-grid-3">
                    <c:forEach var="p" items="${products}">
                        <div class="product-card">
                            <c:if test="${p.discountPercent > 0}">
                                <div class="product-badge">-${p.discountPercent}%</div>
                            </c:if>
                            <a href="${pageContext.request.contextPath}/product-details?id=${p.productId}" class="product-img-wrapper">
                                <img src="${p.imageUrl}" alt="${p.productName}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'">
                            </a>
                            <div class="product-info">
                                <span class="product-category">${p.gender} &bull; ${p.categoryName}</span>
                                <h3 class="product-title">
                                    <a href="${pageContext.request.contextPath}/product-details?id=${p.productId}">${p.productName}</a>
                                </h3>
                                <div class="product-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star-half-stroke"></i>
                                    <span class="rating-num">4.8</span>
                                </div>
                                <div class="product-price">
                                    <span class="current-price">₹<fmt:formatNumber value="${p.discountedPrice}" pattern="#,##0" /></span>
                                    <c:if test="${p.discountPercent > 0}">
                                        <span class="original-price">₹<fmt:formatNumber value="${p.price}" pattern="#,##0" /></span>
                                    </c:if>
                                </div>
                                <a href="${pageContext.request.contextPath}/product-details?id=${p.productId}" class="btn btn-card-add">
                                    SELECT SIZE & ADD
                                </a>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </c:otherwise>
        </c:choose>
    </main>
</div>

<script>
    function applySort(val) {
        const url = new URL(window.location.href);
        url.searchParams.set('sort', val);
        window.location.href = url.toString();
    }
</script>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
