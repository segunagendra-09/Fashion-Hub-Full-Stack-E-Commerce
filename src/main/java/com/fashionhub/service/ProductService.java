package com.fashionhub.service;

import com.fashionhub.dao.CategoryDAO;
import com.fashionhub.dao.ProductDAO;
import com.fashionhub.model.Category;
import com.fashionhub.model.Product;

import java.util.List;

public class ProductService {

    private final ProductDAO productDAO = new ProductDAO();
    private final CategoryDAO categoryDAO = new CategoryDAO();

    public List<Product> getAllProducts() {
        return productDAO.getAllProducts();
    }

    public List<Category> getAllCategories() {
        return categoryDAO.getAllCategories();
    }

    public Product getProductById(int productId) {
        return productDAO.getProductById(productId);
    }

    public List<Product> getFilteredProducts(Integer categoryId, String gender, String searchQuery, double minPrice, double maxPrice, int minDiscount, String sortBy) {
        return productDAO.getFilteredProducts(categoryId, gender, searchQuery, minPrice, maxPrice, minDiscount, sortBy);
    }

    public List<Product> getRelatedProducts(int categoryId, int excludeProductId, int limit) {
        return productDAO.getRelatedProducts(categoryId, excludeProductId, limit);
    }
}
