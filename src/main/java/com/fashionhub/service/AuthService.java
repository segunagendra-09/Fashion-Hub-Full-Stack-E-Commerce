package com.fashionhub.service;

import com.fashionhub.dao.UserDAO;
import com.fashionhub.model.User;
import com.fashionhub.util.PasswordUtil;

public class AuthService {

    private final UserDAO userDAO = new UserDAO();

    public User authenticate(String email, String password) {
        if (email == null || password == null) {
            return null;
        }
        User user = userDAO.getUserByEmail(email);
        if (user != null && PasswordUtil.checkPassword(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public String registerUser(User user, String confirmPassword) {
        if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
            return "Full Name is required.";
        }
        if (user.getEmail() == null || !user.getEmail().contains("@")) {
            return "A valid Email address is required.";
        }
        if (user.getPhone() == null || user.getPhone().trim().length() < 10) {
            return "A valid Phone number is required (min 10 digits).";
        }
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!user.getPassword().equals(confirmPassword)) {
            return "Passwords do not match.";
        }
        if (userDAO.isEmailRegistered(user.getEmail())) {
            return "This email is already registered. Please login instead.";
        }

        boolean success = userDAO.registerUser(user);
        if (success) {
            return "SUCCESS";
        }
        return "Failed to register user. Please try again later.";
    }

    public boolean updateProfile(User user) {
        return userDAO.updateUserProfile(user);
    }

    public User getUserById(int userId) {
        return userDAO.getUserById(userId);
    }
}
