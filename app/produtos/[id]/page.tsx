import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';

// Produto simulado
const produto = {
  id: 1,
  name: 'Montana Black 400ml',
  price: 39.90,
  image: '/images/products/montana-black.jpg',
  color: 'Preto',
  brand: 'Montana',
  description: 'Tinta spray de alta pressão para graffiti e arte urbana. Acabamento fosco e alta cobertura. Ideal para trabalhos em paredes, madeira, metal e outras superfícies. Secagem rápida e resistente às intempéries.',
  category: 'Tintas Spray',
  stock: 50,
  rating: 4.8
};

// Produtos relacionados
const produtosRelacionados = [
  {
    id: 5,
    name: 'Montana Gold 400ml',
    price: 49.90,
    image: '/images/products/montana-gold.jpg',
    color: 'Amarelo',
    brand: 'Montana',
    category: 'Tintas Spray',
  },
  {
    id: 8,
    name: 'Cap Fat',
    price: 5.90,
    image: '/images/products/cap-fat.jpg',
    color: 'Preto',
    brand: 'Universal',
    category: 'Caps',
  },
  {
    id: 3,
    name: 'Ironlak 400ml',
    price: 45.90,
    image: '/images/products/ironlak.jpg',
    color: 'Vermelho',
    brand: 'Ironlak',
    category: 'Tintas Spray',
  }
];

export default function ProdutoDetalhe({ params }: { params: { id: string } }) {
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQuantidade = () => {
    if (quantidade < produto.stock) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegação */}
      <div className="mb-6">
        <Link href="/produtos" className="flex items-center text-purple-600 hover:text-purple-800 transition">
          <ChevronLeft size={20} />
          <span>Voltar para produtos</span>
        </Link>
      </div>

      {/* Detalhes do Produto */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Imagem do Produto */}
          <div className="bg-gray-100 rounded-lg h-80 md:h-96 flex items-center justify-center">
            {/* Placeholder para imagem do produto */}
            <div className="text-gray-400 text-center p-4">
              <div className="text-6xl mb-2">🖼️</div>
              <p>Imagem do produto</p>
            </div>
          </div>

          {/* Informações do Produto */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {produto.category}
              </span>
              <span className="ml-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {produto.brand}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{produto.name}</h1>
            
            {/* Avaliação */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(produto.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">{produto.rating} ({Math.floor(Math.random() * 100) + 50} avaliações)</span>
            </div>
            
            {/* Preço */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-purple-700">R$ {produto.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500 ml-2">à vista</span>
              <p className="text-sm text-gray-600 mt-1">ou 3x de R$ {(produto.price / 3).toFixed(2)} sem juros</p>
            </div>
            
            {/* Cor */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Cor: {produto.color}</h3>
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-purple-500" 
                  style={{ backgroundColor: produto.color.toLowerCase() }}
                ></div>
              </div>
            </div>
            
            {/* Quantidade */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantidade:</h3>
              <div className="flex items-center">
                <button 
                  onClick={diminuirQuantidade}
                  className="bg-gray-200 text-gray-600 p-2 rounded-l-lg hover:bg-gray-300 transition"
                  disabled={quantidade <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="bg-gray-100 py-2 px-6 text-center">{quantidade}</span>
                <button 
                  onClick={aumentarQuantidade}
                  className="bg-gray-200 text-gray-600 p-2 rounded-r-lg hover:bg-gray-300 transition"
                  disabled={quantidade >= produto.stock}
                >
                  <Plus size={20} />
                </button>
                <span className="ml-4 text-sm text-gray-600">
                  {produto.stock} unidades disponíveis
                </span>
              </div>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition flex items-center justify-center">
                <ShoppingCart size={20} className="mr-2" />
                Adicionar ao Carrinho
              </button>
              <button className="flex-1 border border-purple-600 text-purple-600 py-3 px-6 rounded-lg hover:bg-purple-50 transition flex items-center justify-center">
                <Heart size={20} className="mr-2" />
                Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>
        
        {/* Descrição do Produto */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Descrição</h2>
          <p className="text-gray-700 leading-relaxed">{produto.description}</p>
        </div>
        
        {/* Especificações */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Especificações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Informações Gerais</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Marca:</span>
                  <span className="font-medium">{produto.brand}</span>
                </li>
                <li className="flex justify-between">
                  <span>Categoria:</span>
                  <span className="font-medium">{produto.category}</span>
                </li>
                <li className="flex justify-between">
                  <span>Cor:</span>
                  <span className="font-medium">{produto.color}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Características</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Volume:</span>
                  <span className="font-medium">400ml</span>
                </li>
                <li className="flex justify-between">
                  <span>Acabamento:</span>
                  <span className="font-medium">Fosco</span>
                </li>
                <li className="flex justify-between">
                  <span>Secagem:</span>
                  <span className="font-medium">Rápida</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Produtos Relacionados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {produtosRelacionados.map((produto) => (
            <div key={produto.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder para imagem do produto */}
                <div className="absolute bottom-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1">
                  {produto.brand}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{produto.name}</h3>
                <div className="flex items-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full mr-1 border border-gray-300" 
                    style={{ backgroundColor: produto.color.toLowerCase() }}
                  ></div>
                  <span className="text-sm text-gray-600">{produto.color}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-700">
                    R$ {produto.price.toFixed(2)}
                  </span>
                  <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
