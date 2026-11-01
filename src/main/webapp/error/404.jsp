<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="Page Not Found | FASHION HUB" />
<jsp:include page="/WEB-INF/includes/header.jsp" />
<jsp:include page="/WEB-INF/includes/navbar.jsp" />

<div class="account-page-container" style="text-align: center; padding: 100px 20px;">
    <h1 style="font-family: var(--font-heading); font-size: 5rem; color: var(--gold-accent);">404</h1>
    <h2>Page Not Found</h2>
    <p style="color: var(--text-secondary); max-width: 500px; margin: 16px auto 30px;">
        The fashion piece or collection page you are looking for might have been moved, renamed, or is temporarily unavailable.
    </p>
    <a href="${pageContext.request.contextPath}/home.jsp" class="btn btn-primary">RETURN TO HOMEPAGE</a>
</div>

<jsp:include page="/WEB-INF/includes/footer.jsp" />
