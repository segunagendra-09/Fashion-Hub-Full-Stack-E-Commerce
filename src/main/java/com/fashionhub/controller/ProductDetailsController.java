package com.fashionhub.controller;

import com.fashionhub.model.Product;
import com.fashionhub.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/product-details")
public class ProductDetailsController extends HttpServlet {

    private final ProductService productService = new ProductService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/products");
            return;
        }

        try {
            int productId = Integer.parseInt(idParam);
            Product product = productService.getProductById(productId);

            if (product == null) {
                response.sendRedirect(request.getContextPath() + "/products?error=NotFound");
                return;
            }

            List<Product> relatedProducts = productService.getRelatedProducts(product.getCategoryId(), productId, 4);

            request.setAttribute("product", product);
            request.setAttribute("relatedProducts", relatedProducts);
            request.getRequestDispatcher("/product-details.jsp").forward(request, response);

        } catch (NumberFormatException e) {
            response.sendRedirect(request.getContextPath() + "/products");
        }
    }
}
