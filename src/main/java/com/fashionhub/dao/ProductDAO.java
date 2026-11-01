package com.fashionhub.dao;

import com.fashionhub.model.Product;
import com.fashionhub.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    private final ProductSizeDAO productSizeDAO = new ProductSizeDAO();

    public List<Product> getAllProducts() {
        return getFilteredProducts(null, null, null, 0, 0, 0, "featured");
    }

    public List<Product> getFilteredProducts(Integer categoryId, String gender, String searchQuery, double minPrice, double maxPrice, int minDiscount, String sortBy) {
        List<Product> products = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT p.*, c.category_name FROM products p ")
                .append("JOIN categories c ON p.category_id = c.category_id WHERE p.is_active = TRUE ");

        List<Object> params = new ArrayList<>();

        if (categoryId != null && categoryId > 0) {
            sql.append("AND p.category_id = ? ");
            params.add(categoryId);
        }

        if (gender != null && !gender.trim().isEmpty() && !gender.equalsIgnoreCase("All")) {
            sql.append("AND (LOWER(p.gender) = LOWER(?) OR LOWER(p.gender) = 'unisex') ");
            params.add(gender);
        }

        if (searchQuery != null && !searchQuery.trim().isEmpty()) {
            sql.append("AND (LOWER(p.product_name) LIKE ? OR LOWER(p.description) LIKE ?) ");
            String term = "%" + searchQuery.toLowerCase().trim() + "%";
            params.add(term);
            params.add(term);
        }

        if (minPrice > 0) {
            sql.append("AND (p.price * (1 - p.discount_percent / 100.0)) >= ? ");
            params.add(minPrice);
        }

        if (maxPrice > 0) {
            sql.append("AND (p.price * (1 - p.discount_percent / 100.0)) <= ? ");
            params.add(maxPrice);
        }

        if (minDiscount > 0) {
            sql.append("AND p.discount_percent >= ? ");
            params.add(minDiscount);
        }

        // Sorting
        if ("price_asc".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY (p.price * (1 - p.discount_percent / 100.0)) ASC ");
        } else if ("price_desc".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY (p.price * (1 - p.discount_percent / 100.0)) DESC ");
        } else if ("newest".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY p.created_at DESC ");
        } else if ("discount".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY p.discount_percent DESC ");
        } else {
            sql.append("ORDER BY p.product_id ASC ");
        }

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < params.size(); i++) {
                pstmt.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Product p = mapProduct(rs);
                    p.setSizes(productSizeDAO.getSizesByProductId(p.getProductId()));
                    products.add(p);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    public Product getProductById(int productId) {
        String sql = "SELECT p.*, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE p.product_id = ? AND p.is_active = TRUE";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, productId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    Product p = mapProduct(rs);
                    p.setSizes(productSizeDAO.getSizesByProductId(p.getProductId()));
                    return p;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Product> getRelatedProducts(int categoryId, int excludeProductId, int limit) {
        List<Product> list = new ArrayList<>();
        String sql = "SELECT p.*, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id " +
                     "WHERE p.category_id = ? AND p.product_id != ? AND p.is_active = TRUE LIMIT ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, categoryId);
            pstmt.setInt(2, excludeProductId);
            pstmt.setInt(3, limit);

            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    Product p = mapProduct(rs);
                    p.setSizes(productSizeDAO.getSizesByProductId(p.getProductId()));
                    list.add(p);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    private Product mapProduct(ResultSet rs) throws SQLException {
        Product p = new Product();
        p.setProductId(rs.getInt("product_id"));
        p.setCategoryId(rs.getInt("category_id"));
        p.setCategoryName(rs.getString("category_name"));
        p.setProductName(rs.getString("product_name"));
        p.setDescription(rs.getString("description"));
        p.setPrice(rs.getDouble("price"));
        p.setDiscountPercent(rs.getInt("discount_percent"));
        p.setImageUrl(rs.getString("image_url"));
        p.setGender(rs.getString("gender"));
        p.setActive(rs.getBoolean("is_active"));
        p.setCreatedAt(rs.getTimestamp("created_at"));
        return p;
    }
}
