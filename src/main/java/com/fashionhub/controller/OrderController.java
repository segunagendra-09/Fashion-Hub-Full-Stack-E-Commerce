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
import java.util.List;

@WebServlet("/my-orders")
public class OrderController extends HttpServlet {

    private final OrderService orderService = new OrderService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        if (user == null) {
            session = request.getSession(true);
            session.setAttribute("redirectAfterLogin", request.getContextPath() + "/my-orders");
            response.sendRedirect(request.getContextPath() + "/login?message=RequireLogin");
            return;
        }

        List<Order> orders = orderService.getUserOrders(user.getUserId());
        request.setAttribute("orders", orders);
        request.getRequestDispatcher("/my-orders.jsp").forward(request, response);
    }
}
