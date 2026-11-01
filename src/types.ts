export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  createdAt?: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  isActive: boolean;
  imageUrl?: string;
}

export interface ProductSize {
  productSizeId: number;
  productId: number;
  sizeLabel: string;
  stockQuantity: number;
  skuCode?: string;
  sku_code?: string;
  isAvailable: boolean;
}

export interface Product {
  productId: number;
  categoryId: number;
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  discountPercent: number;
  imageUrl: string;
  gender: 'Men' | 'Women' | 'Unisex';
  isActive: boolean;
  createdAt: string;
  sizes: ProductSize[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  cartItemId: number;
  productId: number;
  product: Product;
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  sizeLabel: string;
  imageUrl?: string;
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'OUT FOR DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: OrderStatus;
  deliveryAddress: string;
  items: OrderItem[];
}
