package com.fashionhub.controller;

import com.fashionhub.model.Category;
import com.fashionhub.model.Product;
import com.fashionhub.service.ProductService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/products")
public class ProductController extends HttpServlet {

    private final ProductService productService = new ProductService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String catParam = request.getParameter("categoryId");
        Integer categoryId = (catParam != null && !catParam.isEmpty()) ? Integer.parseInt(catParam) : null;
        
        String gender = request.getParameter("gender");
        String search = request.getParameter("q");
        String sortBy = request.getParameter("sort");
        
        String minPriceStr = request.getParameter("minPrice");
        double minPrice = (minPriceStr != null && !minPriceStr.isEmpty()) ? Double.parseDouble(minPriceStr) : 0;
        
        String maxPriceStr = request.getParameter("maxPrice");
        double maxPrice = (maxPriceStr != null && !maxPriceStr.isEmpty()) ? Double.parseDouble(maxPriceStr) : 0;

        String minDiscountStr = request.getParameter("minDiscount");
        int minDiscount = (minDiscountStr != null && !minDiscountStr.isEmpty()) ? Integer.parseInt(minDiscountStr) : 0;

        List<Product> products = productService.getFilteredProducts(categoryId, gender, search, minPrice, maxPrice, minDiscount, sortBy);
        List<Category> categories = productService.getAllCategories();

        request.setAttribute("products", products);
        request.setAttribute("categories", categories);
        request.setAttribute("selectedCategory", categoryId);
        request.setAttribute("selectedGender", gender);
        request.setAttribute("searchQuery", search);
        request.setAttribute("sortBy", sortBy);
        request.setAttribute("minPrice", minPrice);
        request.setAttribute("maxPrice", maxPrice);
        request.setAttribute("minDiscount", minDiscount);

        request.getRequestDispatcher("/products.jsp").forward(request, response);
    }
}
