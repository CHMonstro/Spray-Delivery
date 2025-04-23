import { ProductCard } from '@/components/produtos/ProductCard';

export default function HomePage() {
  // Dados simulados de produtos em destaque
  const featuredProducts = [
    {
      id: 1,
      name: 'Montana Black 400ml',
      price: 39.90,
      image: '/images/products/montana-black.jpg',
      color: 'Preto',
      brand: 'Montana',
    },
    {
      id: 2,
      name: 'Colorgin Arte Urbana 400ml',
      price: 29.90,
      image: '/images/products/colorgin-arte-urbana.jpg',
      color: 'Azul',
      brand: 'Colorgin',
    },
    {
      id: 3,
      name: 'Ironlak 400ml',
      price: 45.90,
      image: '/images/products/ironlak.jpg',
      color: 'Vermelho',
      brand: 'Ironlak',
    },
    {
      id: 4,
      name: 'MTN 94 400ml',
      price: 42.90,
      image: '/images/products/mtn-94.jpg',
      color: 'Verde',
      brand: 'MTN',
    },
  ];

  // Dados simulados de categorias
  const categories = [
    { id: 1, name: 'Tintas Spray', image: '/images/categories/tintas-spray.jpg' },
    { id: 2, name: 'Marcadores', image: '/images/categories/marcadores.jpg' },
    { id: 3, name: 'Caps', image: '/images/categories/caps.jpg' },
    { id: 4, name: 'Acessórios', image: '/images/categories/acessorios.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 mb-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tintas spray no conforto da sua casa
          </h1>
          <p className="text-xl mb-6">
            Receba as melhores tintas spray para arte urbana, grafite e personalização em até 30 minutos.
          </p>
          <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-full hover:bg-purple-100 transition">
            Comprar agora
          </button>
        </div>
      </section>

      {/* Categorias */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-32 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Marcas */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Nossas Marcas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">Montana</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">Colorgin</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">Ironlak</span>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">MTN</span>
          </div>
        </div>
      </section>

      {/* Banner de Promoção */}
      <section className="bg-yellow-400 rounded-2xl p-8 mb-12 text-gray-900">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">
            Promoção de Lançamento!
          </h2>
          <p className="text-xl mb-6">
            Use o cupom <span className="font-bold">SPRAY10</span> e ganhe 10% de desconto na primeira compra.
          </p>
          <button className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition">
            Aproveitar agora
          </button>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-700 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Escolha seus produtos</h3>
            <p className="text-gray-600">
              Navegue pelo nosso catálogo e adicione os produtos ao carrinho.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-700 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Faça seu pedido</h3>
            <p className="text-gray-600">
              Confirme seu endereço e escolha a forma de pagamento.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-700 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Receba em casa</h3>
            <p className="text-gray-600">
              Acompanhe seu pedido e receba em até 30 minutos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
