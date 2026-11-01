package com.fashionhub.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@WebServlet("/search")
public class SearchController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String query = request.getParameter("q");
        if (query != null && !query.trim().isEmpty()) {
            String encoded = URLEncoder.encode(query.trim(), StandardCharsets.UTF_8);
            response.sendRedirect(request.getContextPath() + "/products?q=" + encoded);
        } else {
            response.sendRedirect(request.getContextPath() + "/products");
        }
    }
}
