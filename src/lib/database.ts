// Configuração do banco de dados D1 para o aplicativo Spray Delivery
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { 
  users, 
  addresses, 
  paymentMethods, 
  categories, 
  brands, 
  products, 
  orders, 
  orderItems, 
  notifications, 
  deliverySettings, 
  appSettings 
} from './schema';

// Função para obter o contexto do Cloudflare
export function getCloudflareContext(context: any) {
  return {
    env: context.env,
    db: drizzle(context.env.DB)
  };
}

// Classe para operações com o banco de dados
export class Database {
  private db;

  constructor(db: any) {
    this.db = db;
  }

  // Métodos para usuários
  async getUserByEmail(email: string) {
    return this.db.select().from(users).where(eq(users.email, email)).get();
  }

  async createUser(userData: any) {
    return this.db.insert(users).values(userData).returning().get();
  }

  async updateUser(id: string, userData: any) {
    return this.db.update(users).set(userData).where(eq(users.id, id)).returning().get();
  }

  // Métodos para endereços
  async getAddressesByUserId(userId: string) {
    return this.db.select().from(addresses).where(eq(addresses.userId, userId)).all();
  }

  async createAddress(addressData: any) {
    return this.db.insert(addresses).values(addressData).returning().get();
  }

  async updateAddress(id: number, addressData: any) {
    return this.db.update(addresses).set(addressData).where(eq(addresses.id, id)).returning().get();
  }

  async deleteAddress(id: number) {
    return this.db.delete(addresses).where(eq(addresses.id, id)).returning().get();
  }

  // Métodos para métodos de pagamento
  async getPaymentMethodsByUserId(userId: string) {
    return this.db.select().from(paymentMethods).where(eq(paymentMethods.userId, userId)).all();
  }

  async createPaymentMethod(paymentData: any) {
    return this.db.insert(paymentMethods).values(paymentData).returning().get();
  }

  async updatePaymentMethod(id: string, paymentData: any) {
    return this.db.update(paymentMethods).set(paymentData).where(eq(paymentMethods.id, id)).returning().get();
  }

  async deletePaymentMethod(id: string) {
    return this.db.delete(paymentMethods).where(eq(paymentMethods.id, id)).returning().get();
  }

  // Métodos para produtos
  async getAllProducts() {
    return this.db.select().from(products).all();
  }

  async getProductById(id: number) {
    return this.db.select().from(products).where(eq(products.id, id)).get();
  }

  async getProductsByCategory(categoryId: number) {
    return this.db.select().from(products).where(eq(products.categoryId, categoryId)).all();
  }

  async getProductsByBrand(brandId: number) {
    return this.db.select().from(products).where(eq(products.brandId, brandId)).all();
  }

  // Métodos para categorias
  async getAllCategories() {
    return this.db.select().from(categories).all();
  }

  // Métodos para marcas
  async getAllBrands() {
    return this.db.select().from(brands).all();
  }

  // Métodos para pedidos
  async getOrdersByUserId(userId: string) {
    return this.db.select().from(orders).where(eq(orders.userId, userId)).all();
  }

  async getOrderById(id: string) {
    return this.db.select().from(orders).where(eq(orders.id, id)).get();
  }

  async createOrder(orderData: any) {
    return this.db.insert(orders).values(orderData).returning().get();
  }

  async updateOrderStatus(id: string, status: string) {
    return this.db.update(orders).set({ status }).where(eq(orders.id, id)).returning().get();
  }

  // Métodos para itens de pedido
  async getOrderItemsByOrderId(orderId: string) {
    return this.db.select().from(orderItems).where(eq(orderItems.orderId, orderId)).all();
  }

  async createOrderItems(items: any[]) {
    return this.db.insert(orderItems).values(items).returning().all();
  }

  // Métodos para notificações
  async getNotificationsByUserId(userId: string) {
    return this.db.select().from(notifications).where(eq(notifications.userId, userId)).all();
  }

  async createNotification(notificationData: any) {
    return this.db.insert(notifications).values(notificationData).returning().get();
  }

  async markNotificationAsRead(id: string) {
    return this.db.update(notifications).set({ read: true }).where(eq(notifications.id, id)).returning().get();
  }

  // Métodos para configurações de entrega
  async getDeliverySettingsByZipCode(zipCode: string) {
    return this.db.select().from(deliverySettings).where(eq(deliverySettings.zipCode, zipCode)).get();
  }

  // Métodos para configurações do aplicativo
  async getAppSetting(key: string) {
    return this.db.select().from(appSettings).where(eq(appSettings.key, key)).get();
  }

  async getAllAppSettings() {
    return this.db.select().from(appSettings).all();
  }

  async updateAppSetting(key: string, value: string) {
    return this.db.update(appSettings).set({ value }).where(eq(appSettings.key, key)).returning().get();
  }
}
