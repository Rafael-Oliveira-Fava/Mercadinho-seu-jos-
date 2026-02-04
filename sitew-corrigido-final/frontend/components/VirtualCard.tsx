
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface VirtualCardProps {
  onPaymentComplete: (cardData: CardData) => void;
  amount: number;
}

export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ onPaymentComplete, amount }) => {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19); // 16 dígitos + 3 espaços
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ''));
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardData({ ...cardData, expiry: formatted });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cvv = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardData({ ...cardData, cvv });
  };

  const getCardBrand = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return 'generic';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      alert('Número do cartão inválido');
      return;
    }
    
    if (cardData.expiry.length !== 5) {
      alert('Data de validade inválida');
      return;
    }
    
    if (cardData.cvv.length !== 3) {
      alert('CVV inválido');
      return;
    }
    
    if (!cardData.name || cardData.name.length < 3) {
      alert('Nome inválido');
      return;
    }

    setProcessing(true);
    
    // Simulação de processamento
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete(cardData);
    }, 2000);
  };

  const cardBrand = getCardBrand(cardData.number);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 perspective-1000">
        <motion.div
          className="relative w-full h-56 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Frente do Cartão */}
          <div 
            className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #1a4731 0%, #2d6a4f 100%)'
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
            </div>
            
            <div className="relative p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg shadow-lg"></div>
                <div className="text-white text-2xl font-bold">
                  {cardBrand === 'visa' && 'VISA'}
                  {cardBrand === 'mastercard' && 'Mastercard'}
                  {cardBrand === 'amex' && 'AMEX'}
                  {cardBrand === 'generic' && 'CARD'}
                </div>
              </div>

              <div>
                <div className="text-white text-2xl font-mono tracking-widest mb-6 h-8">
                  {cardData.number || '•••• •••• •••• ••••'}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/60 text-[9px] uppercase tracking-widest mb-1 font-bold">Nome no Cartão</p>
                    <p className="text-white text-sm font-bold uppercase tracking-wide">
                      {cardData.name || 'SEU NOME AQUI'}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-[9px] uppercase tracking-widest mb-1 font-bold text-right">Validade</p>
                    <p className="text-white text-sm font-bold font-mono">
                      {cardData.expiry || 'MM/AA'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verso do Cartão */}
          <div 
            className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #2d6a4f 0%, #1a4731 100%)'
            }}
          >
            <div className="w-full h-12 bg-black mt-6"></div>
            <div className="p-8">
              <div className="bg-white rounded-lg p-3 mb-4">
                <p className="text-right text-black font-mono text-lg tracking-widest">
                  {cardData.cvv || '•••'}
                </p>
              </div>
              <p className="text-white/60 text-xs">
                CVV - Código de Segurança
              </p>
              <p className="text-white text-xs mt-8 text-center">
                Mercadinho do Seu José - Cartão Virtual
              </p>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center text-xs text-gray-400 mt-4 italic">
          Clique no cartão para virar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-jose-dark uppercase tracking-widest block mb-2 ml-2">
            Número do Cartão
          </label>
          <input
            type="text"
            value={cardData.number}
            onChange={handleNumberChange}
            placeholder="0000 0000 0000 0000"
            className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono text-lg"
            maxLength={19}
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-jose-dark uppercase tracking-widest block mb-2 ml-2">
            Nome no Cartão
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
            placeholder="NOME COMPLETO"
            className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all uppercase"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-jose-dark uppercase tracking-widest block mb-2 ml-2">
              Validade
            </label>
            <input
              type="text"
              value={cardData.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/AA"
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono"
              maxLength={5}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-jose-dark uppercase tracking-widest block mb-2 ml-2">
              CVV
            </label>
            <input
              type="text"
              value={cardData.cvv}
              onChange={handleCvvChange}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              placeholder="•••"
              className="w-full p-5 bg-jose-light rounded-2xl outline-none border-2 border-transparent focus:border-jose-accent transition-all font-mono"
              maxLength={3}
              required
            />
          </div>
        </div>

        <div className="bg-jose-light rounded-2xl p-6 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-jose-dark font-bold">Total a pagar:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif text-jose-accent">R$</span>
              <span className="text-3xl font-serif text-jose-dark font-bold">
                {amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-jose-dark text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-jose-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-3">
              <span className="animate-spin">⟳</span>
              Processando Pagamento...
            </span>
          ) : (
            'Confirmar Pagamento'
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Pagamento 100% seguro e criptografado
        </p>
      </form>
    </div>
  );
};

export default VirtualCard;
