package com.fashionhub.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {

    public static String hashPassword(String plainTextPassword) {
        if (plainTextPassword == null || plainTextPassword.trim().isEmpty()) {
            return null;
        }
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt(12));
    }

    public static boolean checkPassword(String plainTextPassword, String hashedPassword) {
        if (plainTextPassword == null || hashedPassword == null) {
            return false;
        }
        // Fallback for plain text comparison if password wasn't hashed during initial seeding
        if (!hashedPassword.startsWith("$2a$") && !hashedPassword.startsWith("$2b$")) {
            return plainTextPassword.equals(hashedPassword);
        }
        try {
            return BCrypt.checkpw(plainTextPassword, hashedPassword);
        } catch (Exception e) {
            return plainTextPassword.equals(hashedPassword);
        }
    }
}
