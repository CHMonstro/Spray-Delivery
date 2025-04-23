'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

// Dados simulados do carrinho
const itensCarrinho = [
  {
    id: 1,
    name: 'Montana Black 400ml',
    price: 39.90,
    image: '/images/products/montana-black.jpg',
    color: 'Preto',
    brand: 'Montana',
    quantity: 2
  },
  {
    id: 3,
    name: 'Ironlak 400ml',
    price: 45.90,
    image: '/images/products/ironlak.jpg',
    color: 'Vermelho',
    brand: 'Ironlak',
    quantity: 1
  },
  {
    id: 8,
    name: 'Cap Fat',
    price: 5.90,
    image: '/images/products/cap-fat.jpg',
    color: 'Preto',
    brand: 'Universal',
    quantity: 3
  }
];

export default function CarrinhoPage() {
  const [itens, setItens] = useState(itensCarrinho);

  const subtotal = itens.reduce((total, item) => total + (item.price * item.quantity), 0);
  const frete = subtotal > 100 ? 0 : 15.90;
  const total = subtotal + frete;

  const removerItem = (id: number) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    setItens(itens.map(item =>
      item.id === id ? { ...item, quantity: novaQuantidade } : item
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Meu Carrinho</h1>

      {itens.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Itens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Itens do Carrinho ({itens.length})</h2>

                <div className="divide-y divide-gray-200">
                  {itens.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                      {/* Imagem do Produto */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="flex-shrink-0 w-full sm:w-24 h-24 rounded-md object-cover mb-4 sm:mb-0"
                      />

                      {/* Detalhes do Produto */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.brand} • {item.color}
                            </p>
                            <div className="flex items-center mb-4 sm:mb-0">
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => atualizarQuantidade(item.id, item.quantity - 1)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                              </button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => atualizarQuantidade(item.id, item.quantity + 1)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-lg font-bold text-purple-700">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                              R$ {item.price.toFixed(2)} cada
                            </span>
                            <button
                              className="text-red-500 hover:text-red-700 mt-2 flex items-center text-sm"
                              onClick={() => removerItem(item.id)}
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continuar Comprando */}
            <Link href="/produtos" className="text-purple-600 hover:text-purple-800 flex items-center">
              <ShoppingBag size={20} className="mr-2" />
              Continuar comprando
            </Link>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>{frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}</span>
                  </div>

                  {frete > 0 && (
                    <div className="text-sm text-gray-500">
                      Falta R$ {(100 - subtotal).toFixed(2)} para frete grátis
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-purple-700">R$ {total.toFixed(2)}</span>
                  </div>

                  {/* Cupom de Desconto */}
                  <div className="pt-4">
                    <label htmlFor="cupom" className="block text-sm font-medium text-gray-700 mb-1">
                      Cupom de Desconto
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="cupom"
                        placeholder="Digite seu cupom"
                        className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button className="bg-gray-200 text-gray-800 px-4 rounded-r-lg hover:bg-gray-300 transition">
                        Aplicar
                      </button>
                    </div>
                  </div>

                  {/* Botão de Checkout */}
                  <Link
                    href="/checkout"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center mt-6"
                  >
                    Finalizar Compra
                    <ArrowRight size={20} className="ml-2" />
                  </Link>

                  {/* Métodos de Pagamento */}
                  <div className="pt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">Aceitamos</p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Link
            href="/produtos"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition inline-flex items-center"
          >
            <ShoppingBag size={20} className="mr-2" />
            Explorar produtos
          </Link>
        </div>
      )}
    </div>
  );
}
