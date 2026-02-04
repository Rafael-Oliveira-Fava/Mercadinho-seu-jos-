
// Import React to fix namespace errors
import React, { useState, useEffect } from 'react';
import { AppSection, User } from '../types';

interface HeaderProps {
  activeSection: AppSection;
  setSection: (s: AppSection) => void;
  cartCount: number;
  toggleCart: () => void;
  toggleMenu: () => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setSection, cartCount, toggleCart, toggleMenu, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4 glass shadow-2xl border-b border-jose-dark/5' : 'py-8'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setSection(AppSection.Home)}>
          <div className="w-12 h-12 bg-jose-dark rounded-2xl flex items-center justify-center text-jose-accent shadow-xl group-hover:rotate-6 transition-transform">
            <i className="fas fa-store"></i>
          </div>
          <div className="transition-all duration-500">
            <h1 className="font-serif font-black text-3xl text-jose-dark leading-none">Seu José</h1>
            <p className="text-[10px] text-jose-accent font-black uppercase tracking-[0.4em] mt-1">Cuidado Local</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-14">
          {[
            { id: AppSection.Home, label: 'Início' },
            { id: AppSection.Products, label: 'Horta' },
            { id: AppSection.SmartChef, label: 'Chef José Bot', icon: 'fa-robot' },
            { id: AppSection.Location, label: 'Visite-nos' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all flex items-center gap-3 ${
                activeSection === item.id ? 'text-jose-primary' : 'text-jose-dark/40 hover:text-jose-dark'
              }`}
            >
              {item.icon && <i className={`fas ${item.icon} text-jose-accent`}></i>}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-jose-light hover:bg-jose-accent/10 transition-all"
              >
                <div className="w-8 h-8 bg-jose-dark rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-jose-dark hidden md:block">
                  Oi, {getFirstName(user.name)}
                </span>
                <i className={`fas fa-chevron-down text-xs text-jose-dark transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-jose-dark/5 overflow-hidden">
                  <div className="p-6 bg-jose-light border-b border-jose-dark/5">
                    <p className="text-sm font-bold text-jose-dark">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    {user.role === 'owner' && (
                      <span className="inline-block mt-2 px-3 py-1 bg-jose-accent text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    {user.role === 'owner' && (
                      <button
                        onClick={() => {
                          setSection(AppSection.Dashboard);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-jose-light transition-colors flex items-center gap-3"
                      >
                        <i className="fas fa-chart-line text-jose-accent"></i>
                        <span className="text-sm font-bold text-jose-dark">Dashboard</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <i className="fas fa-sign-out-alt text-red-500"></i>
                      <span className="text-sm font-bold text-red-500">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setSection(AppSection.Login)} 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-jose-light hover:bg-jose-accent/10 transition-all"
            >
              <i className="far fa-user-circle text-xl text-jose-dark"></i>
              <span className="text-sm font-bold text-jose-dark hidden md:block">Entrar</span>
            </button>
          )}
          
          <button 
            onClick={toggleCart}
            className="relative group"
          >
            <div className="bg-jose-dark text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-jose-primary transition-colors">
              <i className="fas fa-shopping-basket text-sm"></i>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-jose-accent text-jose-dark text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;