
// Import React to fix namespace errors
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSmartChefAdvice } from '../services/geminiService';

const SmartChef: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    recipeName: string;
    instructions: string;
    shoppingListSuggestions: string[];
  } | null>(null);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    setLoading(true);
    setSuggestion(null);
    try {
      const result = await getSmartChefAdvice(ingredients);
      setSuggestion(result);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden py-24 bg-jose-light">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-jose-dark rounded-[2rem] mb-10 shadow-2xl relative">
             <i className="fas fa-robot text-4xl text-jose-accent"></i>
             <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
          </div>
          <span className="text-jose-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Culinária Inteligente</span>
          <h2 className="text-5xl md:text-8xl font-serif text-jose-dark mb-8 leading-tight">
            {suggestion ? suggestion.recipeName : "Chef José Bot"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic font-light text-xl leading-relaxed">
            "Olá! Sou o assistente digital do Seu José. Me diga o que sobrou na dispensa e eu crio a receita perfeita agora mesmo usando o que temos de mais fresco."
          </p>
        </motion.div>

        <form onSubmit={handleAskAI} className="relative max-w-3xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-4 bg-white p-3 rounded-[2.5rem] shadow-2xl border border-jose-dark/5">
            <input 
              type="text" 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ex: cebola, batata, ovo..."
              className="flex-grow bg-transparent px-8 py-5 outline-none text-jose-dark font-medium text-lg"
            />
            <button 
              disabled={loading}
              className="bg-jose-dark text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-jose-primary transition-all disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-brain"></i>}
              {loading ? 'Consultando...' : 'Pedir Receita'}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {suggestion && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-jose-dark/5"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-12 md:p-20 bg-jose-dark text-jose-light">
                  <h3 className="text-4xl font-serif mb-10 flex items-center gap-5">
                    <span className="w-12 h-12 rounded-full bg-jose-accent/20 flex items-center justify-center text-jose-accent text-sm">
                      <i className="fas fa-mortar-pestle"></i>
                    </span>
                    Preparo
                  </h3>
                  <div className="space-y-6 opacity-80 leading-relaxed text-lg font-light whitespace-pre-line">
                    {suggestion.instructions}
                  </div>
                </div>
                <div className="p-12 md:p-20 bg-[#FBF9F4]">
                  <h4 className="text-jose-dark font-black uppercase text-[10px] tracking-[0.4em] mb-10 opacity-40">Complete seu prato</h4>
                  <div className="space-y-6">
                    {suggestion.shoppingListSuggestions.map((item, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-jose-dark/5 shadow-sm flex items-center justify-between group hover:border-jose-primary transition-colors cursor-pointer">
                        <span className="font-serif text-lg text-jose-dark">{item}</span>
                        <div className="w-10 h-10 rounded-xl bg-jose-light flex items-center justify-center text-jose-accent group-hover:bg-jose-primary group-hover:text-white transition-all">
                          <i className="fas fa-plus text-[10px]"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-20 pt-10 border-t border-jose-dark/5 flex items-center gap-6">
                    <img src="https://i.pravatar.cc/100?u=jose" className="w-16 h-16 rounded-3xl border-2 border-jose-accent shadow-lg" alt="José" />
                    <div>
                       <p className="text-jose-dark font-serif italic text-lg leading-snug">"O robô aprendeu com quem sabe! Essa receita é sucesso garantido."</p>
                       <p className="text-[10px] font-black uppercase text-jose-accent tracking-widest mt-2">- Seu José</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartChef;