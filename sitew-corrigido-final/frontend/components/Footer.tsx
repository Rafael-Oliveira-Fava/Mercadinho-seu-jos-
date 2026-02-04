
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-jose-dark text-jose-light pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-jose-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-jose-accent rounded-xl flex items-center justify-center text-jose-dark">
                <i className="fas fa-store-alt"></i>
              </div>
              <h2 className="font-serif font-black text-2xl uppercase">Seu José</h2>
            </div>
            <p className="text-jose-light/60 text-sm leading-relaxed max-w-xs font-light">
              Trazendo a alma da colônia e o frescor da horta para o coração da cidade. Nossa missão é servir sua família como servimos a nossa.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl mb-8">Navegação</h3>
            <ul className="space-y-4 text-jose-light/60 text-sm font-medium tracking-wide">
              <li><a href="#" className="hover:text-jose-accent transition-colors">Produtos em Destaque</a></li>
              <li><a href="#" className="hover:text-jose-accent transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-jose-accent transition-colors">Política de Frescor</a></li>
              <li><a href="#" className="hover:text-jose-accent transition-colors">Sugestões ao José</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-8">Dúvidas?</h3>
            <ul className="space-y-6 text-jose-light/60 text-sm">
              <li className="flex items-start gap-4">
                <i className="fab fa-whatsapp text-jose-accent text-lg"></i>
                <span>(11) 98765-4321<br/><span className="text-[10px] uppercase font-bold text-jose-accent">Atendimento Direto</span></span>
              </li>
              <li className="flex items-start gap-4">
                <i className="far fa-clock text-jose-accent text-lg"></i>
                <span>Seg a Sáb: 07h às 21h<br/>Dom: 08h às 13h</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-8">Social</h3>
            <div className="flex gap-4">
              {[
                { icon: 'instagram', link: '#' },
                { icon: 'facebook-f', link: '#' },
                { icon: 'linkedin-in', link: '#' },
              ].map((social, i) => (
                <a key={i} href={social.link} className="w-12 h-12 border border-jose-light/10 rounded-full flex items-center justify-center hover:bg-jose-accent hover:text-jose-dark hover:border-jose-accent transition-all duration-300">
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-jose-light/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-jose-light/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2024 Mercadinho do Seu José. Orgulho em ser local.
          </p>
          <div className="flex gap-4">
            <i className="fab fa-cc-visa text-2xl opacity-20 hover:opacity-100 transition-opacity"></i>
            <i className="fab fa-cc-mastercard text-2xl opacity-20 hover:opacity-100 transition-opacity"></i>
            <i className="fab fa-pix text-2xl opacity-20 hover:opacity-100 transition-opacity"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
