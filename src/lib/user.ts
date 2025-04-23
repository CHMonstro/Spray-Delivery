import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: number;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled';
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  address: Address;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

interface UserStore {
  addresses: Address[];
  orders: Order[];
  
  // Ações para endereços
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>, setAsDefault?: boolean) => void;
  updateAddress: (id: number, address: Partial<Address>) => void;
  removeAddress: (id: number) => void;
  setDefaultAddress: (id: number) => void;
  getDefaultAddress: () => Address | undefined;
  
  // Ações para pedidos
  addOrder: (order: Omit<Order, 'id' | 'date'>) => string;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      orders: [],
      
      // Métodos para endereços
      addAddress: (address, setAsDefault = false) => {
        set((state) => {
          const newId = state.addresses.length > 0 
            ? Math.max(...state.addresses.map(a => a.id)) + 1 
            : 1;
          
          const newAddress: Address = {
            ...address,
            id: newId,
            isDefault: setAsDefault || state.addresses.length === 0 // Primeiro endereço é o padrão
          };
          
          // Se o novo endereço for definido como padrão, remova o padrão dos outros
          let updatedAddresses = state.addresses;
          if (newAddress.isDefault) {
            updatedAddresses = state.addresses.map(a => ({
              ...a,
              isDefault: false
            }));
          }
          
          return {
            addresses: [...updatedAddresses, newAddress]
          };
        });
      },
      
      updateAddress: (id, address) => {
        set((state) => {
          // Se estiver definindo este endereço como padrão, remova o padrão dos outros
          let updatedAddresses = state.addresses;
          if (address.isDefault) {
            updatedAddresses = state.addresses.map(a => ({
              ...a,
              isDefault: false
            }));
          }
          
          return {
            addresses: updatedAddresses.map(a => 
              a.id === id ? { ...a, ...address } : a
            )
          };
        });
      },
      
      removeAddress: (id) => {
        set((state) => {
          const addressToRemove = state.addresses.find(a => a.id === id);
          const filteredAddresses = state.addresses.filter(a => a.id !== id);
          
          // Se o endereço removido era o padrão, defina o primeiro endereço restante como padrão
          if (addressToRemove?.isDefault && filteredAddresses.length > 0) {
            filteredAddresses[0].isDefault = true;
          }
          
          return {
            addresses: filteredAddresses
          };
        });
      },
      
      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map(a => ({
            ...a,
            isDefault: a.id === id
          }))
        }));
      },
      
      getDefaultAddress: () => {
        return get().addresses.find(a => a.isDefault);
      },
      
      // Métodos para pedidos
      addOrder: (order) => {
        const orderId = `ORD${Date.now()}`;
        
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: orderId,
              date: new Date()
            }
          ]
        }));
        
        return orderId;
      },
      
      getOrderById: (id) => {
        return get().orders.find(o => o.id === id);
      },
      
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map(o => 
            o.id === id ? { ...o, status } : o
          )
        }));
      }
    }),
    {
      name: 'user-storage', // nome para o armazenamento no localStorage
    }
  )
);
