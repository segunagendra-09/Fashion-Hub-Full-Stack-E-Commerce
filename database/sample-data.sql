-- =========================================================
-- FASHION HUB - Sample Data (Men's Wear Focused)
-- Database: fashion_hub
-- =========================================================

USE fashion_hub;

-- ---------------------------------------------------------
-- 1. INSERT DEMO USERS
-- Password default for all demo users: Password123
-- ---------------------------------------------------------
INSERT INTO users (full_name, email, phone, password, gender, address) VALUES
('SEGU NAGENDRA', 'nagendrasegu2901@gmail.com', '+91 9876543210', 'Password123', 'Male', '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038'),
('Alexander Wright', 'alex.wright@example.com', '+91 9123456789', 'Password123', 'Male', '702 Skyline Towers, Bandra West, Mumbai, Maharashtra - 400050'),
('David Miller', 'david.m@example.com', '+91 9988776655', 'Password123', 'Male', '15 Connaught Place, New Delhi - 110001');

-- ---------------------------------------------------------
-- 2. INSERT CATEGORIES (Men's Wear Categories)
-- ---------------------------------------------------------
INSERT INTO categories (category_name, description, is_active) VALUES
('Shirts & Polos', 'Tailored Oxford shirts, pure linen button-downs, mercerized cotton polos, and formal dress shirts.', TRUE),
('Outerwear & Blazers', 'Full-grain leather biker jackets, Italian wool blazers, trench coats, and structured tuxedos.', TRUE),
('Denim & Trousers', 'Japanese selvedge denim, slim-fit stretch chinos, and pleated formal wool trousers.', TRUE),
('Footwear & Boots', 'Handcrafted calfskin oxfords, velvety suede Chelsea boots, and urban minimalist sneakers.', TRUE);

-- ---------------------------------------------------------
-- 3. INSERT PRODUCTS (Men's Wear Items in INR ₹)
-- ---------------------------------------------------------
INSERT INTO products (category_id, product_name, description, price, discount_percent, image_url, gender, is_active) VALUES
(1, 'Classic Oxford Cotton Shirt', 'Crafted from 100% long-staple Egyptian cotton with a refined button-down collar and tailored slim fit.', 2999.00, 15, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(2, 'Premium Obsidian Leather Jacket', 'Full-grain lambskin leather biker jacket with asymmetric matte black zippers and quilted satin lining.', 8999.00, 20, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(3, 'Slim-Fit Japanese Selvedge Denim', 'Authentic 13.5oz indigo selvedge denim woven on vintage shuttle looms with raw brass hardware.', 4499.00, 10, 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(2, 'Urban Minimalist Heavyweight Hoodie', '450gsm French terry cotton hoodie featuring drop shoulders, hidden side seam pockets, and ribbed trim.', 3299.00, 25, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(2, 'Structured Charcoal Wool Blazer', 'Modern single-breasted wool-blend blazer with notch lapels and functional kiss button cuffs.', 6999.00, 15, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(1, 'Casual Mercerized Cotton Polo', 'Ultra-soft mercerized Pima cotton polo shirt with mother-of-pearl buttons and split hem.', 1999.00, 0, 'https://images.unsplash.com/photo-1625910513413-5fc28340d21a?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(1, 'Pure Italian Linen Resort Shirt', 'Lightweight Italian flax linen camp-collar shirt designed for breathable warm-weather luxury.', 3499.00, 10, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(3, 'Tailored Slim-Fit Chino Trousers', 'Stretch cotton twill chinos with clean front pleats, horn buttons, and secure back welt pockets.', 2799.00, 15, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(4, 'Heritage Calfskin Leather Oxfords', 'Hand-burnished Italian calfskin leather oxfords with Goodyear welted leather soles.', 5499.00, 10, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(4, 'Velvety Suede Chelsea Boots', 'Italian suede Chelsea boots featuring flexible elastic side goring and durable crepe rubber sole.', 4999.00, 20, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(4, 'Street Classic White Leather Sneakers', 'Minimalist low-top leather sneakers with cushioned insoles and durable rubber soles.', 3999.00, 15, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', 'Men', TRUE),
(2, 'Vintage Suede Aviator Bomber Jacket', 'Heavyweight brown suede aviator jacket lined with plush shearling collar and zip brass hardware.', 9499.00, 15, 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80', 'Men', TRUE);

-- ---------------------------------------------------------
-- 4. INSERT PRODUCT_SIZES FOR ALL PRODUCTS
-- ---------------------------------------------------------
INSERT INTO product_sizes (product_id, size_label, stock_quantity, sku_code, is_available) VALUES
-- Product 1: Classic Oxford Shirt
(1, 'S', 25, 'FH-SHIRT-001-S', TRUE),
(1, 'M', 40, 'FH-SHIRT-001-M', TRUE),
(1, 'L', 30, 'FH-SHIRT-001-L', TRUE),
(1, 'XL', 15, 'FH-SHIRT-001-XL', TRUE),
(1, 'XXL', 10, 'FH-SHIRT-001-XXL', TRUE),

-- Product 2: Leather Jacket
(2, 'S', 12, 'FH-JKT-002-S', TRUE),
(2, 'M', 20, 'FH-JKT-002-M', TRUE),
(2, 'L', 18, 'FH-JKT-002-L', TRUE),
(2, 'XL', 8, 'FH-JKT-002-XL', TRUE),

-- Product 3: Japanese Selvedge Denim
(3, '30', 15, 'FH-JEAN-003-30', TRUE),
(3, '32', 25, 'FH-JEAN-003-32', TRUE),
(3, '34', 20, 'FH-JEAN-003-34', TRUE),
(3, '36', 10, 'FH-JEAN-003-36', TRUE),

-- Product 4: Urban Hoodie
(4, 'S', 18, 'FH-HOOD-004-S', TRUE),
(4, 'M', 35, 'FH-HOOD-004-M', TRUE),
(4, 'L', 25, 'FH-HOOD-004-L', TRUE),
(4, 'XL', 15, 'FH-HOOD-004-XL', TRUE),

-- Product 5: Charcoal Wool Blazer
(5, 'S', 10, 'FH-BLZ-005-S', TRUE),
(5, 'M', 22, 'FH-BLZ-005-M', TRUE),
(5, 'L', 15, 'FH-BLZ-005-L', TRUE),
(5, 'XL', 5, 'FH-BLZ-005-XL', TRUE),

-- Product 6: Mercerized Polo
(6, 'S', 20, 'FH-POLO-006-S', TRUE),
(6, 'M', 30, 'FH-POLO-006-M', TRUE),
(6, 'L', 25, 'FH-POLO-006-L', TRUE),

-- Product 7: Linen Resort Shirt
(7, 'S', 15, 'FH-LIN-007-S', TRUE),
(7, 'M', 25, 'FH-LIN-007-M', TRUE),
(7, 'L', 20, 'FH-LIN-007-L', TRUE),

-- Product 8: Chino Trousers
(8, '30', 12, 'FH-CHN-008-30', TRUE),
(8, '32', 20, 'FH-CHN-008-32', TRUE),
(8, '34', 18, 'FH-CHN-008-34', TRUE),

-- Footwear (UK Sizes)
(9, 'UK 7', 10, 'FH-OXF-009-7', TRUE),
(9, 'UK 8', 15, 'FH-OXF-009-8', TRUE),
(9, 'UK 9', 18, 'FH-OXF-009-9', TRUE),

(10, 'UK 7', 12, 'FH-BOOT-010-7', TRUE),
(10, 'UK 8', 20, 'FH-BOOT-010-8', TRUE),
(10, 'UK 9', 16, 'FH-BOOT-010-9', TRUE),

(11, 'UK 7', 15, 'FH-SNK-011-7', TRUE),
(11, 'UK 8', 22, 'FH-SNK-011-8', TRUE),
(11, 'UK 9', 25, 'FH-SNK-011-9', TRUE),

(12, 'S', 8, 'FH-AVT-012-S', TRUE),
(12, 'M', 15, 'FH-AVT-012-M', TRUE),
(12, 'L', 12, 'FH-AVT-012-L', TRUE);

-- ---------------------------------------------------------
-- 5. INSERT SAMPLE CART & ORDERS FOR DEMO USER 1
-- ---------------------------------------------------------
INSERT INTO cart (user_id) VALUES (1);
INSERT INTO cart_items (cart_id, product_id, size_label, quantity, unit_price) VALUES
(1, 1, 'M', 1, 2549.15),
(1, 11, 'UK 8', 1, 3399.15);

INSERT INTO orders (order_id, user_id, order_date, total_amount, payment_method, order_status, delivery_address) VALUES
(1001, 1, DATE_SUB(NOW(), INTERVAL 3 DAY), 7199.00, 'UPI', 'DELIVERED', '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038'),
(1002, 1, DATE_SUB(NOW(), INTERVAL 1 DAY), 11498.00, 'Credit/Debit Card', 'SHIPPED', '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal, size_label) VALUES
(1001, 3, 'Slim-Fit Japanese Selvedge Denim', 1, 4049.10, 4049.10, '32'),
(1001, 4, 'Urban Minimalist Heavyweight Hoodie', 1, 2474.25, 2474.25, 'M'),
(1002, 2, 'Premium Obsidian Leather Jacket', 1, 7199.20, 7199.20, 'L'),
(1002, 9, 'Heritage Calfskin Leather Oxfords', 1, 4949.10, 4949.10, 'UK 9');
