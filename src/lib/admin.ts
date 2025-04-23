import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from './user';

interface AdminState {
  // Estatísticas
  totalSales: number;
  totalOrders: number;
  activeOrders: number;
  
  // Ações
  updateStats: (orders: Order[]) => void;
  getTopSellingProducts: (orders: Order[]) => { productId: number; name: string; quantity: number; revenue: number }[];
  getSalesByPeriod: (orders: Order[], period: 'day' | 'week' | 'month' | 'year') => { date: string; sales: number }[];
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      totalSales: 0,
      totalOrders: 0,
      activeOrders: 0,
      
      updateStats: (orders) => {
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const activeOrders = orders.filter(order => 
          order.status === 'pending' || 
          order.status === 'processing' || 
          order.status === 'delivering'
        ).length;
        
        set({
          totalSales,
          totalOrders,
          activeOrders
        });
      },
      
      getTopSellingProducts: (orders) => {
        // Mapear todos os itens de todos os pedidos
        const allItems = orders.flatMap(order => order.items);
        
        // Agrupar por productId e calcular quantidade total e receita
        const productMap = new Map();
        
        allItems.forEach(item => {
          if (!productMap.has(item.productId)) {
            productMap.set(item.productId, {
              productId: item.productId,
              name: item.name,
              quantity: 0,
              revenue: 0
            });
          }
          
          const product = productMap.get(item.productId);
          product.quantity += item.quantity;
          product.revenue += item.price * item.quantity;
          
          productMap.set(item.productId, product);
        });
        
        // Converter para array e ordenar por receita (do maior para o menor)
        return Array.from(productMap.values())
          .sort((a, b) => b.revenue - a.revenue);
      },
      
      getSalesByPeriod: (orders, period) => {
        // Função para formatar a data de acordo com o período
        const formatDate = (date: Date) => {
          switch (period) {
            case 'day':
              return date.toISOString().split('T')[0]; // YYYY-MM-DD
            case 'week':
              const weekNumber = Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
              return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-W${weekNumber}`;
            case 'month':
              return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            case 'year':
              return date.getFullYear().toString();
            default:
              return date.toISOString().split('T')[0];
          }
        };
        
        // Agrupar vendas por período
        const salesByPeriod = new Map();
        
        orders.forEach(order => {
          const dateKey = formatDate(order.date);
          
          if (!salesByPeriod.has(dateKey)) {
            salesByPeriod.set(dateKey, 0);
          }
          
          salesByPeriod.set(dateKey, salesByPeriod.get(dateKey) + order.total);
        });
        
        // Converter para array e ordenar por data
        return Array.from(salesByPeriod.entries())
          .map(([date, sales]) => ({ date, sales }))
          .sort((a, b) => a.date.localeCompare(b.date));
      }
    }),
    {
      name: 'admin-storage', // nome para o armazenamento no localStorage
    }
  )
);
