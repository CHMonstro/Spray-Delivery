import { expect, test } from 'vitest';
import { useCartStore } from '../src/lib/cart';
import { useProductsStore } from '../src/lib/products';
import { useUserStore } from '../src/lib/user';
import { useDeliveryStore } from '../src/lib/delivery';
import { usePaymentStore } from '../src/lib/payment';
import { useNotificationStore } from '../src/lib/notification';
import { useAdminStore } from '../src/lib/admin';
import { loginUser, registerUser, logoutUser } from '../src/lib/auth';

// Mock do localStorage para testes
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Testes para o carrinho de compras
test('Carrinho: adicionar, atualizar e remover itens', () => {
  const cartStore = useCartStore.getState();
  cartStore.clearCart();
  
  // Produto de teste
  const product = {
    id: 1,
    name: 'Montana Black 400ml',
    price: 39.90,
    image: '/images/products/montana-black.jpg',
    color: 'Preto',
    brand: 'Montana',
    category: 'Tintas Spray',
    stock: 50,
    rating: 4.8
  };
  
  // Adicionar produto ao carrinho
  cartStore.addItem(product, 2);
  expect(cartStore.items.length).toBe(1);
  expect(cartStore.items[0].quantity).toBe(2);
  expect(cartStore.getTotalItems()).toBe(2);
  expect(cartStore.getTotalPrice()).toBe(79.80);
  
  // Atualizar quantidade
  cartStore.updateQuantity(1, 3);
  expect(cartStore.items[0].quantity).toBe(3);
  expect(cartStore.getTotalItems()).toBe(3);
  expect(cartStore.getTotalPrice()).toBe(119.70);
  
  // Remover produto
  cartStore.removeItem(1);
  expect(cartStore.items.length).toBe(0);
  expect(cartStore.getTotalItems()).toBe(0);
  expect(cartStore.getTotalPrice()).toBe(0);
});

// Testes para produtos
test('Produtos: filtrar e buscar', () => {
  const productsStore = useProductsStore.getState();
  
  // Verificar produtos iniciais
  expect(productsStore.products.length).toBeGreaterThan(0);
  
  // Filtrar por categoria
  const tintasSpray = productsStore.getProductsByCategory('Tintas Spray');
  expect(tintasSpray.length).toBeGreaterThan(0);
  expect(tintasSpray.every(p => p.category === 'Tintas Spray')).toBe(true);
  
  // Filtrar por marca
  const montanaProducts = productsStore.getProductsByBrand('Montana');
  expect(montanaProducts.length).toBeGreaterThan(0);
  expect(montanaProducts.every(p => p.brand === 'Montana')).toBe(true);
  
  // Buscar produtos
  const searchResults = productsStore.searchProducts('black');
  expect(searchResults.length).toBeGreaterThan(0);
  expect(searchResults.some(p => p.name.toLowerCase().includes('black'))).toBe(true);
});

// Testes para usuários e endereços
test('Usuário: adicionar e gerenciar endereços', () => {
  const userStore = useUserStore.getState();
  
  // Limpar endereços existentes
  userStore.addresses.forEach(address => {
    userStore.removeAddress(address.id);
  });
  
  // Adicionar endereço
  userStore.addAddress({
    name: 'Casa',
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    complement: 'Apto 101'
  }, true);
  
  expect(userStore.addresses.length).toBe(1);
  expect(userStore.addresses[0].isDefault).toBe(true);
  
  // Adicionar segundo endereço
  userStore.addAddress({
    name: 'Trabalho',
    street: 'Av. Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    complement: 'Sala 1010'
  });
  
  expect(userStore.addresses.length).toBe(2);
  expect(userStore.addresses[1].isDefault).toBe(false);
  
  // Definir segundo endereço como padrão
  userStore.setDefaultAddress(userStore.addresses[1].id);
  expect(userStore.addresses[0].isDefault).toBe(false);
  expect(userStore.addresses[1].isDefault).toBe(true);
  
  // Remover endereço
  userStore.removeAddress(userStore.addresses[0].id);
  expect(userStore.addresses.length).toBe(1);
});

// Testes para entrega
test('Entrega: verificar disponibilidade e calcular frete', () => {
  const deliveryStore = useDeliveryStore.getState();
  
  // Verificar CEP disponível
  expect(deliveryStore.isDeliveryAvailable('01234-567')).toBe(true);
  
  // Calcular frete abaixo do limite para frete grátis
  const freightBelow = deliveryStore.calculateDeliveryFee(50, '01234-567');
  expect(freightBelow).toBe(deliveryStore.deliveryFee);
  
  // Calcular frete acima do limite para frete grátis
  const freightAbove = deliveryStore.calculateDeliveryFee(150, '01234-567');
  expect(freightAbove).toBe(0);
  
  // Tempo estimado de entrega
  const estimatedTime = deliveryStore.getEstimatedDeliveryTime('01234-567');
  expect(estimatedTime).toBe(deliveryStore.estimatedDeliveryTime);
});

// Testes para pagamento
test('Pagamento: adicionar e gerenciar métodos de pagamento', () => {
  const paymentStore = usePaymentStore.getState();
  
  // Limpar métodos existentes
  paymentStore.methods.forEach(method => {
    paymentStore.removePaymentMethod(method.id);
  });
  
  // Adicionar cartão de crédito
  paymentStore.addPaymentMethod({
    type: 'credit_card',
    name: 'Cartão Principal',
    details: {
      cardNumber: '4111111111111111',
      cardHolder: 'João Silva',
      expiryDate: '12/28',
      brand: 'Visa',
      lastDigits: '1111'
    }
  }, true);
  
  expect(paymentStore.methods.length).toBe(1);
  expect(paymentStore.methods[0].isDefault).toBe(true);
  expect(paymentStore.methods[0].type).toBe('credit_card');
  
  // Adicionar PIX
  paymentStore.addPaymentMethod({
    type: 'pix',
    name: 'PIX',
    details: {}
  });
  
  expect(paymentStore.methods.length).toBe(2);
  expect(paymentStore.methods[1].isDefault).toBe(false);
  expect(paymentStore.methods[1].type).toBe('pix');
  
  // Definir PIX como padrão
  paymentStore.setDefaultPaymentMethod(paymentStore.methods[1].id);
  expect(paymentStore.methods[0].isDefault).toBe(false);
  expect(paymentStore.methods[1].isDefault).toBe(true);
  
  // Remover método de pagamento
  paymentStore.removePaymentMethod(paymentStore.methods[0].id);
  expect(paymentStore.methods.length).toBe(1);
});

// Testes para notificações
test('Notificações: adicionar e gerenciar notificações', () => {
  const notificationStore = useNotificationStore.getState();
  
  // Limpar notificações existentes
  notificationStore.clearAllNotifications();
  
  // Adicionar notificação
  notificationStore.addNotification({
    type: 'info',
    title: 'Bem-vindo',
    message: 'Bem-vindo ao Spray Delivery!'
  });
  
  expect(notificationStore.notifications.length).toBe(1);
  expect(notificationStore.notifications[0].read).toBe(false);
  expect(notificationStore.getUnreadCount()).toBe(1);
  
  // Marcar como lida
  notificationStore.markAsRead(notificationStore.notifications[0].id);
  expect(notificationStore.notifications[0].read).toBe(true);
  expect(notificationStore.getUnreadCount()).toBe(0);
  
  // Adicionar mais notificações
  notificationStore.addNotification({
    type: 'success',
    title: 'Pedido confirmado',
    message: 'Seu pedido foi confirmado com sucesso!'
  });
  
  notificationStore.addNotification({
    type: 'warning',
    title: 'Estoque baixo',
    message: 'Alguns produtos estão com estoque baixo.'
  });
  
  expect(notificationStore.notifications.length).toBe(3);
  expect(notificationStore.getUnreadCount()).toBe(2);
  
  // Marcar todas como lidas
  notificationStore.markAllAsRead();
  expect(notificationStore.getUnreadCount()).toBe(0);
  
  // Remover notificação
  notificationStore.removeNotification(notificationStore.notifications[0].id);
  expect(notificationStore.notifications.length).toBe(2);
});

// Testes para autenticação
test('Autenticação: registro, login e logout', async () => {
  // Limpar localStorage
  localStorage.clear();
  
  // Registrar usuário
  const newUser = await registerUser(
    'João Silva',
    'joao.silva@email.com',
    'senha123',
    '(11) 99999-9999'
  );
  
  expect(newUser).not.toBeNull();
  expect(newUser?.name).toBe('João Silva');
  expect(newUser?.email).toBe('joao.silva@email.com');
  
  // Logout
  logoutUser();
  expect(localStorage.getItem('user')).toBeNull();
  
  // Login
  const loggedUser = await loginUser('joao.silva@email.com', 'senha123');
  expect(loggedUser).not.toBeNull();
  expect(loggedUser?.email).toBe('joao.silva@email.com');
  
  // Login com senha incorreta
  const failedLogin = await loginUser('joao.silva@email.com', 'senha_errada');
  expect(failedLogin).toBeNull();
});

// Testes para admin
test('Admin: estatísticas e relatórios', () => {
  const adminStore = useAdminStore.getState();
  const userStore = useUserStore.getState();
  
  // Criar pedidos de teste
  const orders = [
    {
      id: 'ORD123',
      date: new Date('2025-04-01'),
      status: 'delivered',
      items: [
        { productId: 1, name: 'Montana Black 400ml', price: 39.90, quantity: 2 },
        { productId: 3, name: 'Ironlak 400ml', price: 45.90, quantity: 1 }
      ],
      address: userStore.addresses[0],
      paymentMethod: 'credit_card',
      subtotal: 125.70,
      deliveryFee: 0,
      total: 125.70
    },
    {
      id: 'ORD124',
      date: new Date('2025-04-10'),
      status: 'delivered',
      items: [
        { productId: 2, name: 'Colorgin Arte Urbana 400ml', price: 29.90, quantity: 3 }
      ],
      address: userStore.addresses[0],
      paymentMethod: 'pix',
      subtotal: 89.70,
      deliveryFee: 15.90,
      total: 105.60
    },
    {
      id: 'ORD125',
      date: new Date('2025-04-15'),
      status: 'processing',
      items: [
        { productId: 1, name: 'Montana Black 400ml', price: 39.90, quantity: 1 },
        { productId: 8, name: 'Cap Fat', price: 5.90, quantity: 5 }
      ],
      address: userStore.addresses[0],
      paymentMethod: 'credit_card',
      subtotal: 69.40,
      deliveryFee: 15.90,
      total: 85.30
    }
  ];
  
  // Atualizar estatísticas
  adminStore.updateStats(orders as any);
  expect(adminStore.totalOrders).toBe(3);
  expect(adminStore.totalSales).toBe(125.70 + 105.60 + 85.30);
  expect(adminStore.activeOrders).toBe(1);
  
  // Produtos mais vendidos
  const topProducts = adminStore.getTopSellingProducts(orders as any);
  expect(topProducts.length).toBeGreaterThan(0);
  expect(topProducts[0].productId).toBe(1); // Montana Black tem maior receita
  
  // Vendas por período
  const salesByMonth = adminStore.getSalesByPeriod(orders as any, 'month');
  expect(salesByMonth.length).toBe(1); // Todos os pedidos são do mesmo mês
  expect(salesByMonth[0].sales).toBe(125.70 + 105.60 + 85.30);
});
