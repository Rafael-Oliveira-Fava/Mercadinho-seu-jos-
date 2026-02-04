import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Product, Order, User } from '../types';
import { getSupabaseClient } from '../lib/supabase';

interface AdminPanelProps {
  onLogout: () => void;
}

type Tab = 'dashboard' | 'produtos' | 'pedidos' | 'usuarios' | 'config';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState({
    vendasHoje: 0,
    pedidosPendentes: 0,
    totalProdutos: 0,
    usuariosAtivos: 0,
    totalRevenue: 0
  });
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'mercearia',
    unit: 'un',
    image: ''
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [config, setConfig] = useState({
    nomeMercado: 'Mercadinho do Seu José',
    taxaEntrega: 5.00,
    pedidoMinimo: 30.00,
    aberto: true
  });

  const loadData = async () => {
    setLoading(true);
    try {
      // Carregar produtos
      const prods = await api.products.getAll();
      setProdutos(prods);

      // Carregar pedidos
      const ords = await api.orders.getAll();
      setPedidos(ords);

      // Carregar estatísticas
      const st = await api.stats.getDashboard();
      
      // Calcular vendas de hoje
      const hoje = new Date().toISOString().split('T')[0];
      const vendasHoje = ords
        .filter((o: Order) => o.created_at.split('T')[0] === hoje)
        .reduce((acc, o) => acc + Number(o.total), 0);
      
      const pendentes = ords.filter((o: Order) => o.status === 'pending').length;

      // Carregar usuários
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data: users } = await supabase.from('users').select('*');
        setUsuarios(users || []);
      } else {
        // Fallback para localStorage
        const localUsers = JSON.parse(localStorage.getItem('jose_users') || '[]');
        setUsuarios(localUsers);
      }

      setStats({
        vendasHoje,
        pedidosPendentes: pendentes,
        totalProdutos: prods.length,
        usuariosAtivos: usuarios.length || 127,
        totalRevenue: st.totalRevenue
      });
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string | number, newStatus: 'pending' | 'preparing' | 'delivered' | 'cancelled') => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      loadData();
    } catch (err) {
      alert('Erro ao atualizar status do pedido');
    }
  };

  const handleSaveProduct = async () => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        alert('Banco de dados não configurado. Configure o Supabase para gerenciar produtos.');
        return;
      }

      if (editingProduct) {
        // Atualizar produto
        const { error } = await supabase
          .from('products')
          .update({
            name: newProduct.name,
            price: newProduct.price,
            category: newProduct.category,
            unit: newProduct.unit,
            image: newProduct.image
          })
          .eq('id', editingProduct.id);
        
        if (error) throw error;
      } else {
        // Criar novo produto
        const { error } = await supabase
          .from('products')
          .insert([newProduct]);
        
        if (error) throw error;
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        price: 0,
        category: 'mercearia',
        unit: 'un',
        image: ''
      });
      loadData();
    } catch (err: any) {
      alert('Erro ao salvar produto: ' + err.message);
    }
  };

  const handleDeleteProduct = async (productId: string | number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        alert('Banco de dados não configurado');
        return;
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      loadData();
    } catch (err: any) {
      alert('Erro ao excluir produto: ' + err.message);
    }
  };

  const handleSaveConfig = () => {
    localStorage.setItem('jose_config', JSON.stringify(config));
    alert('Configurações salvas com sucesso!');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-serif text-jose-dark">Painel de Controle</h2>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-3xl shadow-lg border-2 border-jose-accent/20"
        >
          <i className="fas fa-dollar-sign text-4xl text-jose-accent mb-4"></i>
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Vendas Hoje</p>
          <p className="text-3xl font-black text-jose-dark">R$ {stats.vendasHoje.toFixed(2)}</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-3xl shadow-lg border-2 border-orange-500/20"
        >
          <i className="fas fa-shopping-bag text-4xl text-orange-500 mb-4"></i>
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Pedidos Pendentes</p>
          <p className="text-3xl font-black text-jose-dark">{stats.pedidosPendentes}</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-3xl shadow-lg border-2 border-blue-500/20"
        >
          <i className="fas fa-box text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Total Produtos</p>
          <p className="text-3xl font-black text-jose-dark">{stats.totalProdutos}</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-8 rounded-3xl shadow-lg border-2 border-green-500/20"
        >
          <i className="fas fa-users text-4xl text-green-500 mb-4"></i>
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Usuários Cadastrados</p>
          <p className="text-3xl font-black text-jose-dark">{usuarios.length}</p>
        </motion.div>
      </div>

      {/* Receita Total */}
      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-serif mb-4">Receita Total</h3>
        <p className="text-5xl font-black text-jose-accent">R$ {stats.totalRevenue.toFixed(2)}</p>
        <p className="text-gray-500 mt-2">Total de todas as vendas</p>
      </div>

      {/* Gráfico de Vendas */}
      <div className="bg-white p-8 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-serif mb-6">Vendas da Semana</h3>
        <div className="h-64 flex items-end justify-around gap-4">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, idx) => {
            const altura = Math.random() * 100 + 50;
            return (
              <div key={dia} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-jose-accent rounded-t-lg transition-all hover:bg-jose-primary" style={{ height: `${altura}%` }}></div>
                <span className="text-xs text-gray-500 font-bold">{dia}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderProdutos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-serif text-jose-dark">Gerenciar Produtos</h2>
        <button 
          onClick={() => {
            setShowProductForm(true);
            setEditingProduct(null);
            setNewProduct({
              name: '',
              price: 0,
              category: 'mercearia',
              unit: 'un',
              image: ''
            });
          }}
          className="bg-jose-accent text-white px-6 py-3 rounded-2xl font-bold hover:opacity-90"
        >
          <i className="fas fa-plus mr-2"></i>
          Novo Produto
        </button>
      </div>

      {/* Formulário de Produto */}
      {showProductForm && (
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-serif mb-6">{editingProduct ? 'Editar' : 'Novo'} Produto</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold mb-2">Nome</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-jose-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-jose-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Categoria</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-jose-accent outline-none"
              >
                <option value="padaria">Padaria</option>
                <option value="hortifruti">Hortifruti</option>
                <option value="mercearia">Mercearia</option>
                <option value="bebidas">Bebidas</option>
                <option value="limpeza">Limpeza</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Unidade</label>
              <input
                type="text"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-jose-accent outline-none"
                placeholder="kg, un, L, etc"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">URL da Imagem</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full p-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-jose-accent outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveProduct}
              className="flex-1 bg-jose-accent text-white py-3 rounded-2xl font-bold hover:opacity-90"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl font-bold hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-jose-dark text-white">
            <tr>
              <th className="p-4 text-left">Produto</th>
              <th className="p-4 text-left">Categoria</th>
              <th className="p-4 text-left">Preço</th>
              <th className="p-4 text-left">Unidade</th>
              <th className="p-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Carregando...</td></tr>
            ) : produtos.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Nenhum produto cadastrado</td></tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{produto.name}</td>
                  <td className="p-4 text-gray-600 capitalize">{produto.category}</td>
                  <td className="p-4 font-bold text-jose-accent">R$ {Number(produto.price).toFixed(2)}</td>
                  <td className="p-4 text-gray-600">{produto.unit}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => {
                        setEditingProduct(produto);
                        setNewProduct(produto);
                        setShowProductForm(true);
                      }}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(produto.id)}
                      className="text-red-500 hover:underline"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPedidos = () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-serif text-jose-dark">Pedidos Recentes</h2>
      
      <div className="grid gap-4">
        {loading ? (
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">
            Carregando pedidos...
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">
            Nenhum pedido encontrado
          </div>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white p-6 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-lg">Pedido #{pedido.id}</p>
                  <p className="text-gray-500 text-sm">
                    {pedido.user?.name || pedido.user_id} - {new Date(pedido.created_at).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-jose-accent font-bold mt-2">R$ {Number(pedido.total).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={pedido.status}
                    onChange={(e) => handleUpdateOrderStatus(pedido.id, e.target.value as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${
                      pedido.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      pedido.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                      pedido.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    <option value="pending">PENDENTE</option>
                    <option value="preparing">PREPARANDO</option>
                    <option value="delivered">ENTREGUE</option>
                    <option value="cancelled">CANCELADO</option>
                  </select>
                </div>
              </div>
              
              {pedido.order_items && pedido.order_items.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-bold mb-2">Itens:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pedido.order_items.map((item: any) => (
                      <li key={item.id}>
                        {item.quantity}x {item.product_name} - R$ {Number(item.price_at_time).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-serif text-jose-dark">Usuários Cadastrados</h2>
      
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Carregando usuários...</div>
          ) : usuarios.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Nenhum usuário cadastrado</div>
          ) : (
            usuarios.map((usuario, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-jose-accent rounded-full flex items-center justify-center text-white font-bold">
                    {usuario.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold">{usuario.name}</p>
                    <p className="text-sm text-gray-500">{usuario.email}</p>
                    <p className="text-xs text-gray-400">
                      {usuario.role === 'owner' ? '👑 Proprietário' : '👤 Cliente'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    CPF: {usuario.cpf || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {usuario.phone || 'Sem telefone'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderConfig = () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-serif text-jose-dark">Configurações do Site</h2>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Nome do Mercado</label>
          <input 
            type="text" 
            value={config.nomeMercado}
            onChange={(e) => setConfig({ ...config, nomeMercado: e.target.value })}
            className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-jose-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Taxa de Entrega (R$)</label>
          <input 
            type="number"
            step="0.01"
            value={config.taxaEntrega}
            onChange={(e) => setConfig({ ...config, taxaEntrega: parseFloat(e.target.value) })}
            className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-jose-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Pedido Mínimo (R$)</label>
          <input 
            type="number"
            step="0.01"
            value={config.pedidoMinimo}
            onChange={(e) => setConfig({ ...config, pedidoMinimo: parseFloat(e.target.value) })}
            className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-jose-accent outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="aberto"
            checked={config.aberto}
            onChange={(e) => setConfig({ ...config, aberto: e.target.checked })}
            className="w-6 h-6" 
          />
          <label htmlFor="aberto" className="font-bold">Mercado Aberto</label>
        </div>

        <button 
          onClick={handleSaveConfig}
          className="w-full bg-jose-accent text-white py-4 rounded-2xl font-bold hover:opacity-90"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-jose-light">
      {/* Header Admin */}
      <div className="bg-jose-dark text-white p-6 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-jose-accent rounded-full flex items-center justify-center">
              <i className="fas fa-user-shield text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-serif">Painel Administrativo</h1>
              <p className="text-sm opacity-75">Seu José - Gerenciamento</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Sair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex gap-2 p-4 overflow-x-auto">
          {[
            { id: 'dashboard', icon: 'chart-line', label: 'Dashboard' },
            { id: 'produtos', icon: 'box', label: 'Produtos' },
            { id: 'pedidos', icon: 'shopping-cart', label: 'Pedidos' },
            { id: 'usuarios', icon: 'users', label: 'Usuários' },
            { id: 'config', icon: 'cog', label: 'Configurações' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-jose-accent text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className={`fas fa-${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto p-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'produtos' && renderProdutos()}
        {activeTab === 'pedidos' && renderPedidos()}
        {activeTab === 'usuarios' && renderUsuarios()}
        {activeTab === 'config' && renderConfig()}
      </div>
    </div>
  );
};

export default AdminPanel;
