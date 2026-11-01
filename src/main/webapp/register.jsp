<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="Create Account | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="auth-page-container">
    <div class="auth-card register-card">
        <div class="auth-header">
            <h2>Join Fashion Hub</h2>
            <p>Create your profile to enjoy seamless shopping, address management, and order tracking.</p>
        </div>

        <c:if test="${not empty errorMessage}">
            <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> ${errorMessage}</div>
        </c:if>

        <form action="${pageContext.request.contextPath}/register" method="POST" class="auth-form" id="registerForm" onsubmit="return validateRegisterForm()">
            <div class="form-row-2">
                <div class="form-group">
                    <label for="fullName">Full Name *</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-regular fa-user"></i>
                        <input type="text" id="fullName" name="fullName" value="${registeredUser.fullName}" placeholder="e.g. Alexander Wright" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-regular fa-envelope"></i>
                        <input type="email" id="email" name="email" value="${registeredUser.email}" placeholder="alex@example.com" required>
                    </div>
                </div>
            </div>

            <div class="form-row-2">
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-phone"></i>
                        <input type="tel" id="phone" name="phone" value="${registeredUser.phone}" placeholder="+91 9876543210" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="gender">Gender Preference</label>
                    <select id="gender" name="gender" class="custom-select">
                        <option value="Male" ${registeredUser.gender == 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${registeredUser.gender == 'Female' ? 'selected' : ''}>Female</option>
                        <option value="Unspecified" ${registeredUser.gender == 'Unspecified' ? 'selected' : ''}>Prefer not to say</option>
                    </select>
                </div>
            </div>

            <div class="form-row-2">
                <div class="form-group">
                    <label for="password">Password *</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="password" name="password" placeholder="At least 6 characters" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirm Password *</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-shield-check"></i>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" required>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="address">Delivery Address *</label>
                <textarea id="address" name="address" rows="3" placeholder="Enter your full street address, city, state and pincode" required>${registeredUser.address}</textarea>
            </div>

            <button type="submit" class="btn btn-auth-submit">CREATE FASHION HUB ACCOUNT</button>
        </form>

        <div class="auth-footer">
            <p>Already have an account? <a href="${pageContext.request.contextPath}/login">Sign In</a></p>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
