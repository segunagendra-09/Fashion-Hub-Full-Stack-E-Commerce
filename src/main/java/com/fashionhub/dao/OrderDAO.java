package com.fashionhub.dao;

import com.fashionhub.model.Cart;
import com.fashionhub.model.CartItem;
import com.fashionhub.model.Order;
import com.fashionhub.model.OrderItem;
import com.fashionhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrderDAO {

    private final OrderItemDAO orderItemDAO = new OrderItemDAO();
    private final ProductSizeDAO productSizeDAO = new ProductSizeDAO();
    private final CartDAO cartDAO = new CartDAO();

    public Order createOrderFromCart(int userId, Cart cart, String paymentMethod, String deliveryAddress) throws SQLException {
        if (cart == null || cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cannot create order from an empty cart.");
        }

        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false); // Begin JDBC Transaction

            // 1. Create Order record
            String orderSql = "INSERT INTO orders (user_id, total_amount, payment_method, order_status, delivery_address) VALUES (?, ?, ?, ?, ?)";
            int orderId = -1;

            try (PreparedStatement pstmt = conn.prepareStatement(orderSql, Statement.RETURN_GENERATED_KEYS)) {
                pstmt.setInt(1, userId);
                pstmt.setDouble(2, cart.getTotalAmount());
                pstmt.setString(3, paymentMethod);
                pstmt.setString(4, "PLACED");
                pstmt.setString(5, deliveryAddress);

                int affected = pstmt.executeUpdate();
                if (affected == 0) {
                    throw new SQLException("Creating order failed, no rows affected.");
                }

                try (ResultSet rs = pstmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        orderId = rs.getInt(1);
                    } else {
                        throw new SQLException("Creating order failed, no ID obtained.");
                    }
                }
            }

            // 2. Create Order Items & Reduce Stock
            String itemSql = "INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal, size_label) VALUES (?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(itemSql)) {
                for (CartItem item : cart.getItems()) {
                    // Check and reduce stock
                    boolean stockReduced = productSizeDAO.reduceStock(conn, item.getProductId(), item.getSizeLabel(), item.getQuantity());
                    if (!stockReduced) {
                        throw new SQLException("Insufficient stock for product " + item.getProduct().getProductName() + " (Size: " + item.getSizeLabel() + ")");
                    }

                    pstmt.setInt(1, orderId);
                    pstmt.setInt(2, item.getProductId());
                    pstmt.setString(3, item.getProduct().getProductName());
                    pstmt.setInt(4, item.getQuantity());
                    pstmt.setDouble(5, item.getUnitPrice());
                    pstmt.setDouble(6, item.getSubtotal());
                    pstmt.setString(7, item.getSizeLabel());
                    pstmt.addBatch();
                }
                pstmt.executeBatch();
            }

            // 3. Clear Cart
            cartDAO.clearCart(conn, cart.getCartId());

            // 4. Commit Transaction
            conn.commit();

            return getOrderById(orderId);

        } catch (SQLException e) {
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
            throw e;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

    public List<Order> getOrdersByUserId(int userId) {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Order order = mapOrder(rs);
                    order.setItems(orderItemDAO.getOrderItemsByOrderId(order.getOrderId()));
                    orders.add(order);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

    public Order getOrderById(int orderId) {
        String sql = "SELECT * FROM orders WHERE order_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, orderId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Order order = mapOrder(rs);
                    order.setItems(orderItemDAO.getOrderItemsByOrderId(orderId));
                    return order;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Order mapOrder(ResultSet rs) throws SQLException {
        Order o = new Order();
        o.setOrderId(rs.getInt("order_id"));
        o.setUserId(rs.getInt("user_id"));
        o.setOrderDate(rs.getTimestamp("order_date"));
        o.setTotalAmount(rs.getDouble("total_amount"));
        o.setPaymentMethod(rs.getString("payment_method"));
        o.setOrderStatus(rs.getString("order_status"));
        o.setDeliveryAddress(rs.getString("delivery_address"));
        return o;
    }
}
