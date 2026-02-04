
export interface Product {
  id: string | number;
  name: string;
  price: number;
  category: 'padaria' | 'hortifruti' | 'mercearia' | 'bebidas' | 'limpeza';
  image: string;
  unit: string;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppSection {
  Home = 'home',
  Products = 'products',
  SmartChef = 'smart-chef',
  Location = 'location',
  Login = 'login',
  Register = 'register',
  Dashboard = 'dashboard'
}

export type UserRole = 'customer' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  role: UserRole;
  created_at?: string;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string | number;
  user_id: string;
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  created_at: string;
  address: Address;
  payment_method?: 'pix' | 'card';
  order_items?: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: number;
  order_id: string | number;
  product_id: string | number;
  quantity: number;
  price_at_time: number;
  product_name?: string;
  products?: Product;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
