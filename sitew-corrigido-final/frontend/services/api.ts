
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase.ts';
import { PRODUCTS } from '../constants.tsx';
import { statsService } from './database/statsService.ts';
import { orderService } from './database/orderService.ts';

const getLocalOrders = (): any[] => {
  try {
    const saved = localStorage.getItem('jose_local_orders');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalOrder = (order: any) => {
  const orders = getLocalOrders();
  orders.push(order);
  localStorage.setItem('jose_local_orders', JSON.stringify(orders));
};

export const api = {
  products: {
    async getAll() {
      const supabase = getSupabaseClient();
      if (!supabase) return PRODUCTS;
      
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error || !data || data.length === 0) return PRODUCTS;
        return data;
      } catch (e) {
        return PRODUCTS;
      }
    }
  },
  orders: {
    async create(orderData: any) {
      const supabase = getSupabaseClient();
      if (!supabase) {
        const mockOrder = { 
          ...orderData, 
          id: `local-${Date.now()}`, 
          created_at: new Date().toISOString(),
          status: 'pending'
        };
        saveLocalOrder(mockOrder);
        return mockOrder;
      }
      try {
        return await orderService.createOrder(
          orderData.user_id, 
          orderData.items || [], 
          orderData.total, 
          orderData.address,
          orderData.payment_method
        );
      } catch (e) {
        const mockOrder = { 
          ...orderData, 
          id: `local-err-${Date.now()}`, 
          created_at: new Date().toISOString() 
        };
        saveLocalOrder(mockOrder);
        return mockOrder;
      }
    },
    async getAll() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        return getLocalOrders();
      }
      try {
        return await orderService.getAll();
      } catch (e) {
        return getLocalOrders();
      }
    },
    async getByUserId(userId: string) {
      const supabase = getSupabaseClient();
      if (!supabase) {
        const localOrders = getLocalOrders();
        return localOrders.filter((o: any) => o.user_id === userId);
      }
      try {
        return await orderService.getByUserId(userId);
      } catch (e) {
        return [];
      }
    },
    async updateStatus(orderId: string | number, status: 'pending' | 'preparing' | 'delivered' | 'cancelled') {
      const supabase = getSupabaseClient();
      if (!supabase) {
        const orders = getLocalOrders();
        const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
        localStorage.setItem('jose_local_orders', JSON.stringify(updated));
        return;
      }
      return await orderService.updateStatus(orderId, status);
    }
  },
  stats: {
    async getDashboard() {
      const isConfigured = isSupabaseConfigured();
      if (!isConfigured) {
        const localOrders = getLocalOrders();
        const revenue = localOrders.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
        if (revenue === 0) return { totalRevenue: 12540.50, orderCount: 42, avgTicket: 298.58 };
        return { totalRevenue: revenue, orderCount: localOrders.length, avgTicket: revenue / localOrders.length };
      }
      return await statsService.getDashboardStats();
    }
  }
};
