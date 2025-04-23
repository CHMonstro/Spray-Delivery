import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DeliveryState {
  availableZipCodes: string[];
  deliveryFee: number;
  freeDeliveryThreshold: number;
  estimatedDeliveryTime: number; // em minutos
  
  // Ações
  isDeliveryAvailable: (zipCode: string) => boolean;
  calculateDeliveryFee: (subtotal: number, zipCode: string) => number;
  getEstimatedDeliveryTime: (zipCode: string) => number;
  addAvailableZipCode: (zipCode: string) => void;
  removeAvailableZipCode: (zipCode: string) => void;
  updateDeliveryFee: (fee: number) => void;
  updateFreeDeliveryThreshold: (threshold: number) => void;
  updateEstimatedDeliveryTime: (time: number) => void;
}

// Dados iniciais simulados
const initialZipCodes = [
  '01000000', '01100000', '01200000', '01300000', '01400000',
  '02000000', '02100000', '02200000', '02300000', '02400000',
  '03000000', '03100000', '03200000', '03300000', '03400000',
  '04000000', '04100000', '04200000', '04300000', '04400000',
  '05000000', '05100000', '05200000', '05300000', '05400000'
];

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set, get) => ({
      availableZipCodes: initialZipCodes,
      deliveryFee: 15.90,
      freeDeliveryThreshold: 100.00,
      estimatedDeliveryTime: 30, // 30 minutos
      
      isDeliveryAvailable: (zipCode: string) => {
        // Verifica se o CEP está na lista de CEPs disponíveis
        // Na implementação real, poderia verificar por região ou faixa de CEP
        return get().availableZipCodes.some(availableZip => 
          zipCode.replace(/[^0-9]/g, '').startsWith(availableZip.replace(/[^0-9]/g, ''))
        );
      },
      
      calculateDeliveryFee: (subtotal: number, zipCode: string) => {
        // Se o valor do pedido for maior que o limite para frete grátis, retorna 0
        if (subtotal >= get().freeDeliveryThreshold) {
          return 0;
        }
        
        // Verifica se o CEP está disponível para entrega
        if (!get().isDeliveryAvailable(zipCode)) {
          return -1; // Código para indicar que não entregamos nesse CEP
        }
        
        // Retorna a taxa de entrega padrão
        return get().deliveryFee;
      },
      
      getEstimatedDeliveryTime: (zipCode: string) => {
        // Na implementação real, poderia calcular com base na distância
        // Para simplificar, retorna o tempo padrão
        return get().estimatedDeliveryTime;
      },
      
      addAvailableZipCode: (zipCode: string) => {
        set((state) => ({
          availableZipCodes: [...state.availableZipCodes, zipCode]
        }));
      },
      
      removeAvailableZipCode: (zipCode: string) => {
        set((state) => ({
          availableZipCodes: state.availableZipCodes.filter(zip => zip !== zipCode)
        }));
      },
      
      updateDeliveryFee: (fee: number) => {
        set({ deliveryFee: fee });
      },
      
      updateFreeDeliveryThreshold: (threshold: number) => {
        set({ freeDeliveryThreshold: threshold });
      },
      
      updateEstimatedDeliveryTime: (time: number) => {
        set({ estimatedDeliveryTime: time });
      }
    }),
    {
      name: 'delivery-storage', // nome para o armazenamento no localStorage
    }
  )
);
