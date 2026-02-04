
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // PADARIA
  { id: 1, name: 'Pão Italiano Artesanal', price: 18.90, category: 'padaria', unit: 'un', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Croissant Amanteigado', price: 12.50, category: 'padaria', unit: 'un', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' },
  { id: 11, name: 'Pão de Queijo Mineiro', price: 24.00, category: 'padaria', unit: 'duzia', image: 'https://images.unsplash.com/photo-1598143152818-485fcff48701?q=80&w=800&auto=format&fit=crop' },
  { id: 12, name: 'Baguete de Tradição', price: 9.90, category: 'padaria', unit: 'un', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },

  // HORTIFRUTI
  { id: 3, name: 'Tomate Cereja Orgânico', price: 8.50, category: 'hortifruti', unit: 'bandeja', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Manjericão Fresco', price: 4.90, category: 'hortifruti', unit: 'maço', image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?q=80&w=800&auto=format&fit=crop' },
  { id: 9, name: 'Limão Siciliano', price: 3.50, category: 'hortifruti', unit: 'un', image: 'https://images.unsplash.com/photo-1590505682634-ad95082f8040?q=80&w=800&auto=format&fit=crop' },
  { id: 13, name: 'Abacate Hass Premium', price: 7.20, category: 'hortifruti', unit: 'un', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop' },

  // ADEGA
  { id: 4, name: 'Vinho Malbec Reserva', price: 89.00, category: 'bebidas', unit: 'garrafa', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop' },
  { id: 15, name: 'Espumante Brut Rosé', price: 120.00, category: 'bebidas', unit: 'garrafa', image: 'https://images.unsplash.com/photo-1594460750222-29366360b134?q=80&w=800&auto=format&fit=crop' },
  { id: 16, name: 'Cerveja Artesanal IPA', price: 22.00, category: 'bebidas', unit: 'un', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=800&auto=format&fit=crop' },

  // MERCEARIA
  { id: 5, name: 'Mel de Flores Silvestres', price: 32.00, category: 'mercearia', unit: 'pote', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: 'Azeite Extra Virgem', price: 54.90, category: 'mercearia', unit: 'un', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop' },
  { id: 17, name: 'Pasta Italiana Penne', price: 21.00, category: 'mercearia', unit: '500g', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop' },

  // LIMPEZA
  { id: 10, name: 'Sabão de Lavanda', price: 15.00, category: 'limpeza', unit: 'un', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800&auto=format&fit=crop' },
  { id: 20, name: 'Vela Aromática', price: 45.00, category: 'limpeza', unit: 'un', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop' },
];

export const CATEGORIES = [
  { id: 'todos', label: 'Tudo', icon: 'fa-border-all' },
  { id: 'padaria', label: 'Padaria', icon: 'fa-wheat-awn' },
  { id: 'hortifruti', label: 'Horta', icon: 'fa-leaf' },
  { id: 'mercearia', label: 'Despensa', icon: 'fa-utensils' },
  { id: 'bebidas', label: 'Adega', icon: 'fa-wine-bottle' },
  { id: 'limpeza', label: 'Cuidado', icon: 'fa-hand-sparkles' },
];
