// Database Types
export type UserRole = 'admin' | 'seller';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  sku: string;
  inventory: number;
  category: string;
  image: string;
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  shipping_status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product?: Product;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  method: 'upi' | 'card' | 'wallet';
  status: 'pending' | 'completed' | 'failed';
  transaction_id: string;
  created_at: string;
}

export interface Shipment {
  id: string;
  order_id: string;
  partner: string;
  tracking_id: string;
  status: 'pending' | 'shipped' | 'delivered' | 'failed';
  estimated_delivery: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  key: string;
  secret: string;
  usage_count: number;
  last_used: string | null;
  created_at: string;
  updated_at: string;
}

// Auth Types
export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DecodedToken {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
