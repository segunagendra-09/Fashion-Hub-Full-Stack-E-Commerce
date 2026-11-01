package com.fashionhub.controller;

import com.fashionhub.model.Cart;
import com.fashionhub.model.User;
import com.fashionhub.service.CartService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/cart")
public class CartController extends HttpServlet {

    private final CartService cartService = new CartService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        if (user == null) {
            session = request.getSession(true);
            session.setAttribute("redirectAfterLogin", request.getContextPath() + "/cart");
            response.sendRedirect(request.getContextPath() + "/login?message=RequireLogin");
            return;
        }

        Cart cart = cartService.getUserCart(user.getUserId());
        request.setAttribute("cart", cart);
        request.getRequestDispatcher("/cart.jsp").forward(request, response);
    }
}
