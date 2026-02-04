
import { getSupabaseClient } from '../../lib/supabase.ts';

export const statsService = {
  async getDashboardStats() {
    const supabase = getSupabaseClient();
    if (!supabase) return { totalRevenue: 0, orderCount: 0, avgTicket: 0 };
    
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total');
      
      if (error || !orders) return { totalRevenue: 0, orderCount: 0, avgTicket: 0 };

      const totalRevenue = orders.reduce((acc: number, curr: any) => acc + Number(curr.total), 0);
      const orderCount = orders.length;
      const avgTicket = orderCount > 0 ? totalRevenue / orderCount : 0;

      return { totalRevenue, orderCount, avgTicket };
    } catch (e) {
      return { totalRevenue: 0, orderCount: 0, avgTicket: 0 };
    }
  }
};
