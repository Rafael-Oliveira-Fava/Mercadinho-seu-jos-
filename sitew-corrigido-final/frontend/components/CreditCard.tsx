
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CreditCardProps {
  onComplete: (cardData: CardData) => void;
  onBack: () => void;
}

export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ onComplete, onBack }) => {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [flipped, setFlipped] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const getCardBrand = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    return 'generic';
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setCardData({ ...cardData, number: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCardData({ ...cardData, expiry: value });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardData({ ...cardData, cvv: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardData.number.length === 16 && cardData.name && cardData.expiry.length === 4 && cardData.cvv.length === 3) {
      onComplete(cardData);
    }
  };

  const isFormValid = cardData.number.length === 16 && 
                       cardData.name.length >= 3 && 
                       cardData.expiry.length === 4 && 
                       cardData.cvv.length === 3;

  const cardBrand = getCardBrand(cardData.number);

  return (
    <div className="space-y-8">
      <h3 className="font-serif text-2xl text-jose-dark mb-6">Cartão de Crédito</h3>
      
      {/* Card Preview */}
      <div className="relative h-56 perspective-1000">
        <motion.div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 rounded-3xl p-8 text-white shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div className="flex justify-between items-start mb-12">
              <div className="w-12 h-10 bg-yellow-400 rounded-lg opacity-80"></div>
              <div className="text-right">
                {cardBrand === 'visa' && (
                  <div className="text-3xl font-bold">VISA</div>
                )}
                {cardBrand === 'mastercard' && (
                  <div className="flex gap-1">
                    <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80 -ml-4"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={`text-2xl font-mono tracking-widest mb-6 ${focusedField === 'number' ? 'scale-105' : ''} transition-transform`}>
              {formatCardNumber(cardData.number) || '•••• •••• •••• ••••'}
            </div>
            
            <div className="flex justify-between items-end">
              <div className={`${focusedField === 'name' ? 'scale-105' : ''} transition-transform`}>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Titular</div>
                <div className="font-bold tracking-wide">
                  {cardData.name || 'SEU NOME AQUI'}
                </div>
              </div>
              
              <div className={`${focusedField === 'expiry' ? 'scale-105' : ''} transition-transform`}>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Validade</div>
                <div className="font-bold">
                  {formatExpiry(cardData.expiry) || 'MM/AA'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Back */}
          <div 
            className="absolute inset-0 rounded-3xl text-white shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <div className="w-full h-12 bg-black mt-6"></div>
            <div className="px-8 mt-6">
              <div className="bg-white h-10 rounded flex items-center justify-end px-4">
                <span className="text-black font-mono font-bold">
                  {cardData.cvv || '•••'}
                </span>
              </div>
              <p className="text-xs mt-3 opacity-60">CVV</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-jose-dark/40 block mb-2 ml-4">
            Número do Cartão
          </label>
          <input
            type="text"
            value={formatCardNumber(cardData.number)}
            onChange={handleNumberChange}
            onFocus={() => setFocusedField('number')}
            onBlur={() => setFocusedField('')}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono tracking-wider"
            required
          />
        </div>

        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-jose-dark/40 block mb-2 ml-4">
            Nome do Titular
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField('')}
            placeholder="NOME COMO NO CARTÃO"
            className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all uppercase"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-jose-dark/40 block mb-2 ml-4">
              Validade
            </label>
            <input
              type="text"
              value={formatExpiry(cardData.expiry)}
              onChange={handleExpiryChange}
              onFocus={() => setFocusedField('expiry')}
              onBlur={() => setFocusedField('')}
              placeholder="MM/AA"
              maxLength={5}
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono"
              required
            />
          </div>
          
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-jose-dark/40 block mb-2 ml-4">
              CVV
            </label>
            <input
              type="text"
              value={cardData.cvv}
              onChange={handleCvvChange}
              onFocus={() => {
                setFocusedField('cvv');
                setFlipped(true);
              }}
              onBlur={() => {
                setFocusedField('');
                setFlipped(false);
              }}
              placeholder="•••"
              maxLength={3}
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono"
              required
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-jose-dark text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-jose-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Confirmar Pagamento
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="w-full text-jose-accent text-xs font-bold uppercase tracking-widest hover:underline"
          >
            Voltar
          </button>
        </div>
      </form>

      <div className="bg-jose-light p-6 rounded-2xl">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-3 flex items-center gap-2">
          <i className="fas fa-lock"></i>
          Pagamento Seguro (Modo Teste)
        </p>
        <p className="text-xs text-gray-600">
          Este é um ambiente de teste. Nenhuma cobrança real será realizada.
        </p>
      </div>
    </div>
  );
};

export default CreditCard;
