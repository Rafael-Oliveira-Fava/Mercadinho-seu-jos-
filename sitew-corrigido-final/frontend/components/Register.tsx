
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RegisterData } from '../types';
import { authService, validateCPF, validateEmail, validatePhone } from '../services/database/authService';

interface RegisterProps {
  onRegister: (user: any) => void;
  onBackToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      if (cleaned.length <= 10) {
        return cleaned
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      }
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const validateField = (name: string, value: string) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'name':
        if (value.length > 0 && value.length < 3) {
          errors.name = 'Nome muito curto';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        if (value.length > 0 && !validateEmail(value)) {
          errors.email = 'Email inválido';
        } else {
          delete errors.email;
        }
        break;
      case 'cpf':
        const cleanCPF = value.replace(/\D/g, '');
        if (cleanCPF.length === 11 && !validateCPF(cleanCPF)) {
          errors.cpf = 'CPF inválido';
        } else {
          delete errors.cpf;
        }
        break;
      case 'phone':
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length >= 10 && !validatePhone(cleanPhone)) {
          errors.phone = 'Telefone inválido';
        } else {
          delete errors.phone;
        }
        break;
      case 'password':
        if (value.length > 0 && value.length < 6) {
          errors.password = 'Mínimo 6 caracteres';
        } else {
          delete errors.password;
        }
        break;
      case 'confirmPassword':
        if (value.length > 0 && value !== formData.password) {
          errors.confirmPassword = 'Senhas não coincidem';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }
    
    setFieldErrors(errors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    validateField(name, formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await authService.register(formData);
      authService.saveCurrentUser(user);
      onRegister(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.length >= 3 &&
      validateEmail(formData.email) &&
      validateCPF(formData.cpf.replace(/\D/g, '')) &&
      validatePhone(formData.phone.replace(/\D/g, '')) &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword &&
      Object.keys(fieldErrors).length === 0
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center"
    >
      <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-jose-dark/5 max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif text-jose-dark mb-3">Criar Conta</h2>
          <p className="text-gray-400 text-sm">Faça parte do Mercadinho do Seu José</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.name ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.email ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              maxLength={14}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.cpf ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.cpf && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.cpf}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={15}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.phone ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.phone && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.password ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                fieldErrors.confirmPassword ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
              }`}
              required
            />
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-2 ml-4">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="w-full bg-jose-dark text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-jose-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full text-jose-accent text-xs font-bold uppercase tracking-widest hover:underline mt-4"
          >
            Já tem conta? Entrar
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
