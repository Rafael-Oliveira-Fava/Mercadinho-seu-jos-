
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSection, Product, CartItem, User, Address } from './types.ts';
import { CATEGORIES, PRODUCTS } from './constants.tsx';
import Header from './components/Header.tsx';
import ProductCard from './components/ProductCard.tsx';
import SmartChef from './components/SmartChef.tsx';
import Footer from './components/Footer.tsx';
import Cart from './components/Cart.tsx';
import Location from './components/Location.tsx';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { api } from './services/api.ts';
import { authService } from './services/database/authService';

const App = () => {
  const [activeSection, setSection] = useState<AppSection>(AppSection.Home);
  const [adminView, setAdminView] = useState<'sales' | 'inventory' | 'stats' | 'config'>('stats');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [stats, setStats] = useState({ totalRevenue: 0, orderCount: 0, avgTicket: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const loadData = async () => {
    try {
      const prods = await api.products.getAll();
      if (prods) setProducts(prods);
      const st = await api.stats.getDashboard();
      if (st) setStats(st);
    } catch (e) {
      console.warn("Usando fallback de dados estáticos");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar OAuth callback
      const oauthUser = await authService.handleOAuthCallback();
      if (oauthUser) {
        setUser(oauthUser);
        authService.saveCurrentUser(oauthUser);
        if (oauthUser.role === 'owner') {
          setSection(AppSection.Dashboard);
        } else {
          setSection(AppSection.Home);
        }
        return;
      }

      // Verificar usuário salvo
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };

    checkAuth();
    loadData();
  }, []);

  const handleCheckout = async (address: Address, paymentMethod?: 'pix' | 'card') => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    try {
      await api.orders.create({
        total,
        address,
        status: 'pending',
        user_id: user?.id || 'guest',
        items: cart,
        payment_method: paymentMethod
      });
      
      setIsCartOpen(false);
      setIsSuccessOpen(true);
      setCart([]);
      loadData();
    } catch (err) {
      alert("Houve um problema ao processar seu pedido, mas Seu José foi avisado!");
    }
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    if (loggedUser.role === 'owner') {
      setSection(AppSection.Dashboard);
    } else {
      setSection(AppSection.Home);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setSection(AppSection.Home);
  };

  return (
    <div className="min-h-screen flex flex-col bg-jose-light">
      {/* Se usuário é admin (Seu José), mostra apenas painel admin */}
      {user?.role === 'owner' ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <>
          <Header 
            activeSection={activeSection} 
            setSection={setSection} 
            cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
            toggleCart={() => setIsCartOpen(true)}
            toggleMenu={() => {}}
            user={user}
            onLogout={handleLogout}
          />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={(id, d) => setCart(c => c.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
        onRemove={(id) => setCart(c => c.filter(i => i.id !== id))} 
        onCheckout={handleCheckout}
      />

      <AnimatePresence>
        {isSuccessOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-jose-dark/90 backdrop-blur-md"
          >
            <div className="bg-white p-12 rounded-[3rem] text-center max-w-sm shadow-2xl">
              <div className="w-16 h-16 bg-jose-primary text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-xl">
                <i className="fas fa-check"></i>
              </div>
              <h2 className="text-2xl font-serif text-jose-dark mb-2">Pedido Confirmado!</h2>
              <p className="text-gray-500 mb-8 text-sm">Seu José já separou a sacola e o entregador está a caminho.</p>
              <button 
                onClick={() => setIsSuccessOpen(false)} 
                className="w-full bg-jose-dark text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest"
              >
                Ótimo!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === AppSection.Home && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <section className="relative min-h-[90vh] flex items-center bg-jose-dark overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                  <h1 className="text-6xl md:text-[8rem] font-serif text-white mb-8 leading-none">
                    Perto de <br/>
                    <span className="text-jose-accent italic">Você.</span>
                  </h1>
                  <button 
                    onClick={() => setSection(AppSection.Products)} 
                    className="bg-jose-accent text-white px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all"
                  >
                    Ver Ofertas
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === AppSection.Products && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-24 px-6 container mx-auto">
                <div className="flex gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)} 
                      className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-[9px] uppercase tracking-widest transition-all ${
                        selectedCategory === cat.id 
                          ? 'bg-jose-dark text-white shadow-lg' 
                          : 'bg-white text-jose-dark border border-jose-dark/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.filter(p => selectedCategory === 'todos' || p.category === selectedCategory).map(p => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onAddToCart={(prod) => {
                        setCart(prev => {
                          const ex = prev.find(i => i.id === prod.id);
                          if (ex) return prev.map(i => i.id === prod.id ? {...i, quantity: i.quantity + 1} : i);
                          return [...prev, {...prod, quantity: 1}];
                        });
                        setIsCartOpen(true);
                      }} 
                    />
                  ))}
                </div>
            </motion.div>
          )}

          {activeSection === AppSection.SmartChef && (
            <motion.div key="chef">
              <SmartChef />
            </motion.div>
          )}
          
          {activeSection === AppSection.Location && (
            <motion.div key="loc">
              <Location />
            </motion.div>
          )}
          
          {activeSection === AppSection.Login && (
            <motion.div key="login">
              <Login 
                onLogin={handleLogin}
                onRegisterClick={() => setSection(AppSection.Register)}
              />
            </motion.div>
          )}
          
          {activeSection === AppSection.Register && (
            <motion.div key="register">
              <Register 
                onRegister={handleLogin}
                onBackToLogin={() => setSection(AppSection.Login)}
              />
            </motion.div>
          )}
          
          {activeSection === AppSection.Dashboard && user?.role === 'owner' && (
            <Dashboard 
              view={adminView} 
              setView={setAdminView} 
              stats={stats} 
              onLogout={handleLogout} 
            />
          )}
        </AnimatePresence>
      </main>
      <Footer />
        </>
      )}
    </div>
  );
};

export default App;
