package com.fashionhub.controller;

import com.fashionhub.model.User;
import com.fashionhub.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/profile")
public class ProfileController extends HttpServlet {

    private final AuthService authService = new AuthService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        if (user == null) {
            session = request.getSession(true);
            session.setAttribute("redirectAfterLogin", request.getContextPath() + "/profile");
            response.sendRedirect(request.getContextPath() + "/login?message=RequireLogin");
            return;
        }

        // Fetch fresh user data
        User updatedUser = authService.getUserById(user.getUserId());
        if (updatedUser != null) {
            session.setAttribute("user", updatedUser);
        }

        request.getRequestDispatcher("/profile.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User user = (session != null) ? (User) session.getAttribute("user") : null;

        if (user == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String fullName = request.getParameter("fullName");
        String phone = request.getParameter("phone");
        String gender = request.getParameter("gender");
        String address = request.getParameter("address");

        user.setFullName(fullName);
        user.setPhone(phone);
        user.setGender(gender);
        user.setAddress(address);

        boolean success = authService.updateProfile(user);

        if (success) {
            session.setAttribute("user", user);
            request.setAttribute("profileSuccessMessage", "Profile details updated successfully!");
        } else {
            request.setAttribute("profileErrorMessage", "Failed to update profile. Please try again.");
        }

        request.getRequestDispatcher("/profile.jsp").forward(request, response);
    }
}
