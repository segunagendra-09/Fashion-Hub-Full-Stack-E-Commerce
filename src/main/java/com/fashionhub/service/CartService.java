package com.fashionhub.service;

import com.fashionhub.dao.CartDAO;
import com.fashionhub.dao.CartItemDAO;
import com.fashionhub.dao.ProductDAO;
import com.fashionhub.dao.ProductSizeDAO;
import com.fashionhub.model.Cart;
import com.fashionhub.model.CartItem;
import com.fashionhub.model.Product;
import com.fashionhub.model.ProductSize;

public class CartService {

    private final CartDAO cartDAO = new CartDAO();
    private final CartItemDAO cartItemDAO = new CartItemDAO();
    private final ProductDAO productDAO = new ProductDAO();
    private final ProductSizeDAO productSizeDAO = new ProductSizeDAO();

    public Cart getUserCart(int userId) {
        return cartDAO.getOrCreateCartByUserId(userId);
    }

    public String addToCart(int userId, int productId, String sizeLabel, int quantity) {
        if (sizeLabel == null || sizeLabel.trim().isEmpty()) {
            return "Please select a size before adding to cart.";
        }

        Product product = productDAO.getProductById(productId);
        if (product == null) {
            return "Product not found.";
        }

        ProductSize productSize = productSizeDAO.getSizeByProductAndLabel(productId, sizeLabel);
        if (productSize == null || !productSize.isAvailable()) {
            return "Selected size " + sizeLabel + " is currently unavailable.";
        }

        if (productSize.getStockQuantity() < quantity) {
            return "Only " + productSize.getStockQuantity() + " items available in stock for size " + sizeLabel + ".";
        }

        Cart cart = cartDAO.getOrCreateCartByUserId(userId);
        CartItem existingItem = cartItemDAO.getCartItemByCartProductAndSize(cart.getCartId(), productId, sizeLabel);

        if (existingItem != null) {
            int newQuantity = existingItem.getQuantity() + quantity;
            if (productSize.getStockQuantity() < newQuantity) {
                return "Cannot add " + quantity + " more. Stock limit of " + productSize.getStockQuantity() + " reached.";
            }
            boolean updated = cartItemDAO.updateCartItemQuantity(existingItem.getCartItemId(), newQuantity);
            return updated ? "SUCCESS" : "Failed to update item quantity in cart.";
        } else {
            CartItem newItem = new CartItem();
            newItem.setCartId(cart.getCartId());
            newItem.setProductId(productId);
            newItem.setSizeLabel(sizeLabel);
            newItem.setQuantity(quantity);
            newItem.setUnitPrice(product.getDiscountedPrice());

            boolean added = cartItemDAO.addCartItem(newItem);
            return added ? "SUCCESS" : "Failed to add item to cart.";
        }
    }

    public boolean updateCartQuantity(int cartItemId, int newQuantity) {
        if (newQuantity <= 0) {
            return cartItemDAO.removeCartItem(cartItemId);
        }
        return cartItemDAO.updateCartItemQuantity(cartItemId, newQuantity);
    }

    public boolean removeCartItem(int cartItemId) {
        return cartItemDAO.removeCartItem(cartItemId);
    }
}
