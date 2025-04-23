-- Inicialização do banco de dados para o aplicativo Spray Delivery
-- Este script cria as tabelas necessárias para o funcionamento do aplicativo

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de endereços
CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Tabela de métodos de pagamento
CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  card_number TEXT,
  card_holder TEXT,
  expiry_date TEXT,
  brand TEXT,
  last_digits TEXT,
  is_default BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Tabela de categorias de produtos
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de marcas
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT,
  color TEXT,
  brand_id INTEGER,
  category_id INTEGER,
  stock INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands (id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  address_id INTEGER NOT NULL,
  payment_method_id TEXT NOT NULL,
  subtotal REAL NOT NULL,
  delivery_fee REAL NOT NULL,
  total REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES addresses (id) ON DELETE RESTRICT,
  FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id) ON DELETE RESTRICT
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Tabela de configurações de entrega
CREATE TABLE IF NOT EXISTS delivery_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  zip_code TEXT NOT NULL,
  delivery_fee REAL NOT NULL,
  estimated_time INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações do aplicativo
CREATE TABLE IF NOT EXISTS app_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações iniciais do aplicativo
INSERT OR IGNORE INTO app_settings (key, value) VALUES
  ('free_delivery_threshold', '100.00'),
  ('default_delivery_fee', '15.90'),
  ('default_delivery_time', '30'),
  ('app_name', 'Spray Delivery'),
  ('app_version', '1.0.0');

-- Inserir categorias iniciais
INSERT OR IGNORE INTO categories (name, description) VALUES
  ('Tintas Spray', 'Tintas spray para graffiti e arte urbana'),
  ('Marcadores', 'Marcadores e canetas para arte urbana'),
  ('Caps', 'Caps e bicos para personalização de traços'),
  ('Acessórios', 'Acessórios para arte urbana e graffiti');

-- Inserir marcas iniciais
INSERT OR IGNORE INTO brands (name) VALUES
  ('Montana'),
  ('Colorgin'),
  ('Ironlak'),
  ('MTN'),
  ('Posca'),
  ('Universal');

-- Inserir produtos iniciais
INSERT OR IGNORE INTO products (name, description, price, color, brand_id, category_id, stock, rating) VALUES
  ('Montana Black 400ml', 'Tinta spray de alta pressão para graffiti e arte urbana. Acabamento fosco e alta cobertura.', 39.90, 'Preto', 1, 1, 50, 4.8),
  ('Colorgin Arte Urbana 400ml', 'Tinta spray para graffiti e arte urbana com secagem rápida e ótima cobertura.', 29.90, 'Azul', 2, 1, 45, 4.5),
  ('Ironlak 400ml', 'Tinta spray premium para graffiti com baixo odor e fórmula à base de água.', 45.90, 'Vermelho', 3, 1, 30, 4.7),
  ('MTN 94 400ml', 'Tinta spray de baixa pressão para trabalhos detalhados e precisos.', 42.90, 'Verde', 4, 1, 25, 4.9),
  ('Montana Gold 400ml', 'Tinta spray premium com acabamento brilhante e alta pigmentação.', 49.90, 'Amarelo', 1, 1, 35, 4.6),
  ('Colorgin Arte Urbana 400ml', 'Tinta spray para graffiti e arte urbana com secagem rápida e ótima cobertura.', 29.90, 'Laranja', 2, 1, 40, 4.5),
  ('Posca PC-5M', 'Marcador à base de água para diversas superfícies, ponta média.', 24.90, 'Branco', 5, 2, 60, 4.8),
  ('Cap Fat', 'Cap para spray com traço largo, ideal para preenchimentos.', 5.90, 'Preto', 6, 3, 100, 4.3);

-- Inserir configurações de entrega iniciais
INSERT OR IGNORE INTO delivery_settings (zip_code, delivery_fee, estimated_time) VALUES
  ('01000000', 15.90, 30),
  ('01100000', 15.90, 30),
  ('01200000', 15.90, 30),
  ('01300000', 15.90, 30),
  ('01400000', 15.90, 30),
  ('02000000', 15.90, 35),
  ('02100000', 15.90, 35),
  ('02200000', 15.90, 35),
  ('02300000', 15.90, 35),
  ('02400000', 15.90, 35),
  ('03000000', 15.90, 40),
  ('03100000', 15.90, 40),
  ('03200000', 15.90, 40),
  ('03300000', 15.90, 40),
  ('03400000', 15.90, 40),
  ('04000000', 15.90, 45),
  ('04100000', 15.90, 45),
  ('04200000', 15.90, 45),
  ('04300000', 15.90, 45),
  ('04400000', 15.90, 45),
  ('05000000', 15.90, 50),
  ('05100000', 15.90, 50),
  ('05200000', 15.90, 50),
  ('05300000', 15.90, 50),
  ('05400000', 15.90, 50);
