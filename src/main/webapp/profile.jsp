<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="My Profile | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="account-page-container">
    <div class="profile-layout-grid">
        <!-- SIDEBAR NAVIGATION -->
        <aside class="profile-sidebar">
            <div class="user-avatar-card">
                <div class="avatar-circle">${sessionScope.user.fullName.substring(0, 1)}</div>
                <h3>${sessionScope.user.fullName}</h3>
                <span class="user-email">${sessionScope.user.email}</span>
            </div>

            <nav class="profile-nav-menu">
                <a href="${pageContext.request.contextPath}/profile" class="active"><i class="fa-solid fa-user-gear"></i> Account Profile</a>
                <a href="${pageContext.request.contextPath}/my-orders"><i class="fa-solid fa-box-archive"></i> My Orders</a>
                <a href="${pageContext.request.contextPath}/cart"><i class="fa-solid fa-bag-shopping"></i> Shopping Cart</a>
                <a href="${pageContext.request.contextPath}/logout" class="logout-link"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
            </nav>
        </aside>

        <!-- MAIN PROFILE CONTENT -->
        <main class="profile-content">
            <div class="card-box">
                <h2>Account Information</h2>
                <p class="subtitle">Manage your contact credentials and default shipping details.</p>

                <c:if test="${not empty profileSuccessMessage}">
                    <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> ${profileSuccessMessage}</div>
                </c:if>

                <c:if test="${not empty profileErrorMessage}">
                    <div class="alert alert-danger"><i class="fa-solid fa-circle-exclamation"></i> ${profileErrorMessage}</div>
                </c:if>

                <form action="${pageContext.request.contextPath}/profile" method="POST" class="profile-form">
                    <div class="form-row-2">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value="${sessionScope.user.fullName}" class="custom-input" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address (Read-only)</label>
                            <input type="email" id="email" value="${sessionScope.user.email}" class="custom-input" readonly disabled style="background-color: #f5f5f5;">
                        </div>
                    </div>

                    <div class="form-row-2">
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value="${sessionScope.user.phone}" class="custom-input" required>
                        </div>

                        <div class="form-group">
                            <label for="gender">Gender Preference</label>
                            <select id="gender" name="gender" class="custom-select">
                                <option value="Male" ${sessionScope.user.gender == 'Male' ? 'selected' : ''}>Male</option>
                                <option value="Female" ${sessionScope.user.gender == 'Female' ? 'selected' : ''}>Female</option>
                                <option value="Unspecified" ${sessionScope.user.gender == 'Unspecified' ? 'selected' : ''}>Prefer not to say</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address">Default Shipping Address</label>
                        <textarea id="address" name="address" rows="3" class="custom-textarea" required>${sessionScope.user.address}</textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">SAVE PROFILE CHANGES</button>
                </form>
            </div>
        </main>
    </div>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
