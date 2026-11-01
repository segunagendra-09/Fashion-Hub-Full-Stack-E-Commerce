<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="Server Error | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="account-page-container" style="text-align: center; padding: 100px 20px;">
    <h1 style="font-family: var(--font-heading); font-size: 5rem; color: #dc2626;">500</h1>
    <h2>Internal Server Error</h2>
    <p style="color: var(--text-secondary); max-width: 500px; margin: 16px auto 30px;">
        Our concierge team has been notified of an unexpected system anomaly. Please try refreshing or return home.
    </p>
    <a href="${pageContext.request.contextPath}/home.jsp" class="btn btn-primary">RETURN TO HOMEPAGE</a>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
