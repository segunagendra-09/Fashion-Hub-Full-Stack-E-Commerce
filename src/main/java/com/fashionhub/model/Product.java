package com.fashionhub.model;

import java.sql.Timestamp;
import java.util.List;

public class Product {
    private int productId;
    private int categoryId;
    private String categoryName;
    private String productName;
    private String description;
    private double price;
    private int discountPercent;
    private String imageUrl;
    private String gender; // Men, Women, Unisex
    private boolean isActive;
    private Timestamp createdAt;
    private List<ProductSize> sizes;

    public Product() {}

    public Product(int productId, int categoryId, String productName, String description, double price, int discountPercent, String imageUrl, String gender, boolean isActive, Timestamp createdAt) {
        this.productId = productId;
        this.categoryId = categoryId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.discountPercent = discountPercent;
        this.imageUrl = imageUrl;
        this.gender = gender;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

    public double getDiscountedPrice() {
        if (discountPercent > 0) {
            return price * (1.0 - (discountPercent / 100.0));
        }
        return price;
    }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getCategoryId() { return categoryId; }
    public void setCategoryId(int categoryId) { this.categoryId = categoryId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public List<ProductSize> getSizes() { return sizes; }
    public void setSizes(List<ProductSize> sizes) { this.sizes = sizes; }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", price=" + price +
                ", discountPercent=" + discountPercent +
                '}';
    }
}
