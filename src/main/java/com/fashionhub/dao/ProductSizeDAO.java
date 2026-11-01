package com.fashionhub.dao;

import com.fashionhub.model.ProductSize;
import com.fashionhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductSizeDAO {

    public List<ProductSize> getSizesByProductId(int productId) {
        List<ProductSize> list = new ArrayList<>();
        String sql = "SELECT * FROM product_sizes WHERE product_id = ? AND is_available = TRUE ORDER BY product_size_id ASC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, productId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapProductSize(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public ProductSize getSizeByProductAndLabel(int productId, String sizeLabel) {
        String sql = "SELECT * FROM product_sizes WHERE product_id = ? AND size_label = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, productId);
            pstmt.setString(2, sizeLabel);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapProductSize(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean reduceStock(Connection conn, int productId, String sizeLabel, int quantity) throws SQLException {
        String sql = "UPDATE product_sizes SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND size_label = ? AND stock_quantity >= ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, quantity);
            pstmt.setInt(2, productId);
            pstmt.setString(3, sizeLabel);
            pstmt.setInt(4, quantity);
            return pstmt.executeUpdate() > 0;
        }
    }

    private ProductSize mapProductSize(ResultSet rs) throws SQLException {
        ProductSize ps = new ProductSize();
        ps.setProductSizeId(rs.getInt("product_size_id"));
        ps.setProductId(rs.getInt("product_id"));
        ps.setSizeLabel(rs.getString("size_label"));
        ps.setStockQuantity(rs.getInt("stock_quantity"));
        ps.setSkuCode(rs.getString("sku_code"));
        ps.setAvailable(rs.getBoolean("is_available"));
        return ps;
    }
}
