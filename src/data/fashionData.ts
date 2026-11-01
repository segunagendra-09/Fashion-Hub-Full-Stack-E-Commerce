import { Category, Product, User, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    categoryId: 1,
    categoryName: 'Shirts & Polos',
    description: 'Tailored Oxford shirts, pure linen button-downs, mercerized cotton polos, and formal dress shirts.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    categoryId: 2,
    categoryName: 'Outerwear & Blazers',
    description: 'Full-grain leather biker jackets, Italian wool blazers, trench coats, and structured tuxedos.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    categoryId: 3,
    categoryName: 'Denim & Trousers',
    description: 'Japanese selvedge denim, slim-fit stretch chinos, and pleated formal wool trousers.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    categoryId: 4,
    categoryName: 'Footwear & Boots',
    description: 'Handcrafted calfskin oxfords, velvety suede Chelsea boots, and urban minimalist sneakers.',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- Category 1: Shirts & Polos ---
  {
    productId: 1,
    categoryId: 1,
    categoryName: 'Shirts & Polos',
    productName: 'Classic Oxford Cotton Shirt',
    description: 'Crafted from 100% long-staple Egyptian cotton with a refined button-down collar and tailored slim fit.',
    price: 2999,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-15T10:00:00Z',
    rating: 4.8,
    reviewCount: 94,
    sizes: [
      { productSizeId: 101, productId: 1, sizeLabel: 'S', stockQuantity: 25, sku_code: 'FH-SHIRT-001-S', isAvailable: true },
      { productSizeId: 102, productId: 1, sizeLabel: 'M', stockQuantity: 40, sku_code: 'FH-SHIRT-001-M', isAvailable: true },
      { productSizeId: 103, productId: 1, sizeLabel: 'L', stockQuantity: 30, sku_code: 'FH-SHIRT-001-L', isAvailable: true },
      { productSizeId: 104, productId: 1, sizeLabel: 'XL', stockQuantity: 15, sku_code: 'FH-SHIRT-001-XL', isAvailable: true },
    ]
  },
  {
    productId: 2,
    categoryId: 1,
    categoryName: 'Shirts & Polos',
    productName: 'Casual Mercerized Cotton Polo',
    description: 'Ultra-soft mercerized Pima cotton polo shirt with mother-of-pearl buttons and split hem.',
    price: 1999,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-09-01T10:00:00Z',
    rating: 4.6,
    reviewCount: 38,
    sizes: [
      { productSizeId: 201, productId: 2, sizeLabel: 'S', stockQuantity: 20, sku_code: 'FH-POLO-002-S', isAvailable: true },
      { productSizeId: 202, productId: 2, sizeLabel: 'M', stockQuantity: 30, sku_code: 'FH-POLO-002-M', isAvailable: true },
      { productSizeId: 203, productId: 2, sizeLabel: 'L', stockQuantity: 25, sku_code: 'FH-POLO-002-L', isAvailable: true },
      { productSizeId: 204, productId: 2, sizeLabel: 'XL', stockQuantity: 12, sku_code: 'FH-POLO-002-XL', isAvailable: true },
    ]
  },
  {
    productId: 3,
    categoryId: 1,
    categoryName: 'Shirts & Polos',
    productName: 'Pure Italian Linen Resort Shirt',
    description: 'Lightweight Italian flax linen camp-collar shirt designed for breathable warm-weather luxury.',
    price: 3499,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-18T10:00:00Z',
    rating: 4.8,
    reviewCount: 52,
    sizes: [
      { productSizeId: 301, productId: 3, sizeLabel: 'S', stockQuantity: 15, sku_code: 'FH-LIN-003-S', isAvailable: true },
      { productSizeId: 302, productId: 3, sizeLabel: 'M', stockQuantity: 25, sku_code: 'FH-LIN-003-M', isAvailable: true },
      { productSizeId: 303, productId: 3, sizeLabel: 'L', stockQuantity: 20, sku_code: 'FH-LIN-003-L', isAvailable: true },
    ]
  },
  {
    productId: 4,
    categoryId: 1,
    categoryName: 'Shirts & Polos',
    productName: 'Royal Herringbone Formal Dress Shirt',
    description: 'Crisp 120s double-twisted cotton herringbone weave dress shirt with french cuffs.',
    price: 3899,
    discountPercent: 10,
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-28T10:00:00Z',
    rating: 4.9,
    reviewCount: 41,
    sizes: [
      { productSizeId: 401, productId: 4, sizeLabel: 'S', stockQuantity: 10, sku_code: 'FH-DRESS-004-S', isAvailable: true },
      { productSizeId: 402, productId: 4, sizeLabel: 'M', stockQuantity: 20, sku_code: 'FH-DRESS-004-M', isAvailable: true },
      { productSizeId: 403, productId: 4, sizeLabel: 'L', stockQuantity: 15, sku_code: 'FH-DRESS-004-L', isAvailable: true },
    ]
  },

  // --- Category 2: Outerwear & Blazers ---
  {
    productId: 5,
    categoryId: 2,
    categoryName: 'Outerwear & Blazers',
    productName: 'Premium Obsidian Leather Biker Jacket',
    description: 'Full-grain lambskin leather biker jacket with asymmetric matte black zippers and quilted satin lining.',
    price: 8999,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-20T10:00:00Z',
    rating: 4.9,
    reviewCount: 112,
    sizes: [
      { productSizeId: 501, productId: 5, sizeLabel: 'S', stockQuantity: 12, sku_code: 'FH-JKT-005-S', isAvailable: true },
      { productSizeId: 502, productId: 5, sizeLabel: 'M', stockQuantity: 20, sku_code: 'FH-JKT-005-M', isAvailable: true },
      { productSizeId: 503, productId: 5, sizeLabel: 'L', stockQuantity: 18, sku_code: 'FH-JKT-005-L', isAvailable: true },
    ]
  },
  {
    productId: 6,
    categoryId: 2,
    categoryName: 'Outerwear & Blazers',
    productName: 'Structured Charcoal Wool Blazer',
    description: 'Modern single-breasted wool-blend blazer with notch lapels and functional kiss button cuffs.',
    price: 6999,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-28T10:00:00Z',
    rating: 4.9,
    reviewCount: 45,
    sizes: [
      { productSizeId: 601, productId: 6, sizeLabel: 'S', stockQuantity: 10, sku_code: 'FH-BLZ-006-S', isAvailable: true },
      { productSizeId: 602, productId: 6, sizeLabel: 'M', stockQuantity: 22, sku_code: 'FH-BLZ-006-M', isAvailable: true },
      { productSizeId: 603, productId: 6, sizeLabel: 'L', stockQuantity: 15, sku_code: 'FH-BLZ-006-L', isAvailable: true },
    ]
  },
  {
    productId: 7,
    categoryId: 2,
    categoryName: 'Outerwear & Blazers',
    productName: 'Urban Minimalist Heavyweight Hoodie',
    description: '450gsm French terry cotton hoodie featuring drop shoulders, hidden side seam pockets, and ribbed trim.',
    price: 3299,
    discountPercent: 25,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-25T10:00:00Z',
    rating: 4.8,
    reviewCount: 81,
    sizes: [
      { productSizeId: 701, productId: 7, sizeLabel: 'S', stockQuantity: 18, sku_code: 'FH-HOOD-007-S', isAvailable: true },
      { productSizeId: 702, productId: 7, sizeLabel: 'M', stockQuantity: 35, sku_code: 'FH-HOOD-007-M', isAvailable: true },
      { productSizeId: 703, productId: 7, sizeLabel: 'L', stockQuantity: 25, sku_code: 'FH-HOOD-007-L', isAvailable: true },
    ]
  },
  {
    productId: 8,
    categoryId: 2,
    categoryName: 'Outerwear & Blazers',
    productName: 'Vintage Suede Aviator Bomber Jacket',
    description: 'Heavyweight brown suede aviator jacket lined with plush shearling collar and zip brass hardware.',
    price: 9499,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-27T10:00:00Z',
    rating: 4.9,
    reviewCount: 41,
    sizes: [
      { productSizeId: 801, productId: 8, sizeLabel: 'S', stockQuantity: 8, sku_code: 'FH-AVT-008-S', isAvailable: true },
      { productSizeId: 802, productId: 8, sizeLabel: 'M', stockQuantity: 15, sku_code: 'FH-AVT-008-M', isAvailable: true },
      { productSizeId: 803, productId: 8, sizeLabel: 'L', stockQuantity: 12, sku_code: 'FH-AVT-008-L', isAvailable: true },
    ]
  },

  // --- Category 3: Denim & Trousers ---
  {
    productId: 9,
    categoryId: 3,
    categoryName: 'Denim & Trousers',
    productName: 'Slim-Fit Japanese Selvedge Denim',
    description: 'Authentic 13.5oz indigo selvedge denim woven on vintage shuttle looms with raw brass hardware.',
    price: 4499,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-22T10:00:00Z',
    rating: 4.7,
    reviewCount: 68,
    sizes: [
      { productSizeId: 901, productId: 9, sizeLabel: '30', stockQuantity: 15, sku_code: 'FH-JEAN-009-30', isAvailable: true },
      { productSizeId: 902, productId: 9, sizeLabel: '32', stockQuantity: 25, sku_code: 'FH-JEAN-009-32', isAvailable: true },
      { productSizeId: 903, productId: 9, sizeLabel: '34', stockQuantity: 20, sku_code: 'FH-JEAN-009-34', isAvailable: true },
    ]
  },
  {
    productId: 10,
    categoryId: 3,
    categoryName: 'Denim & Trousers',
    productName: 'Tailored Slim-Fit Stretch Chino Trousers',
    description: 'Stretch cotton twill chinos with clean front pleats, horn buttons, and secure back welt pockets.',
    price: 2799,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-21T10:00:00Z',
    rating: 4.7,
    reviewCount: 64,
    sizes: [
      { productSizeId: 1001, productId: 10, sizeLabel: '30', stockQuantity: 12, sku_code: 'FH-CHN-010-30', isAvailable: true },
      { productSizeId: 1002, productId: 10, sizeLabel: '32', stockQuantity: 20, sku_code: 'FH-CHN-010-32', isAvailable: true },
      { productSizeId: 1003, productId: 10, sizeLabel: '34', stockQuantity: 18, sku_code: 'FH-CHN-010-34', isAvailable: true },
    ]
  },
  {
    productId: 11,
    categoryId: 3,
    categoryName: 'Denim & Trousers',
    productName: 'Vintage Washed Black Straight Jeans',
    description: 'Distressed black wash heavy denim trousers with antique brass rivets and relaxed taper fit.',
    price: 3999,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-30T10:00:00Z',
    rating: 4.8,
    reviewCount: 51,
    sizes: [
      { productSizeId: 1101, productId: 11, sizeLabel: '30', stockQuantity: 10, sku_code: 'FH-BJEAN-011-30', isAvailable: true },
      { productSizeId: 1102, productId: 11, sizeLabel: '32', stockQuantity: 18, sku_code: 'FH-BJEAN-011-32', isAvailable: true },
      { productSizeId: 1103, productId: 11, sizeLabel: '34', stockQuantity: 15, sku_code: 'FH-BJEAN-011-34', isAvailable: true },
    ]
  },
  {
    productId: 12,
    categoryId: 3,
    categoryName: 'Denim & Trousers',
    productName: 'Pleated Flannel Wool Formal Trousers',
    description: 'Italian wool flannel trousers featuring side waist adjusters and clean cuffed hem.',
    price: 4999,
    discountPercent: 10,
    imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-09-02T10:00:00Z',
    rating: 4.9,
    reviewCount: 29,
    sizes: [
      { productSizeId: 1201, productId: 12, sizeLabel: '30', stockQuantity: 8, sku_code: 'FH-TRSR-012-30', isAvailable: true },
      { productSizeId: 1202, productId: 12, sizeLabel: '32', stockQuantity: 15, sku_code: 'FH-TRSR-012-32', isAvailable: true },
      { productSizeId: 1203, productId: 12, sizeLabel: '34', stockQuantity: 12, sku_code: 'FH-TRSR-012-34', isAvailable: true },
    ]
  },

  // --- Category 4: Footwear & Boots ---
  {
    productId: 13,
    categoryId: 4,
    categoryName: 'Footwear & Boots',
    productName: 'Heritage Calfskin Leather Oxfords',
    description: 'Hand-burnished Italian calfskin leather oxfords with Goodyear welted leather soles.',
    price: 5499,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-16T10:00:00Z',
    rating: 4.9,
    reviewCount: 88,
    sizes: [
      { productSizeId: 1301, productId: 13, sizeLabel: 'UK 7', stockQuantity: 10, sku_code: 'FH-OXF-013-7', isAvailable: true },
      { productSizeId: 1302, productId: 13, sizeLabel: 'UK 8', stockQuantity: 15, sku_code: 'FH-OXF-013-8', isAvailable: true },
      { productSizeId: 1303, productId: 13, sizeLabel: 'UK 9', stockQuantity: 18, sku_code: 'FH-OXF-013-9', isAvailable: true },
    ]
  },
  {
    productId: 14,
    categoryId: 4,
    categoryName: 'Footwear & Boots',
    productName: 'Velvety Suede Chelsea Boots',
    description: 'Italian suede Chelsea boots featuring flexible elastic side goring and durable crepe rubber sole.',
    price: 4999,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-19T10:00:00Z',
    rating: 4.8,
    reviewCount: 72,
    sizes: [
      { productSizeId: 1401, productId: 14, sizeLabel: 'UK 7', stockQuantity: 12, sku_code: 'FH-BOOT-014-7', isAvailable: true },
      { productSizeId: 1402, productId: 14, sizeLabel: 'UK 8', stockQuantity: 20, sku_code: 'FH-BOOT-014-8', isAvailable: true },
      { productSizeId: 1403, productId: 14, sizeLabel: 'UK 9', stockQuantity: 16, sku_code: 'FH-BOOT-014-9', isAvailable: true },
    ]
  },
  {
    productId: 15,
    categoryId: 4,
    categoryName: 'Footwear & Boots',
    productName: 'Street Classic White Leather Sneakers',
    description: 'Minimalist low-top leather sneakers with cushioned insoles and durable rubber soles.',
    price: 3999,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-23T10:00:00Z',
    rating: 4.8,
    reviewCount: 130,
    sizes: [
      { productSizeId: 1501, productId: 15, sizeLabel: 'UK 7', stockQuantity: 15, sku_code: 'FH-SNK-015-7', isAvailable: true },
      { productSizeId: 1502, productId: 15, sizeLabel: 'UK 8', stockQuantity: 22, sku_code: 'FH-SNK-015-8', isAvailable: true },
      { productSizeId: 1503, productId: 15, sizeLabel: 'UK 9', stockQuantity: 25, sku_code: 'FH-SNK-015-9', isAvailable: true },
    ]
  },
  {
    productId: 16,
    categoryId: 4,
    categoryName: 'Footwear & Boots',
    productName: 'Handcrafted Monk Strap Leather Shoes',
    description: 'Double monk strap shoes cut from polished calfskin with silver buckle accents.',
    price: 5999,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    gender: 'Men',
    isActive: true,
    createdAt: '2026-08-29T10:00:00Z',
    rating: 4.9,
    reviewCount: 37,
    sizes: [
      { productSizeId: 1601, productId: 16, sizeLabel: 'UK 7', stockQuantity: 10, sku_code: 'FH-MNK-016-7', isAvailable: true },
      { productSizeId: 1602, productId: 16, sizeLabel: 'UK 8', stockQuantity: 18, sku_code: 'FH-MNK-016-8', isAvailable: true },
      { productSizeId: 1603, productId: 16, sizeLabel: 'UK 9', stockQuantity: 14, sku_code: 'FH-MNK-016-9', isAvailable: true },
    ]
  }
];

export const DEMO_USER: User = {
  userId: 1,
  fullName: 'SEGU NAGENDRA',
  email: 'nagendrasegu2901@gmail.com',
  phone: '+91 9876543210',
  gender: 'Male',
  address: '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038',
  createdAt: '2026-08-01T12:00:00Z'
};

export const DEMO_ORDERS: Order[] = [
  {
    orderId: 1001,
    userId: 1,
    orderDate: '2026-09-17T14:30:00Z',
    totalAmount: 7199,
    paymentMethod: 'UPI',
    orderStatus: 'DELIVERED',
    deliveryAddress: '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038',
    items: [
      {
        orderItemId: 1,
        orderId: 1001,
        productId: 9,
        productName: 'Slim-Fit Japanese Selvedge Denim',
        quantity: 1,
        unitPrice: 3824.15,
        subtotal: 3824.15,
        sizeLabel: '32',
        imageUrl: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
      },
      {
        orderItemId: 2,
        orderId: 1001,
        productId: 7,
        productName: 'Urban Minimalist Heavyweight Hoodie',
        quantity: 1,
        unitPrice: 2474.25,
        subtotal: 2474.25,
        sizeLabel: 'M',
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    orderId: 1002,
    userId: 1,
    orderDate: '2026-09-19T18:15:00Z',
    totalAmount: 11498,
    paymentMethod: 'Credit/Debit Card',
    orderStatus: 'SHIPPED',
    deliveryAddress: '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038',
    items: [
      {
        orderItemId: 3,
        orderId: 1002,
        productId: 5,
        productName: 'Premium Obsidian Leather Biker Jacket',
        quantity: 1,
        unitPrice: 7199.20,
        subtotal: 7199.20,
        sizeLabel: 'L',
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
      },
      {
        orderItemId: 4,
        orderId: 1002,
        productId: 13,
        productName: 'Heritage Calfskin Leather Oxfords',
        quantity: 1,
        unitPrice: 4674.15,
        subtotal: 4674.15,
        sizeLabel: 'UK 9',
        imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
