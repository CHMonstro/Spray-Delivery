import { useState } from 'react';
import { Product } from '@/types/product';

// Dados simulados de produtos
const produtos: Product[] = [
  {
    id: 1,
    name: 'Montana Black 400ml',
    price: 39.90,
    image: '/images/products/montana-black.jpg',
    color: 'Preto',
    brand: 'Montana',
    description: 'Tinta spray de alta pressão para graffiti e arte urbana. Acabamento fosco e alta cobertura.',
    category: 'Tintas Spray',
    stock: 50,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Colorgin Arte Urbana 400ml',
    price: 29.90,
    image: '/images/products/colorgin-arte-urbana.jpg',
    color: 'Azul',
    brand: 'Colorgin',
    description: 'Tinta spray para graffiti e arte urbana com secagem rápida e ótima cobertura.',
    category: 'Tintas Spray',
    stock: 45,
    rating: 4.5
  },
  {
    id: 3,
    name: 'Ironlak 400ml',
    price: 45.90,
    image: '/images/products/ironlak.jpg',
    color: 'Vermelho',
    brand: 'Ironlak',
    description: 'Tinta spray premium para graffiti com baixo odor e fórmula à base de água.',
    category: 'Tintas Spray',
    stock: 30,
    rating: 4.7
  },
  {
    id: 4,
    name: 'MTN 94 400ml',
    price: 42.90,
    image: '/images/products/mtn-94.jpg',
    color: 'Verde',
    brand: 'MTN',
    description: 'Tinta spray de baixa pressão para trabalhos detalhados e precisos.',
    category: 'Tintas Spray',
    stock: 25,
    rating: 4.9
  },
  {
    id: 5,
    name: 'Montana Gold 400ml',
    price: 49.90,
    image: '/images/products/montana-gold.jpg',
    color: 'Amarelo',
    brand: 'Montana',
    description: 'Tinta spray premium com acabamento brilhante e alta pigmentação.',
    category: 'Tintas Spray',
    stock: 35,
    rating: 4.6
  },
  {
    id: 6,
    name: 'Colorgin Arte Urbana 400ml',
    price: 29.90,
    image: '/images/products/colorgin-arte-urbana-2.jpg',
    color: 'Laranja',
    brand: 'Colorgin',
    description: 'Tinta spray para graffiti e arte urbana com secagem rápida e ótima cobertura.',
    category: 'Tintas Spray',
    stock: 40,
    rating: 4.5
  },
  {
    id: 7,
    name: 'Posca PC-5M',
    price: 24.90,
    image: '/images/products/posca.jpg',
    color: 'Branco',
    brand: 'Posca',
    description: 'Marcador à base de água para diversas superfícies, ponta média.',
    category: 'Marcadores',
    stock: 60,
    rating: 4.8
  },
  {
    id: 8,
    name: 'Cap Fat',
    price: 5.90,
    image: '/images/products/cap-fat.jpg',
    color: 'Preto',
    brand: 'Universal',
    description: 'Cap para spray com traço largo, ideal para preenchimentos.',
    category: 'Caps',
    stock: 100,
    rating: 4.3
  }
];

// Filtros disponíveis
const marcas = ['Todas', 'Montana', 'Colorgin', 'Ironlak', 'MTN', 'Posca', 'Universal'];
const cores = ['Todas', 'Preto', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Laranja', 'Branco'];
const categorias = ['Todas', 'Tintas Spray', 'Marcadores', 'Caps'];

export default function ProdutosPage() {
  const [filtroMarca, setFiltroMarca] = useState('Todas');
  const [filtroCor, setFiltroCor] = useState('Todas');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [termoBusca, setTermoBusca] = useState('');

  // Filtragem de produtos
  const produtosFiltrados = produtos.filter(produto => {
    const matchMarca = filtroMarca === 'Todas' || produto.brand === filtroMarca;
    const matchCor = filtroCor === 'Todas' || produto.color === filtroCor;
    const matchCategoria = filtroCategoria === 'Todas' || produto.category === filtroCategoria;
    const matchBusca = termoBusca === '' || 
      produto.name.toLowerCase().includes(termoBusca.toLowerCase()) || 
      produto.brand.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchMarca && matchCor && matchCategoria && matchBusca;
  });

  // Ordenação de produtos
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    switch (ordenacao) {
      case 'preco-menor':
        return a.price - b.price;
      case 'preco-maior':
        return b.price - a.price;
      case 'nome-az':
        return a.name.localeCompare(b.name);
      case 'nome-za':
        return b.name.localeCompare(a.name);
      case 'avaliacao':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      
      {/* Barra de busca */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            
            {/* Filtro por Categoria */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categoria</h3>
              <div className="space-y-2">
                {categorias.map((categoria) => (
                  <div key={categoria} className="flex items-center">
                    <input
                      type="radio"
                      id={`categoria-${categoria}`}
                      name="categoria"
                      checked={filtroCategoria === categoria}
                      onChange={() => setFiltroCategoria(categoria)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor={`categoria-${categoria}`}>{categoria}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filtro por Marca */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Marca</h3>
              <div className="space-y-2">
                {marcas.map((marca) => (
                  <div key={marca} className="flex items-center">
                    <input
                      type="radio"
                      id={`marca-${marca}`}
                      name="marca"
                      checked={filtroMarca === marca}
                      onChange={() => setFiltroMarca(marca)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor={`marca-${marca}`}>{marca}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filtro por Cor */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Cor</h3>
              <div className="space-y-2">
                {cores.map((cor) => (
                  <div key={cor} className="flex items-center">
                    <input
                      type="radio"
                      id={`cor-${cor}`}
                      name="cor"
                      checked={filtroCor === cor}
                      onChange={() => setFiltroCor(cor)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor={`cor-${cor}`} className="flex items-center">
                      {cor !== 'Todas' && (
                        <span 
                          className="w-4 h-4 rounded-full mr-2 border border-gray-300" 
                          style={{ backgroundColor: cor.toLowerCase() }}
                        ></span>
                      )}
                      {cor}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Botão para limpar filtros */}
            <button 
              className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              onClick={() => {
                setFiltroMarca('Todas');
                setFiltroCor('Todas');
                setFiltroCategoria('Todas');
                setTermoBusca('');
              }}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
        
        {/* Lista de Produtos */}
        <div className="w-full md:w-3/4">
          {/* Ordenação e contagem */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-2 sm:mb-0">
              {produtosOrdenados.length} produtos encontrados
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Ordenar por:</span>
              <select 
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="relevancia">Relevância</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
                <option value="nome-az">Nome (A-Z)</option>
                <option value="nome-za">Nome (Z-A)</option>
                <option value="avaliacao">Melhor Avaliação</option>
              </select>
            </div>
          </div>
          
          {/* Grid de produtos */}
          {produtosOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtosOrdenados.map((produto) => (
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
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-600 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
              <button 
                className="mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                onClick={() => {
                  setFiltroMarca('Todas');
                  setFiltroCor('Todas');
                  setFiltroCategoria('Todas');
                  setTermoBusca('');
                }}
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
