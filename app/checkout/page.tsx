import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, MapPin, Truck, Check } from 'lucide-react';

export default function CheckoutPage() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  
  // Dados simulados
  const enderecos = [
    {
      id: 1,
      nome: 'Casa',
      rua: 'Rua das Flores, 123',
      bairro: 'Jardim Primavera',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      complemento: 'Apto 101',
      principal: true
    },
    {
      id: 2,
      nome: 'Trabalho',
      rua: 'Av. Paulista, 1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-100',
      complemento: 'Sala 1010',
      principal: false
    }
  ];
  
  // Itens do carrinho (simulados)
  const itensCarrinho = [
    {
      id: 1,
      name: 'Montana Black 400ml',
      price: 39.90,
      color: 'Preto',
      brand: 'Montana',
      quantity: 2
    },
    {
      id: 3,
      name: 'Ironlak 400ml',
      price: 45.90,
      color: 'Vermelho',
      brand: 'Ironlak',
      quantity: 1
    },
    {
      id: 8,
      name: 'Cap Fat',
      price: 5.90,
      color: 'Preto',
      brand: 'Universal',
      quantity: 3
    }
  ];
  
  // Calcular subtotal
  const subtotal = itensCarrinho.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Valor do frete (simulado)
  const frete = subtotal > 100 ? 0 : 15.90;
  
  // Total
  const total = subtotal + frete;
  
  // Avançar para próxima etapa
  const avancarEtapa = () => {
    if (etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1);
    }
  };
  
  // Voltar para etapa anterior
  const voltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/carrinho" className="text-purple-600 hover:text-purple-800 flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          Voltar para o carrinho
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      {/* Progresso */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${etapaAtual >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <MapPin size={20} />
            </div>
            <span className="text-sm mt-2">Endereço</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${etapaAtual >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${etapaAtual >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <Truck size={20} />
            </div>
            <span className="text-sm mt-2">Entrega</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${etapaAtual >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${etapaAtual >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <CreditCard size={20} />
            </div>
            <span className="text-sm mt-2">Pagamento</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Checkout */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            {/* Etapa 1: Endereço */}
            {etapaAtual === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
                
                <div className="space-y-4">
                  {enderecos.map((endereco) => (
                    <div 
                      key={endereco.id}
                      className={`border rounded-lg p-4 cursor-pointer ${enderecoSelecionado === endereco.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                      onClick={() => setEnderecoSelecionado(endereco.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{endereco.nome}</h3>
                            {endereco.principal && (
                              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{endereco.rua}</p>
                          <p className="text-gray-600">{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                          <p className="text-gray-600">CEP: {endereco.cep}</p>
                          {endereco.complemento && (
                            <p className="text-gray-600">Complemento: {endereco.complemento}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                          {enderecoSelecionado === endereco.id && (
                            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:bg-gray-50 transition flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Adicionar novo endereço
                  </button>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button 
                    className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
                    onClick={avancarEtapa}
                  >
                    Continuar para Entrega
                  </button>
                </div>
              </div>
            )}
            
            {/* Etapa 2: Entrega */}
            {etapaAtual === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Opções de Entrega</h2>
                
                <div className="space-y-4">
                  <div className="border border-purple-600 bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">Entrega Expressa</h3>
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Mais rápida
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">Receba em até 30 minutos</p>
                        <p className="text-gray-600">Entrega realizada por motoboy</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="font-semibold">{frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}</span>
                        {frete > 0 && (
                          <span className="text-xs text-gray-500">
                            Grátis para compras acima de R$ 100,00
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 cursor-not-allowed opacity-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Entrega Padrão</h3>
                        <p className="text-gray-600 mt-1">Receba em até 2 dias úteis</p>
                        <p className="text-gray-600">Entrega realizada pelos Correios</p>
                      </div>
                      
                      <span className="font-semibold">R$ 12,90</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 cursor-not-allowed opacity-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Retirada na Loja</h3>
                        <p className="text-gray-600 mt-1">Disponível para retirada em 1 hora</p>
                        <p className="text-gray-600">Av. Paulista, 1000 - São Paulo, SP</p>
                      </div>
                      
                      <span className="font-semibold">Grátis</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button 
                    className="text-purple-600 py-3 px-6 rounded-lg hover:bg-purple-50 transition"
                    onClick={voltarEtapa}
                  >
                    Voltar
                  </button>
                  <button 
                    className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
                    onClick={avancarEtapa}
                  >
                    Continuar para Pagamento
                  </button>
                </div>
              </div>
            )}
            
            {/* Etapa 3: Pagamento */}
            {etapaAtual === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
                
                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${metodoPagamento === 'cartao' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                    onClick={() => setMetodoPagamento('cartao')}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold">Cartão de Crédito</h3>
                          <p className="text-gray-600 text-sm">Visa, Mastercard, Elo, American Express</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                        {metodoPagamento === 'cartao' && (
                          <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                        )}
                      </div>
                    </div>
                    
                    {metodoPagamento === 'cartao' && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="numero-cartao" className="block text-sm font-medium text-gray-700 mb-1">
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            id="numero-cartao"
                            placeholder="0000 0000 0000 0000"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="validade" className="block text-sm font-medium text-gray-700 mb-1">
                              Validade
                            </label>
                            <input
                              type="text"
                              id="validade"
                              placeholder="MM/AA"
                              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="nome-cartao" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            id="nome-cartao"
                            placeholder="Como está impresso no cartão"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="parcelas" className="block text-sm font-medium text-gray-700 mb-1">
                            Parcelas
                          </label>
                          <select
                            id="parcelas"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="1">1x de R$ {total.toFixed(2)} sem juros</option>
                            <option value="2">2x de R$ {(total / 2).toFixed(2)} sem juros</option>
                            <option value="3">3x de R$ {(total / 3).toFixed(2)} sem juros</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${metodoPagamento === 'pix' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                    onClick={() => setMetodoPagamento('pix')}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 4.5L16.5 4.5L16.5 7.5L7.5 7.5L7.5 4.5Z" fill="currentColor" />
                            <path d="M7.5 16.5L16.5 16.5L16.5 19.5L7.5 19.5L7.5 16.5Z" fill="currentColor" />
                            <path d="M4.5 7.5L7.5 7.5L7.5 16.5L4.5 16.5L4.5 7.5Z" fill="currentColor" />
                            <path d="M16.5 7.5L19.5 7.5L19.5 16.5L16.5 16.5L16.5 7.5Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold">Pix</h3>
                          <p className="text-gray-600 text-sm">Pagamento instantâneo</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                        {metodoPagamento === 'pix' && (
                          <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                        )}
                      </div>
                    </div>
                    
                    {metodoPagamento === 'pix' && (
                      <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-4">
                          Ao finalizar a compra, você receberá um QR Code para pagamento.
                        </p>
                        <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                          <span className="text-gray-500">QR Code Pix</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${metodoPagamento === 'dinheiro' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                    onClick={() => setMetodoPagamento('dinheiro')}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold">Dinheiro</h3>
                          <p className="text-gray-600 text-sm">Pagamento na entrega</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
                        {metodoPagamento === 'dinheiro' && (
                          <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                        )}
                      </div>
                    </div>
                    
                    {metodoPagamento === 'dinheiro' && (
                      <div className="mt-4">
                        <label htmlFor="troco" className="block text-sm font-medium text-gray-700 mb-1">
                          Troco para
                        </label>
                        <input
                          type="text"
                          id="troco"
                          placeholder="R$ 0,00"
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button 
                    className="text-purple-600 py-3 px-6 rounded-lg hover:bg-purple-50 transition"
                    onClick={voltarEtapa}
                  >
                    Voltar
                  </button>
                  <Link 
                    href="/pedido-confirmado"
                    className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
                  >
                    Finalizar Pedido
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              
              <div className="divide-y divide-gray-200">
                {/* Itens */}
                <div className="py-4">
                  <h3 className="font-medium mb-2">Itens ({itensCarrinho.reduce((total, item) => total + item.quantity, 0)})</h3>
                  <ul className="space-y-2">
                    {itensCarrinho.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Valores */}
                <div className="py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span>{frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="py-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-purple-700">R$ {total.toFixed(2)}</span>
                  </div>
                  
                  {metodoPagamento === 'cartao' && (
                    <p className="text-sm text-gray-500 mt-1">
                      ou em até 3x de R$ {(total / 3).toFixed(2)} sem juros
                    </p>
                  )}
                </div>
              </div>
              
              {/* Endereço */}
              {etapaAtual > 1 && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Endereço de Entrega</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {enderecos.find(e => e.id === enderecoSelecionado)?.rua}
                      </p>
                      <p className="text-sm text-gray-600">
                        {enderecos.find(e => e.id === enderecoSelecionado)?.bairro}, 
                        {enderecos.find(e => e.id === enderecoSelecionado)?.cidade} - 
                        {enderecos.find(e => e.id === enderecoSelecionado)?.estado}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Entrega */}
              {etapaAtual > 2 && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Truck size={20} className="text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Entrega Expressa</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Receba em até 30 minutos
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
