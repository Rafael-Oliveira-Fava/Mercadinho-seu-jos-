
import React from 'react';
import { motion } from 'framer-motion';

const Location: React.FC = () => {
  return (
    <div className="pt-48 pb-24 px-6 container mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-serif text-jose-dark mb-6">Nossa Esquina</h2>
        <p className="text-jose-accent font-black uppercase text-[10px] tracking-[0.4em]">Onde o frescor encontra a tradição</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 relative rounded-[3rem] overflow-hidden shadow-2xl aspect-video border border-jose-dark/5 bg-gray-100">
          <iframe 
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.658!3d-23.561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzM5LjYiUyA0NsKwMzknMjguOCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-jose-dark/5">
            <h3 className="font-serif text-2xl mb-6 text-jose-dark">Endereço</h3>
            <p className="text-gray-500 leading-relaxed mb-4">
              Rua das Magnólias, 450<br />
              Vila Leopoldina, São Paulo - SP<br />
              CEP: 05000-000
            </p>
            <div className="pt-6 border-t border-jose-dark/5">
              <p className="text-[10px] font-black uppercase text-jose-accent tracking-widest mb-2">Horário de Funcionamento</p>
              <p className="text-sm text-jose-dark font-medium">Segunda a Sábado: 07h às 21h</p>
              <p className="text-sm text-jose-dark font-medium">Domingo: 08h às 13h</p>
            </div>
          </div>

          <div className="bg-jose-dark p-10 rounded-[2.5rem] text-white shadow-xl flex items-center gap-6">
            <div className="w-14 h-14 bg-jose-accent rounded-2xl flex items-center justify-center text-jose-dark text-xl shadow-lg">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Dúvidas? Chame o José</p>
              <p className="text-xl font-serif">(11) 98765-4321</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
