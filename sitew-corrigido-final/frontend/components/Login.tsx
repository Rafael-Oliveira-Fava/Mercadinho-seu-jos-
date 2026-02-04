import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginCredentials } from '../types';
import { authService } from '../services/database/authService';

interface LoginProps {
  onLogin: (user: any) => void;
  onRegisterClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Verifica se é o Seu José (admin)
      if (credentials.email === 'jose@mercadinho.com' && credentials.password === '123456') {
        const joseUser = {
          id: 'jose-admin',
          email: 'jose@mercadinho.com',
          name: 'Seu José',
          role: 'owner' as const,
          cpf: '000.000.000-00',
          phone: '(11) 99999-9999',
          created_at: new Date().toISOString()
        };
        authService.saveCurrentUser(joseUser);
        onLogin(joseUser);
        return;
      }

      // Login normal
      const { user } = await authService.login(credentials);
      authService.saveCurrentUser(user);
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await authService.loginWithGoogle();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center"
    >
      <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-jose-dark/5 max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-jose-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <i className="fas fa-user text-3xl text-white"></i>
          </div>
          <h2 className="text-4xl font-serif text-jose-dark mb-3">Bem-vindo</h2>
          <p className="text-gray-400 text-sm">Entre na sua conta do Seu José</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-jose-dark text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-jose-primary transition-all disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-400 font-bold uppercase tracking-widest">ou continue com</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-6 rounded-3xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </button>

          <button
            type="button"
            onClick={onRegisterClick}
            className="w-full text-jose-accent text-xs font-bold uppercase tracking-widest hover:underline mt-6"
          >
            Não tem conta? Criar uma
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
