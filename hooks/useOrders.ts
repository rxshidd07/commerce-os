import { create } from 'zustand';
import { Order } from '@/lib/types';

interface OrderStore {
  orders: Order[];
  loading: boolean;
  error: string | null;

  fetchOrders: () => Promise<void>;
  createOrder: (data: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Order>;
  updateOrder: (id: string, data: Partial<Order>) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      set({ orders: data.orders || [], loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error fetching orders', loading: false });
    }
  },

  createOrder: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create order');
      const order = await response.json();
      set((state) => ({
        orders: [...state.orders, order],
        loading: false,
      }));
      return order;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error creating order', loading: false });
      throw error;
    }
  },

  updateOrder: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update order');
      const updated = await response.json();
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updated : o)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error updating order', loading: false });
      throw error;
    }
  },
}));
