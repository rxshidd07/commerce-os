import { User, Product, Order, OrderItem, Payment, Shipment, ApiKey } from './types';
import { hashPassword } from './auth';

// In-memory store for demo (replace with real database)
const USERS_DB: Map<string, User> = new Map();
const PRODUCTS_DB: Map<string, Product> = new Map();
const ORDERS_DB: Map<string, Order> = new Map();
const ORDER_ITEMS_DB: Map<string, OrderItem> = new Map();
const PAYMENTS_DB: Map<string, Payment> = new Map();
const SHIPMENTS_DB: Map<string, Shipment> = new Map();
const API_KEYS_DB: Map<string, ApiKey> = new Map();

// Seed initial data
function initializeSeedData() {
  if (USERS_DB.size === 0) {
    const demoUser: User = {
      id: 'user_demo_001',
      email: 'demo@commerce.os',
      name: 'Demo Seller',
      role: 'seller',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    USERS_DB.set(demoUser.id, demoUser);

    // Sample products
    const sampleProducts = [
      {
        id: 'prod_001',
        user_id: 'user_demo_001',
        title: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 129.99,
        sku: 'WH-1000',
        inventory: 45,
        category: 'Electronics',
        image: '/api/placeholder/400/300?text=Headphones',
        status: 'active' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'prod_002',
        user_id: 'user_demo_001',
        title: 'Organic Coffee Beans',
        description: 'Single-origin premium coffee beans from Ethiopia',
        price: 24.99,
        sku: 'COFFEE-001',
        inventory: 120,
        category: 'Beverages',
        image: '/api/placeholder/400/300?text=Coffee',
        status: 'active' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'prod_003',
        user_id: 'user_demo_001',
        title: 'Ergonomic Desk Chair',
        description: 'Comfortable office chair with lumbar support',
        price: 299.99,
        sku: 'CHAIR-ERG-001',
        inventory: 12,
        category: 'Furniture',
        image: '/api/placeholder/400/300?text=Chair',
        status: 'active' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    sampleProducts.forEach(p => PRODUCTS_DB.set(p.id, p));
  }
}

// User operations
export async function getUserByEmail(email: string): Promise<User | null> {
  for (const user of USERS_DB.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

export async function getUserById(id: string): Promise<User | null> {
  return USERS_DB.get(id) || null;
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const id = `user_${Date.now()}`;
  const user: User = {
    id,
    email,
    name,
    role: 'seller',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  USERS_DB.set(id, user);
  return user;
}

// Product operations
export async function getProducts(userId: string, limit = 50, offset = 0): Promise<Product[]> {
  const products = Array.from(PRODUCTS_DB.values()).filter(p => p.user_id === userId);
  return products.slice(offset, offset + limit);
}

export async function getProductById(id: string): Promise<Product | null> {
  return PRODUCTS_DB.get(id) || null;
}

export async function createProduct(userId: string, data: Omit<Product, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const id = `prod_${Date.now()}`;
  const product: Product = {
    ...data,
    id,
    user_id: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  PRODUCTS_DB.set(id, product);
  return product;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const product = PRODUCTS_DB.get(id);
  if (!product) return null;

  const updated = {
    ...product,
    ...data,
    id: product.id,
    user_id: product.user_id,
    created_at: product.created_at,
    updated_at: new Date().toISOString(),
  };
  PRODUCTS_DB.set(id, updated);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  return PRODUCTS_DB.delete(id);
}

// Order operations
export async function getOrders(userId: string, limit = 50, offset = 0): Promise<Order[]> {
  const orders = Array.from(ORDERS_DB.values()).filter(o => o.user_id === userId);
  return orders.slice(offset, offset + limit);
}

export async function getOrderById(id: string): Promise<Order | null> {
  return ORDERS_DB.get(id) || null;
}

export async function createOrder(userId: string, data: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Order> {
  const id = `ord_${Date.now()}`;
  const order: Order = {
    ...data,
    id,
    user_id: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  ORDERS_DB.set(id, order);
  return order;
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<Order | null> {
  const order = ORDERS_DB.get(id);
  if (!order) return null;

  const updated = {
    ...order,
    ...data,
    id: order.id,
    user_id: order.user_id,
    created_at: order.created_at,
    updated_at: new Date().toISOString(),
  };
  ORDERS_DB.set(id, updated);
  return updated;
}

// API Key operations
export async function getApiKeysByUserId(userId: string): Promise<ApiKey[]> {
  return Array.from(API_KEYS_DB.values()).filter(k => k.user_id === userId);
}

export async function createApiKey(userId: string): Promise<ApiKey> {
  const id = `key_${Date.now()}`;
  const key = `sk_live_${Buffer.from(Math.random().toString()).toString('base64').slice(0, 20)}`;
  const secret = `secret_${Buffer.from(Math.random().toString()).toString('base64').slice(0, 30)}`;

  const apiKey: ApiKey = {
    id,
    user_id: userId,
    key,
    secret,
    usage_count: 0,
    last_used: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  API_KEYS_DB.set(id, apiKey);
  return apiKey;
}

export function initDb() {
  initializeSeedData();
}
