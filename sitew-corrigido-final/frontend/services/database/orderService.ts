
import { getSupabaseClient } from '../../lib/supabase.ts';
import { CartItem, Address, Order } from '../../types.ts';

export const orderService = {
  async createOrder(userId: string | null, items: CartItem[], total: number, address: Address, paymentMethod?: 'pix' | 'card') {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Banco de dados não configurado");

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ 
        user_id: userId, 
        total, 
        address, 
        payment_method: paymentMethod,
        status: 'pending' 
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_time: item.price,
      product_name: item.name
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  },

  async getAll(): Promise<Order[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price_at_time,
            product_name,
            product_id
          ),
          users (
            id,
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  },

  async getByUserId(userId: string): Promise<Order[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price_at_time,
            product_name,
            product_id
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      return [];
    }
  },

  async updateStatus(orderId: string | number, status: 'pending' | 'preparing' | 'delivered' | 'cancelled') {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Banco de dados não configurado");

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  }
};
