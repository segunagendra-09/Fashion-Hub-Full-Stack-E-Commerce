<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="Login | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="auth-page-container">
    <div class="auth-card">
        <div class="auth-header">
            <h2>Welcome Back</h2>
            <p>Access your personalized wardrobe, order history, and exclusive benefits.</p>
        </div>

        <c:if test="${not empty errorMessage}">
            <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> ${errorMessage}</div>
        </c:if>

        <c:if test="${not empty sessionScope.successMessage}">
            <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> ${sessionScope.successMessage}</div>
            <c:remove var="successMessage" scope="session"/>
        </c:if>

        <c:if test="${param.message == 'RequireLogin'}">
            <div class="alert alert-warning"><i class="fa-solid fa-lock"></i> Please sign in to access your cart and complete checkout.</div>
        </c:if>

        <form action="${pageContext.request.contextPath}/login" method="POST" class="auth-form" onsubmit="return validateLoginForm()">
            <div class="form-group">
                <label for="email">Email Address *</label>
                <div class="input-icon-wrapper">
                    <i class="fa-regular fa-envelope"></i>
                    <input type="email" id="email" name="email" value="${email != null ? email : 'alex.wright@example.com'}" placeholder="e.g. alex.wright@example.com" required autocomplete="email">
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password *</label>
                <div class="input-icon-wrapper">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" id="password" name="password" value="Password123" placeholder="Enter your password" required autocomplete="current-password">
                    <button type="button" class="btn-toggle-password" onclick="togglePasswordVisibility('password', this)" title="Toggle password visibility">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                </div>
            </div>

            <div class="form-options">
                <label class="remember-me">
                    <input type="checkbox" name="rememberMe" checked>
                    <span>Remember me</span>
                </label>
                <a href="#" onclick="alert('Demo account password is: Password123'); return false;" class="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-auth-submit">SIGN IN TO FASHION HUB</button>
        </form>

        <div class="demo-credentials-box">
            <div class="demo-title"><i class="fa-solid fa-key"></i> Demo Credentials:</div>
            <div class="demo-row"><strong>Email:</strong> alex.wright@example.com</div>
            <div class="demo-row"><strong>Password:</strong> Password123</div>
        </div>

        <div class="auth-footer">
            <p>New to Fashion Hub? <a href="${pageContext.request.contextPath}/register">Create an account</a></p>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
