package com.fashionhub.dao;

import com.fashionhub.model.Cart;
import com.fashionhub.util.DBConnection;

import java.sql.*;

public class CartDAO {

    private final CartItemDAO cartItemDAO = new CartItemDAO();

    public Cart getOrCreateCartByUserId(int userId) {
        Cart cart = getCartByUserId(userId);
        if (cart == null) {
            cart = createCart(userId);
        }
        if (cart != null) {
            cart.setItems(cartItemDAO.getCartItemsByCartId(cart.getCartId()));
        }
        return cart;
    }

    public Cart getCartByUserId(int userId) {
        String sql = "SELECT * FROM cart WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapCart(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Cart createCart(int userId) {
        String sql = "INSERT INTO cart (user_id) VALUES (?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setInt(1, userId);
            int affected = pstmt.executeUpdate();
            if (affected > 0) {
                try (ResultSet rs = pstmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        Cart cart = new Cart();
                        cart.setCartId(rs.getInt(1));
                        cart.setUserId(userId);
                        return cart;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void clearCart(Connection conn, int cartId) throws SQLException {
        String sql = "DELETE FROM cart_items WHERE cart_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, cartId);
            pstmt.executeUpdate();
        }
    }

    private Cart mapCart(ResultSet rs) throws SQLException {
        Cart c = new Cart();
        c.setCartId(rs.getInt("cart_id"));
        c.setUserId(rs.getInt("user_id"));
        c.setCreatedAt(rs.getTimestamp("created_at"));
        c.setUpdatedAt(rs.getTimestamp("updated_at"));
        return c;
    }
}
