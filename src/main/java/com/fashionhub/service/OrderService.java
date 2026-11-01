package com.fashionhub.service;

import com.fashionhub.dao.CartDAO;
import com.fashionhub.dao.OrderDAO;
import com.fashionhub.model.Cart;
import com.fashionhub.model.Order;

import java.sql.SQLException;
import java.util.List;

public class OrderService {

    private final OrderDAO orderDAO = new OrderDAO();
    private final CartDAO cartDAO = new CartDAO();

    public Order placeOrder(int userId, String paymentMethod, String deliveryAddress) throws SQLException {
        if (deliveryAddress == null || deliveryAddress.trim().isEmpty()) {
            throw new IllegalArgumentException("Delivery address is required.");
        }
        if (paymentMethod == null || paymentMethod.trim().isEmpty()) {
            throw new IllegalArgumentException("Payment method is required.");
        }

        Cart cart = cartDAO.getOrCreateCartByUserId(userId);
        if (cart == null || cart.getItems().isEmpty()) {
            throw new IllegalStateException("Your cart is empty. Add items before checking out.");
        }

        return orderDAO.createOrderFromCart(userId, cart, paymentMethod, deliveryAddress);
    }

    public List<Order> getUserOrders(int userId) {
        return orderDAO.getOrdersByUserId(userId);
    }

    public Order getOrderById(int orderId) {
        return orderDAO.getOrderById(orderId);
    }
}
