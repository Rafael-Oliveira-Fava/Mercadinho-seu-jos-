
import { getSupabaseClient, isSupabaseConfigured } from '../../lib/supabase.ts';
import { Product } from '../../types.ts';
import { PRODUCTS } from '../../constants.tsx';

export const productService = {
  async getAll() {
    const supabase = getSupabaseClient();
    if (!supabase) return PRODUCTS;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return (data && data.length > 0) ? (data as Product[]) : PRODUCTS;
    } catch (error) {
      console.warn("Retornando produtos locais por falha no banco:", error);
      return PRODUCTS;
    }
  },

  async seedDatabase() {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Banco de dados não configurado");

    // Primeiro limpa para evitar duplicados se necessário, ou só insere
    const productsToInsert = PRODUCTS.map(({ id, ...p }) => p);
    
    const { error } = await supabase.from('products').insert(productsToInsert);
    
    if (error) throw error;
    return { message: "Produtos sincronizados com sucesso!" };
  }
};
