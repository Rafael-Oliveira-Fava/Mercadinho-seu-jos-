
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-jose-dark/5 shadow-sm active:shadow-md transition-all flex flex-col h-full group"
    >
      <div className="relative aspect-square overflow-hidden bg-[#F2EFE9] flex items-center justify-center">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}

        {!imageError ? (
          <img 
            src={product.image} 
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-jose-dark/10 p-4 text-center">
            <i className="fas fa-basket-shopping text-3xl mb-2"></i>
          </div>
        )}
        
        {/* Adicionar ao Carrinho - Sempre acessível no clique da imagem ou no botão */}
        <div className="absolute inset-0 flex items-end p-2 md:p-4 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-jose-dark py-3 md:py-4 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-xl active:scale-95 transition-all pointer-events-auto"
          >
            Adicionar <i className="fas fa-plus ml-1 text-[8px]"></i>
          </button>
        </div>

        <div className="absolute top-2 left-2 md:top-6 md:left-6 z-20">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[7px] md:text-[8px] font-black text-jose-dark uppercase tracking-widest shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-8 text-center flex-grow flex flex-col justify-between">
        <h3 className="font-serif text-sm md:text-2xl text-jose-dark leading-tight line-clamp-2 mb-4">{product.name}</h3>
        <div className="inline-block px-4 py-2 bg-jose-light rounded-full border border-jose-dark/5">
          <span className="text-sm md:text-xl font-serif font-black text-jose-primary">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-[8px] md:text-[10px] text-jose-dark/40 ml-1 font-bold">/{product.unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;