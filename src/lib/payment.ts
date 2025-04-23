import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'pix' | 'cash';
  name: string;
  details: {
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    brand?: string;
    lastDigits?: string;
  };
  isDefault: boolean;
}

interface PaymentState {
  methods: PaymentMethod[];
  
  // Ações
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'isDefault'>, setAsDefault?: boolean) => void;
  updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  getDefaultPaymentMethod: () => PaymentMethod | undefined;
  getPaymentMethodById: (id: string) => PaymentMethod | undefined;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      methods: [],
      
      addPaymentMethod: (method, setAsDefault = false) => {
        set((state) => {
          const newId = `pm_${Date.now()}`;
          
          const newMethod: PaymentMethod = {
            ...method,
            id: newId,
            isDefault: setAsDefault || state.methods.length === 0 // Primeiro método é o padrão
          };
          
          // Se o novo método for definido como padrão, remova o padrão dos outros
          let updatedMethods = state.methods;
          if (newMethod.isDefault) {
            updatedMethods = state.methods.map(m => ({
              ...m,
              isDefault: false
            }));
          }
          
          return {
            methods: [...updatedMethods, newMethod]
          };
        });
      },
      
      updatePaymentMethod: (id, method) => {
        set((state) => {
          // Se estiver definindo este método como padrão, remova o padrão dos outros
          let updatedMethods = state.methods;
          if (method.isDefault) {
            updatedMethods = state.methods.map(m => ({
              ...m,
              isDefault: false
            }));
          }
          
          return {
            methods: updatedMethods.map(m => 
              m.id === id ? { ...m, ...method } : m
            )
          };
        });
      },
      
      removePaymentMethod: (id) => {
        set((state) => {
          const methodToRemove = state.methods.find(m => m.id === id);
          const filteredMethods = state.methods.filter(m => m.id !== id);
          
          // Se o método removido era o padrão, defina o primeiro método restante como padrão
          if (methodToRemove?.isDefault && filteredMethods.length > 0) {
            filteredMethods[0].isDefault = true;
          }
          
          return {
            methods: filteredMethods
          };
        });
      },
      
      setDefaultPaymentMethod: (id) => {
        set((state) => ({
          methods: state.methods.map(m => ({
            ...m,
            isDefault: m.id === id
          }))
        }));
      },
      
      getDefaultPaymentMethod: () => {
        return get().methods.find(m => m.isDefault);
      },
      
      getPaymentMethodById: (id) => {
        return get().methods.find(m => m.id === id);
      }
    }),
    {
      name: 'payment-storage', // nome para o armazenamento no localStorage
    }
  )
);
