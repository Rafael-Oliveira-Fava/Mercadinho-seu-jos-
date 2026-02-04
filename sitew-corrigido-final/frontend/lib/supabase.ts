
import { createClient } from '@supabase/supabase-js';

// LINKS FORNECIDOS PELO USUÁRIO (HARDCODED PARA FUNCIONAMENTO IMEDIATO)
const DEFAULT_URL = 'https://qwihgzseqsndnnpbyjbw.supabase.co';
const DEFAULT_KEY = 'sb_publishable_5iBTeZfpxDLpY64ih1XHag_Py6fFpBL';

export const getSupabaseConfig = () => {
  const url = localStorage.getItem('JOSE_SUPABASE_URL') || DEFAULT_URL;
  const key = localStorage.getItem('JOSE_SUPABASE_KEY') || DEFAULT_KEY;
  return { url, key };
};

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig();
  return !!(url && key && url.startsWith('https://') && key.length > 20);
};

let supabaseInstance: any = null;

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;
  
  const { url, key } = getSupabaseConfig();
  
  if (!isSupabaseConfigured()) return null;

  try {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    return supabaseInstance;
  } catch (e) {
    console.error("Erro crítico na conexão Supabase:", e);
    return null;
  }
};

export const updateSupabaseConfig = (url: string, key: string) => {
  try {
    localStorage.setItem('JOSE_SUPABASE_URL', url.trim());
    localStorage.setItem('JOSE_SUPABASE_KEY', key.trim());
    supabaseInstance = null;
    window.location.reload();
  } catch (e) {
    alert("Erro ao salvar localmente.");
  }
};
