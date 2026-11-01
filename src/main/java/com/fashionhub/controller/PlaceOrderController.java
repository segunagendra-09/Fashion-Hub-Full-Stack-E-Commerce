package com.fashionhub.controller;

import com.fashionhub.model.Order;
import com.fashionhub.model.User;
import com.fashionhub.service.OrderService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/place-order")
public class PlaceOrderController extends HttpServlet {

    private final OrderService orderService = new OrderService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        if (user == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String paymentMethod = request.getParameter("paymentMethod");
        String deliveryAddress = request.getParameter("deliveryAddress");

        try {
            Order placedOrder = orderService.placeOrder(user.getUserId(), paymentMethod, deliveryAddress);
            request.getSession().setAttribute("latestOrder", placedOrder);
            response.sendRedirect(request.getContextPath() + "/order-success.jsp?orderId=" + placedOrder.getOrderId());
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("errorMessage", "Order placement failed: " + e.getMessage());
            request.getRequestDispatcher("/checkout.jsp").forward(request, response);
        }
    }
}
