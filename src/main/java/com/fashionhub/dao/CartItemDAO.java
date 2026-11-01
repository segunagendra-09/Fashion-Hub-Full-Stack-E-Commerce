package com.fashionhub.dao;

import com.fashionhub.model.CartItem;
import com.fashionhub.model.Product;
import com.fashionhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CartItemDAO {

    public List<CartItem> getCartItemsByCartId(int cartId) {
        List<CartItem> items = new ArrayList<>();
        String sql = "SELECT ci.*, p.product_name, p.price, p.discount_percent, p.image_url, p.category_id, c.category_name " +
                     "FROM cart_items ci " +
                     "JOIN products p ON ci.product_id = p.product_id " +
                     "JOIN categories c ON p.category_id = c.category_id " +
                     "WHERE ci.cart_id = ? ORDER BY ci.added_at DESC";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, cartId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    CartItem item = mapCartItem(rs);
                    
                    Product product = new Product();
                    product.setProductId(rs.getInt("product_id"));
                    product.setProductName(rs.getString("product_name"));
                    product.setPrice(rs.getDouble("price"));
                    product.setDiscountPercent(rs.getInt("discount_percent"));
                    product.setImageUrl(rs.getString("image_url"));
                    product.setCategoryId(rs.getInt("category_id"));
                    product.setCategoryName(rs.getString("category_name"));
                    
                    item.setProduct(product);
                    items.add(item);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    public CartItem getCartItemByCartProductAndSize(int cartId, int productId, String sizeLabel) {
        String sql = "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? AND size_label = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, cartId);
            pstmt.setInt(2, productId);
            pstmt.setString(3, sizeLabel);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapCartItem(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean addCartItem(CartItem item) {
        String sql = "INSERT INTO cart_items (cart_id, product_id, size_label, quantity, unit_price) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, item.getCartId());
            pstmt.setInt(2, item.getProductId());
            pstmt.setString(3, item.getSizeLabel());
            pstmt.setInt(4, item.getQuantity());
            pstmt.setDouble(5, item.getUnitPrice());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateCartItemQuantity(int cartItemId, int newQuantity) {
        String sql = "UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, newQuantity);
            pstmt.setInt(2, cartItemId);

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean removeCartItem(int cartItemId) {
        String sql = "DELETE FROM cart_items WHERE cart_item_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, cartItemId);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private CartItem mapCartItem(ResultSet rs) throws SQLException {
        CartItem ci = new CartItem();
        ci.setCartItemId(rs.getInt("cart_item_id"));
        ci.setCartId(rs.getInt("cart_id"));
        ci.setProductId(rs.getInt("product_id"));
        ci.setSizeLabel(rs.getString("size_label"));
        ci.setQuantity(rs.getInt("quantity"));
        ci.setUnitPrice(rs.getDouble("unit_price"));
        ci.setAddedAt(rs.getTimestamp("added_at"));
        return ci;
    }
}
