import { create } from 'zustand';
import { Product } from '@/lib/types';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  createProduct: (data: Omit<Product, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Product>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      set({ products: data.products || [], loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching products', loading: false });
    }
  },

  createProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create product');
      const product = await response.json();
      set((state) => ({
        products: [...state.products, product],
        loading: false,
      }));
      return product;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error creating product', loading: false });
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update product');
      const updated = await response.json();
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error updating product', loading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error deleting product', loading: false });
      throw error;
    }
  },
}));
