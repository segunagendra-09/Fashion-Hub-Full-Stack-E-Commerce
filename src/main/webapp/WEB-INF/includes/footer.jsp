<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<footer class="main-footer">
    <!-- Value Propositions -->
    <div class="benefits-strip">
        <div class="benefit-item">
            <i class="fa-solid fa-truck-fast"></i>
            <div>
                <h4>Free Shipping</h4>
                <p>On all orders above ₹999</p>
            </div>
        </div>
        <div class="benefit-item">
            <i class="fa-solid fa-rotate-left"></i>
            <div>
                <h4>30 Days Easy Returns</h4>
                <p>Hassle-free doorstep pickup</p>
            </div>
        </div>
        <div class="benefit-item">
            <i class="fa-solid fa-shield-halved"></i>
            <div>
                <h4>100% Secure Payment</h4>
                <p>Encrypted transactions</p>
            </div>
        </div>
        <div class="benefit-item">
            <i class="fa-solid fa-headset"></i>
            <div>
                <h4>24/7 Concierge</h4>
                <p>Dedicated customer support</p>
            </div>
        </div>
    </div>

    <div class="footer-grid">
        <div class="footer-col brand-col">
            <h3 class="footer-logo">FASHION <span>HUB</span></h3>
            <p class="tagline">"Discover Your Style."</p>
            <p class="footer-desc">
                Curating timeless elegance, modern tailoring, and luxury everyday essentials for the contemporary wardrobe.
            </p>
            <div class="social-links">
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
            </div>
        </div>

        <div class="footer-col">
            <h4>Shop Collections</h4>
            <ul>
                <li><a href="${pageContext.request.contextPath}/products?gender=Men">Men's Apparel</a></li>
                <li><a href="${pageContext.request.contextPath}/products?gender=Women">Women's Couture</a></li>
                <li><a href="${pageContext.request.contextPath}/products?categoryId=3">Footwear Edition</a></li>
                <li><a href="${pageContext.request.contextPath}/products?categoryId=4">Luxury Accessories</a></li>
                <li><a href="${pageContext.request.contextPath}/products?sort=newest">New Arrivals</a></li>
            </ul>
        </div>

        <div class="footer-col">
            <h4>Customer Care</h4>
            <ul>
                <li><a href="${pageContext.request.contextPath}/my-orders">Track Orders</a></li>
                <li><a href="#">Shipping & Delivery</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">FAQs & Help</a></li>
            </ul>
        </div>

        <div class="footer-col newsletter-col">
            <h4>Subscribe To Privilege</h4>
            <p>Join the VIP circle for private collection drops and insider luxury privileges.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing to FASHION HUB newsletter!');">
                <input type="email" placeholder="Enter your email address" required>
                <button type="submit">JOIN</button>
            </form>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2026 FASHION HUB. All rights reserved. Designed with Java MVC, Jakarta Servlet, JSP & JDBC.</p>
        <div class="payment-badges">
            <span><i class="fa-brands fa-cc-visa"></i></span>
            <span><i class="fa-brands fa-cc-mastercard"></i></span>
            <span><i class="fa-brands fa-cc-apple-pay"></i></span>
            <span><i class="fa-solid fa-qrcode"></i> UPI</span>
            <span>COD</span>
        </div>
    </div>
</footer>

<script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>
