
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, Address } from '../types';
import { cepService } from '../services/cepService';
import VirtualCard, { CardData } from './VirtualCard';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string | number, delta: number) => void;
  onRemove: (id: string | number) => void;
  onCheckout: (address: Address, paymentMethod?: 'pix' | 'card') => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const [step, setStep] = useState<'list' | 'address' | 'payment' | 'card'>('list');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | null>(null);
  const [address, setAddress] = useState<Address>({ street: '', number: '', neighborhood: '', city: '', state: '', cep: '' });
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepError, setCepError] = useState('');
  const [cardData, setCardData] = useState<CardData | null>(null);

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCEPBlur = async () => {
    if (address.cep.replace(/\D/g, '').length === 8) {
      setLoadingCEP(true);
      setCepError('');
      
      try {
        const addressData = await cepService.validateAndFetchAddress(address.cep);
        if (addressData) {
          setAddress(prev => ({ ...prev, ...addressData }));
        }
      } catch (error: any) {
        setCepError(error.message || 'CEP inválido');
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      if (cleaned.length > 5) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
      }
      return cleaned;
    }
    return value;
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setAddress({ ...address, cep: formatted });
    setCepError('');
  };

  const handleNext = () => {
    if (step === 'list') {
      if (items.length === 0) return;
      setStep('address');
    }
    else if (step === 'address') {
      if (!address.street || !address.number) {
        alert("Preencha o endereço de entrega.");
        return;
      }
      setStep('payment');
    }
    else if (step === 'payment') {
      if (!paymentMethod) {
        alert("Selecione a forma de pagamento.");
        return;
      }
      if (paymentMethod === 'card') {
        setStep('card');
      } else {
        // PIX - finaliza direto
        onCheckout(address, paymentMethod);
        setTimeout(() => {
          setStep('list');
          setPaymentMethod(null);
        }, 500);
      }
    }
  };

  const handleCardComplete = (data: CardData) => {
    setCardData(data);
    onCheckout(address, 'card');
    setTimeout(() => {
      setStep('list');
      setPaymentMethod(null);
      setCardData(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-jose-dark/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-10 border-b border-jose-dark/5 flex justify-between items-center">
              <h2 className="font-serif text-3xl text-jose-dark">Pedido</h2>
              <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-jose-light transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 custom-scroll">
              {step === 'list' && (
                <div className="space-y-8">
                  {items.length === 0 ? (
                    <div className="text-center py-24 opacity-30 italic font-light">Seu carrinho está vazio.</div>
                  ) : (
                    items.map(item => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt={item.name} />
                        <div className="flex-grow">
                          <h4 className="font-serif text-lg text-jose-dark mb-1 leading-tight">{item.name}</h4>
                          <div className="flex items-baseline gap-1 mb-3">
                             <span className="text-[10px] text-jose-accent font-black">R$</span>
                             <span className="text-sm font-bold text-jose-accent">{item.price.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 rounded-lg bg-jose-light flex items-center justify-center text-[10px] hover:bg-jose-dark hover:text-white transition-colors"><i className="fas fa-minus"></i></button>
                            <span className="text-sm font-black">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 rounded-lg bg-jose-light flex items-center justify-center text-[10px] hover:bg-jose-dark hover:text-white transition-colors"><i className="fas fa-plus"></i></button>
                          </div>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-red-200 hover:text-red-500 transition-colors p-2">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {step === 'address' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl mb-6">Entrega</h3>
                  <div className="space-y-3">
                    <div>
                      <input 
                        placeholder="CEP (apenas números)" 
                        value={address.cep} 
                        onChange={handleCEPChange}
                        onBlur={handleCEPBlur}
                        maxLength={9}
                        className={`w-full p-5 bg-jose-light rounded-2xl outline-none border-2 transition-all ${
                          cepError ? 'border-red-300' : 'border-transparent focus:border-jose-accent'
                        } ${loadingCEP ? 'opacity-50' : ''}`}
                        disabled={loadingCEP}
                      />
                      {loadingCEP && (
                        <p className="text-jose-accent text-xs mt-2 ml-4">Buscando endereço...</p>
                      )}
                      {cepError && (
                        <p className="text-red-500 text-xs mt-2 ml-4">{cepError}</p>
                      )}
                    </div>
                    <input 
                      placeholder="Logradouro / Rua" 
                      value={address.street} 
                      onChange={e => setAddress({...address, street: e.target.value})} 
                      className="w-full p-5 bg-jose-light rounded-2xl outline-none border border-transparent focus:border-jose-accent transition-all" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        placeholder="Bairro" 
                        value={address.neighborhood} 
                        onChange={e => setAddress({...address, neighborhood: e.target.value})} 
                        className="w-full p-5 bg-jose-light rounded-2xl outline-none border border-transparent focus:border-jose-accent transition-all" 
                      />
                      <input 
                        placeholder="Cidade" 
                        value={address.city} 
                        onChange={e => setAddress({...address, city: e.target.value})} 
                        className="w-full p-5 bg-jose-light rounded-2xl outline-none border border-transparent focus:border-jose-accent transition-all" 
                      />
                    </div>
                    <div className="flex gap-4">
                      <input 
                        placeholder="Nº" 
                        value={address.number} 
                        onChange={e => setAddress({...address, number: e.target.value})} 
                        className="w-24 p-5 bg-jose-light rounded-2xl outline-none border border-transparent focus:border-jose-accent transition-all" 
                      />
                      <input 
                        placeholder="Complemento (opcional)" 
                        value={address.complement || ''} 
                        onChange={e => setAddress({...address, complement: e.target.value})} 
                        className="flex-grow p-5 bg-jose-light rounded-2xl outline-none border border-transparent focus:border-jose-accent transition-all" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-8">
                  <h3 className="font-serif text-2xl text-jose-dark">Pagamento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${
                        paymentMethod === 'pix' ? 'border-jose-accent bg-jose-accent/5' : 'border-jose-dark/5'
                      }`}
                    >
                      <i className="fas fa-qrcode text-2xl text-jose-accent"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">PIX</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${
                        paymentMethod === 'card' ? 'border-jose-accent bg-jose-accent/5' : 'border-jose-dark/5'
                      }`}
                    >
                      <i className="fas fa-credit-card text-2xl text-jose-accent"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Cartão</span>
                    </button>
                  </div>
                  
                  <div className="p-10 bg-jose-dark rounded-[3rem] text-white shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6">Resumo Final</p>
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-xl opacity-80">Total</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-serif text-jose-accent">R$</span>
                        <span className="text-5xl font-serif text-jose-accent font-bold tracking-tighter">{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'card' && (
                <div>
                  <div className="mb-6">
                    <button 
                      onClick={() => setStep('payment')}
                      className="flex items-center gap-2 text-jose-accent text-sm font-bold hover:underline"
                    >
                      <i className="fas fa-arrow-left"></i>
                      Voltar para pagamento
                    </button>
                  </div>
                  <VirtualCard amount={total} onPaymentComplete={handleCardComplete} />
                </div>
              )}
            </div>

            <div className="p-10 border-t border-jose-dark/5 bg-jose-light/20">
              {step !== 'card' && (
                <>
                  <button 
                    disabled={items.length === 0}
                    onClick={handleNext}
                    className="w-full bg-jose-dark text-white py-7 rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-jose-primary transition-all disabled:opacity-30 active:scale-95"
                  >
                    {step === 'list' ? 'Dados de Entrega' : step === 'address' ? 'Forma de Pagamento' : 'Continuar'}
                  </button>
                  {step !== 'list' && (
                    <button onClick={() => setStep(step === 'payment' ? 'address' : 'list')} className="w-full mt-6 text-[9px] font-black uppercase text-jose-accent tracking-[0.2em] hover:underline">
                      Voltar para {step === 'payment' ? 'entrega' : 'itens'}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
