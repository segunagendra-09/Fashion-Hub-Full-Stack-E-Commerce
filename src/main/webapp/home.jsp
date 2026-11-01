<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<c:set var="pageTitle" value="FASHION HUB | Discover Your Style - Luxury Menswear" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<!-- FULL-BLEED 100% WIDTH LUXURY HERO BANNER -->
<section class="full-bleed-hero" style="background-image: url('${pageContext.request.contextPath}/assets/images/full_bleed_menswear_hero_1790923853002.jpg');">
    <div class="full-hero-scrim"></div>

    <div class="full-hero-container">
        <!-- Hero Content over left side of full-screen image -->
        <div class="hero-main-content">
            <div class="editorial-badge">
                <i class="fa-solid fa-sparkles"></i>
                <span>AUTUMN / WINTER '26 EDITORIAL</span>
            </div>

            <h1 class="hero-title">
                Discover<br>Your Style.
            </h1>

            <p class="hero-description">
                Precision Italian tailoring, hand-crafted lambskin outerwear, raw Japanese selvedge denim, and burnished calfskin footwear. Elevate your everyday wardrobe with timeless luxury silhouettes.
            </p>

            <div class="hero-cta-group">
                <a href="${pageContext.request.contextPath}/products" class="btn-hero-primary">
                    SHOP MENSWEAR &rarr;
                </a>
                <a href="${pageContext.request.contextPath}/products?categoryId=3" class="btn-hero-secondary">
                    EXPLORE DENIM
                </a>
            </div>
        </div>

        <!-- Hero Bottom Info Strip -->
        <div class="hero-info-strip">
            <div class="info-item">
                <span class="info-number">100% Authentic</span>
                <span class="info-label">Long-Staple Cotton & Silk</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
                <span class="info-number">24–48H Express</span>
                <span class="info-label">Pan-India Doorstep Shipping</span>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
                <span class="info-number">Hassle-Free</span>
                <span class="info-label">30-Day Easy Returns</span>
            </div>
        </div>
    </div>
</section>

<!-- SHOP BY CATEGORY -->
<section class="section-container">
    <div class="section-header center">
        <span class="section-eyebrow">CURATED SELECTION</span>
        <h2 class="section-title">Shop By Category</h2>
        <div class="section-divider"></div>
    </div>

    <div class="category-grid">
        <a href="${pageContext.request.contextPath}/products?categoryId=1" class="category-card">
            <div class="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80" alt="Shirts & Polos">
            </div>
            <div class="category-content">
                <h3>SHIRTS & POLOS</h3>
                <p>Oxford Shirts, Linen & Mercerized Polos</p>
                <span class="category-link">EXPLORE <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        </a>

        <a href="${pageContext.request.contextPath}/products?categoryId=2" class="category-card">
            <div class="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" alt="Outerwear">
            </div>
            <div class="category-content">
                <h3>OUTERWEAR</h3>
                <p>Leather Jackets, Wool Blazers & Tuxedos</p>
                <span class="category-link">EXPLORE <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        </a>

        <a href="${pageContext.request.contextPath}/products?categoryId=3" class="category-card">
            <div class="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80" alt="Denim & Trousers">
            </div>
            <div class="category-content">
                <h3>DENIM & TROUSERS</h3>
                <p>Selvedge Jeans, Chinos & Trousers</p>
                <span class="category-link">EXPLORE <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        </a>

        <a href="${pageContext.request.contextPath}/products?categoryId=4" class="category-card">
            <div class="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80" alt="Footwear">
            </div>
            <div class="category-content">
                <h3>FOOTWEAR</h3>
                <p>Leather Oxfords, Chelsea Boots & Sneakers</p>
                <span class="category-link">EXPLORE <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        </a>
    </div>
</section>

<!-- FEATURED HIGHLIGHT BANNER -->
<section class="banner-section">
    <div class="banner-card">
        <div class="banner-content">
            <span class="badge-gold">PRIVILEGE COLLECTION</span>
            <h2>The Obsidian Leather & Selvedge Edition</h2>
            <p>Hand-crafted lambskin biker jackets, Goodyear welted calfskin footwear, and precision chronograph timepieces engineered for distinction.</p>
            <a href="${pageContext.request.contextPath}/products" class="btn-gold">EXPLORE COLLECTION</a>
        </div>
    </div>
</section>

<!-- NEW ARRIVALS PREVIEW -->
<section class="section-container">
    <div class="section-header space-between">
        <div>
            <span class="section-eyebrow">JUST ARRIVED</span>
            <h2 class="section-title">New Arrivals</h2>
        </div>
        <a href="${pageContext.request.contextPath}/products" class="view-all-link">View All Products <i class="fa-solid fa-arrow-right"></i></a>
    </div>

    <div class="product-grid-4">
        <!-- Item 1 -->
        <div class="product-card">
            <div class="product-badge">-15% OFF</div>
            <a href="${pageContext.request.contextPath}/product-details?id=1" class="product-img-wrapper">
                <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80" alt="Classic Oxford Cotton Shirt" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'">
            </a>
            <div class="product-info">
                <span class="product-category">Men &bull; Shirt</span>
                <h3 class="product-title"><a href="${pageContext.request.contextPath}/product-details?id=1">Classic Oxford Cotton Shirt</a></h3>
                <div class="product-price">
                    <span class="current-price">₹2,549</span>
                    <span class="original-price">₹2,999</span>
                </div>
                <a href="${pageContext.request.contextPath}/product-details?id=1" class="btn-card-add">SELECT SIZE & ADD</a>
            </div>
        </div>

        <!-- Item 2 -->
        <div class="product-card">
            <div class="product-badge">-20% OFF</div>
            <a href="${pageContext.request.contextPath}/product-details?id=2" class="product-img-wrapper">
                <img src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80" alt="Casual Mercerized Cotton Polo" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'">
            </a>
            <div class="product-info">
                <span class="product-category">Men &bull; Shirt</span>
                <h3 class="product-title"><a href="${pageContext.request.contextPath}/product-details?id=2">Casual Mercerized Cotton Polo</a></h3>
                <div class="product-price">
                    <span class="current-price">₹1,599</span>
                    <span class="original-price">₹1,999</span>
                </div>
                <a href="${pageContext.request.contextPath}/product-details?id=2" class="btn-card-add">SELECT SIZE & ADD</a>
            </div>
        </div>

        <!-- Item 3 -->
        <div class="product-card">
            <div class="product-badge">-15% OFF</div>
            <a href="${pageContext.request.contextPath}/product-details?id=5" class="product-img-wrapper">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" alt="Structured Charcoal Wool Blazer" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'">
            </a>
            <div class="product-info">
                <span class="product-category">Men &bull; Blazer</span>
                <h3 class="product-title"><a href="${pageContext.request.contextPath}/product-details?id=5">Structured Charcoal Wool Blazer</a></h3>
                <div class="product-price">
                    <span class="current-price">₹5,949</span>
                    <span class="original-price">₹6,999</span>
                </div>
                <a href="${pageContext.request.contextPath}/product-details?id=5" class="btn-card-add">SELECT SIZE & ADD</a>
            </div>
        </div>

        <!-- Item 4 -->
        <div class="product-card">
            <div class="product-badge">-10% OFF</div>
            <a href="${pageContext.request.contextPath}/product-details?id=9" class="product-img-wrapper">
                <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80" alt="Heritage Calfskin Leather Oxfords" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'">
            </a>
            <div class="product-info">
                <span class="product-category">Men &bull; Footwear</span>
                <h3 class="product-title"><a href="${pageContext.request.contextPath}/product-details?id=9">Heritage Calfskin Leather Oxfords</a></h3>
                <div class="product-price">
                    <span class="current-price">₹4,949</span>
                    <span class="original-price">₹5,499</span>
                </div>
                <a href="${pageContext.request.contextPath}/product-details?id=9" class="btn-card-add">SELECT SIZE & ADD</a>
            </div>
        </div>
    </div>
</section>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
