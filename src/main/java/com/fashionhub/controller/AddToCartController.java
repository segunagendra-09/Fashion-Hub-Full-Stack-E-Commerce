package com.fashionhub.controller;

import com.fashionhub.model.User;
import com.fashionhub.service.CartService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/add-to-cart")
public class AddToCartController extends HttpServlet {

    private final CartService cartService = new CartService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        String productIdStr = request.getParameter("productId");
        String sizeLabel = request.getParameter("sizeLabel");
        String quantityStr = request.getParameter("quantity");

        if (user == null) {
            session = request.getSession(true);
            session.setAttribute("redirectAfterLogin", request.getContextPath() + "/product-details?id=" + productIdStr);
            response.sendRedirect(request.getContextPath() + "/login?message=RequireLogin");
            return;
        }

        try {
            int productId = Integer.parseInt(productIdStr);
            int quantity = (quantityStr != null && !quantityStr.isEmpty()) ? Integer.parseInt(quantityStr) : 1;

            String result = cartService.addToCart(user.getUserId(), productId, sizeLabel, quantity);

            if ("SUCCESS".equals(result)) {
                request.getSession().setAttribute("cartSuccessMessage", "Item added to your shopping cart!");
                response.sendRedirect(request.getContextPath() + "/cart");
            } else {
                request.getSession().setAttribute("cartErrorMessage", result);
                response.sendRedirect(request.getContextPath() + "/product-details?id=" + productId);
            }
        } catch (Exception e) {
            response.sendRedirect(request.getContextPath() + "/products");
        }
    }
}
