
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Order } from '../types';
import { api } from '../services/api';

const Sales: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'delivered' | 'cancelled'>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await api.orders.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string | number, newStatus: 'pending' | 'preparing' | 'delivered' | 'cancelled') => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      await loadOrders();
    } catch (error) {
      alert('Erro ao atualizar status do pedido');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'preparing': return 'Preparando';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-jose-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {(['all', 'pending', 'preparing', 'delivered', 'cancelled'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-[9px] uppercase tracking-widest transition-all ${
              filter === status
                ? 'bg-jose-dark text-white shadow-lg'
                : 'bg-white text-jose-dark border border-jose-dark/5 hover:border-jose-accent'
            }`}
          >
            {status === 'all' ? 'Todos' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white p-20 rounded-[4rem] shadow-xl border border-jose-dark/5 text-center">
          <div className="w-20 h-20 bg-jose-light rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-receipt text-3xl text-jose-dark/30"></i>
          </div>
          <h3 className="text-2xl font-serif text-jose-dark mb-4">Nenhum pedido</h3>
          <p className="text-gray-400 italic">Ainda não há pedidos nesta categoria.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-8 rounded-[3rem] shadow-xl border border-jose-dark/5"
            >
              <div className="flex flex-wrap gap-6 items-start justify-between mb-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-black text-jose-dark/40">#{String(order.id).slice(-6)}</span>
                    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {order.user && (
                    <p className="text-sm text-jose-dark mt-2">
                      <i className="fas fa-user mr-2"></i>
                      {order.user.name}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-jose-accent font-black uppercase tracking-widest mb-2">Total</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-serif text-jose-primary">R$</span>
                    <span className="text-4xl font-serif text-jose-dark tracking-tighter font-bold">
                      {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div className="bg-jose-light rounded-2xl p-6 mb-6">
                  <p className="text-[10px] text-jose-dark font-black uppercase tracking-widest mb-4">Items do Pedido</p>
                  <div className="space-y-3">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-jose-dark">
                          {item.quantity}x {item.product_name || `Produto #${item.product_id}`}
                        </span>
                        <span className="text-sm font-bold text-jose-accent">
                          R$ {(item.price_at_time * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {order.address && (
                <div className="bg-jose-light rounded-2xl p-6 mb-6">
                  <p className="text-[10px] text-jose-dark font-black uppercase tracking-widest mb-3">Endereço de Entrega</p>
                  <p className="text-sm text-gray-700">
                    {order.address.street}, {order.address.number}
                    {order.address.complement && ` - ${order.address.complement}`}
                  </p>
                  <p className="text-sm text-gray-700">
                    {order.address.neighborhood}, {order.address.city} - {order.address.state}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">CEP: {order.address.cep}</p>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                  className="flex-grow p-4 bg-white border-2 border-jose-dark/10 rounded-2xl text-sm font-bold outline-none focus:border-jose-accent transition-all cursor-pointer"
                >
                  <option value="pending">Pendente</option>
                  <option value="preparing">Preparando</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;
