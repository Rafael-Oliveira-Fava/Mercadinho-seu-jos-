
import { getSupabaseClient } from '../../lib/supabase';
import { User, LoginCredentials, RegisterData } from '../../types';

// Validação de CPF
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;
  
  return true;
};

// Validação de Email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de Telefone
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

export const authService = {
  async loginWithGoogle(): Promise<{ user?: User; error?: string; needsRedirect?: boolean }> {
    try {
      const supabase = getSupabaseClient();
      
      if (!supabase) {
        throw new Error('Google Login requer configuração do Supabase');
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      
      return { needsRedirect: true };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login com Google');
    }
  },

  async handleOAuthCallback(): Promise<User | null> {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return null;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      // Buscar ou criar usuário na tabela users
      let { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError || !userData) {
        // Criar usuário se não existir
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email!,
            role: 'customer'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        userData = newUser;
      }

      return userData;
    } catch (error) {
      console.error('Erro no callback OAuth:', error);
      return null;
    }
  },

  async register(data: RegisterData): Promise<{ user: User; error?: string }> {
    try {
      // Validações
      if (!data.name || data.name.length < 3) {
        throw new Error('Nome deve ter pelo menos 3 caracteres');
      }
      
      if (!validateEmail(data.email)) {
        throw new Error('Email inválido');
      }
      
      if (!validateCPF(data.cpf)) {
        throw new Error('CPF inválido');
      }
      
      if (!validatePhone(data.phone)) {
        throw new Error('Telefone inválido');
      }
      
      if (data.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }
      
      if (data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const supabase = getSupabaseClient();
      
      if (!supabase) {
        // Modo fallback - salva no localStorage
        const users = JSON.parse(localStorage.getItem('jose_users') || '[]');
        
        if (users.some((u: any) => u.email === data.email)) {
          throw new Error('Email já cadastrado');
        }
        
        if (users.some((u: any) => u.cpf === data.cpf)) {
          throw new Error('CPF já cadastrado');
        }
        
        const newUser: User = {
          id: `local-${Date.now()}`,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
          role: 'customer',
          created_at: new Date().toISOString()
        };
        
        users.push({ ...newUser, password: data.password });
        localStorage.setItem('jose_users', JSON.stringify(users));
        
        return { user: newUser };
      }

      // Primeiro cria o usuário de autenticação
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            cpf: data.cpf,
            phone: data.phone
          }
        }
      });

      if (authError) throw authError;

      // Depois insere na tabela de usuários
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{
          id: authData.user!.id,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
          role: 'customer'
        }])
        .select()
        .single();

      if (userError) throw userError;

      return { user: userData };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta');
    }
  },

  async login(credentials: LoginCredentials): Promise<{ user: User; error?: string }> {
    try {
      if (!validateEmail(credentials.email)) {
        throw new Error('Email inválido');
      }

      const supabase = getSupabaseClient();
      
      if (!supabase) {
        // Modo fallback - cria usuário demo se não existir
        const users = JSON.parse(localStorage.getItem('jose_users') || '[]');
        
        // Criar usuário demo Seu José se não existir
        if (credentials.email === 'jose@mercadinho.com' && !users.some((u: any) => u.email === 'jose@mercadinho.com')) {
          const demoUser = {
            id: 'demo-jose',
            name: 'Seu José',
            email: 'jose@mercadinho.com',
            cpf: '000.000.000-00',
            phone: '(11) 99999-9999',
            role: 'owner',
            password: '123456',
            created_at: new Date().toISOString()
          };
          users.push(demoUser);
          localStorage.setItem('jose_users', JSON.stringify(users));
        }
        
        const user = users.find((u: any) => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (!user) {
          throw new Error('Email ou senha incorretos');
        }
        
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (authError) throw new Error('Email ou senha incorretos');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) throw userError;

      return { user: userData };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  },

  async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('jose_current_user');
  },

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('jose_current_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  saveCurrentUser(user: User): void {
    localStorage.setItem('jose_current_user', JSON.stringify(user));
  }
};
