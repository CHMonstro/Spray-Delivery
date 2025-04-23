import { useState } from 'react';
import Link from 'next/link';
import { User, Package, CreditCard, Heart, LogOut, Settings } from 'lucide-react';

export default function PerfilPage() {
  const [abaSelecionada, setAbaSelecionada] = useState('dados');
  
  // Dados simulados do usuário
  const usuario = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    dataCadastro: '10/01/2025'
  };
  
  // Dados simulados de pedidos
  const pedidos = [
    {
      id: 'PED123456',
      data: '15/04/2025',
      status: 'Entregue',
      total: 125.60,
      itens: [
        { id: 1, nome: 'Montana Black 400ml', quantidade: 2, preco: 39.90 },
        { id: 3, nome: 'Ironlak 400ml', quantidade: 1, preco: 45.90 }
      ]
    },
    {
      id: 'PED123455',
      data: '02/04/2025',
      status: 'Entregue',
      total: 89.70,
      itens: [
        { id: 2, nome: 'Colorgin Arte Urbana 400ml', quantidade: 3, preco: 29.90 }
      ]
    },
    {
      id: 'PED123454',
      data: '20/03/2025',
      status: 'Cancelado',
      total: 45.90,
      itens: [
        { id: 3, nome: 'Ironlak 400ml', quantidade: 1, preco: 45.90 }
      ]
    }
  ];
  
  // Dados simulados de endereços
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
  
  // Dados simulados de cartões
  const cartoes = [
    {
      id: 1,
      bandeira: 'Visa',
      numero: '•••• •••• •••• 1234',
      titular: 'João Silva',
      validade: '12/28',
      principal: true
    },
    {
      id: 2,
      bandeira: 'Mastercard',
      numero: '•••• •••• •••• 5678',
      titular: 'João Silva',
      validade: '08/26',
      principal: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Menu Lateral */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-purple-600 text-white">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600">
                <User size={40} />
              </div>
              <h2 className="text-xl font-semibold text-center">{usuario.nome}</h2>
              <p className="text-purple-200 text-center">{usuario.email}</p>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'dados' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('dados')}
                  >
                    <User size={20} className="mr-3" />
                    Dados Pessoais
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'pedidos' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('pedidos')}
                  >
                    <Package size={20} className="mr-3" />
                    Meus Pedidos
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'enderecos' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('enderecos')}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Endereços
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'pagamento' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('pagamento')}
                  >
                    <CreditCard size={20} className="mr-3" />
                    Formas de Pagamento
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'favoritos' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('favoritos')}
                  >
                    <Heart size={20} className="mr-3" />
                    Favoritos
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${abaSelecionada === 'configuracoes' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
                    onClick={() => setAbaSelecionada('configuracoes')}
                  >
                    <Settings size={20} className="mr-3" />
                    Configurações
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 rounded-lg flex items-center text-red-600 hover:bg-red-50">
                    <LogOut size={20} className="mr-3" />
                    Sair
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            {/* Dados Pessoais */}
            {abaSelecionada === 'dados' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Dados Pessoais</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="nome"
                        defaultValue={usuario.nome}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={usuario.email}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        defaultValue={usuario.telefone}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        defaultValue="123.456.789-00"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="senha-atual" className="block text-sm font-medium text-gray-700 mb-1">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          id="senha-atual"
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="nova-senha" className="block text-sm font-medium text-gray-700 mb-1">
                          Nova Senha
                        </label>
                        <input
                          type="password"
                          id="nova-senha"
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmar-senha" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmar Nova Senha
                        </label>
                        <input
                          type="password"
                          id="confirmar-senha"
                          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition">
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Meus Pedidos */}
            {abaSelecionada === 'pedidos' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Meus Pedidos</h2>
                
                {pedidos.length > 0 ? (
                  <div className="space-y-6">
                    {pedidos.map((pedido) => (
                      <div key={pedido.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className="font-semibold">Pedido {pedido.id}</span>
                              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                                pedido.status === 'Entregue' ? 'bg-green-100 text-green-800' : 
                                pedido.status === 'Cancelado' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {pedido.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Realizado em {pedido.data}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="font-bold text-purple-700">
                              R$ {pedido.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Itens do Pedido</h3>
                          <ul className="space-y-2">
                            {pedido.itens.map((item) => (
                              <li key={item.id} className="flex justify-between">
                                <span className="text-gray-600">
                                  {item.quantidade}x {item.nome}
                                </span>
                                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 flex justify-end">
                            <button className="text-purple-600 hover:text-purple-800 mr-4">
                              Ver Detalhes
                            </button>
                            {pedido.status === 'Entregue' && (
                              <button className="text-purple-600 hover:text-purple-800">
                                Comprar Novamente
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold mb-2">Você ainda não fez nenhum pedido</h3>
                    <p className="text-gray-600 mb-6">
                      Explore nossos produtos e faça seu primeiro pedido!
                    </p>
                    <Link 
                      href="/produtos"
                      className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
                    >
                      Ver Produtos
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Endereços */}
            {abaSelecionada === 'enderecos' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Meus Endereços</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {enderecos.map((endereco) => (
                    <div key={endereco.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold">{endereco.nome}</h3>
                          {endereco.principal && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              Principal
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600">{endereco.rua}</p>
                      <p className="text-gray-600">{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                      <p className="text-gray-600">CEP: {endereco.cep}</p>
                      {endereco.complemento && (
                        <p className="text-gray-600">Complemento: {endereco.complemento}</p>
                      )}
                      
                      {!endereco.principal && (
                        <button className="mt-4 text-purple-600 hover:text-purple-800 text-sm">
                          Definir como principal
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h3 className="font-medium mb-1">Adicionar Novo Endereço</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Cadastre um novo endereço para entrega
                    </p>
                    <button className="mt-2 text-purple-600 hover:text-purple-800">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Formas de Pagamento */}
            {abaSelecionada === 'pagamento' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Formas de Pagamento</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {cartoes.map((cartao) => (
                    <div key={cartao.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <h3 className="font-semibold">{cartao.bandeira}</h3>
                          {cartao.principal && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              Principal
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 font-mono">{cartao.numero}</p>
                      <p className="text-gray-600">{cartao.titular}</p>
                      <p className="text-gray-600">Validade: {cartao.validade}</p>
                      
                      {!cartao.principal && (
                        <button className="mt-4 text-purple-600 hover:text-purple-800 text-sm">
                          Definir como principal
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h3 className="font-medium mb-1">Adicionar Novo Cartão</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Cadastre um novo cartão para pagamentos
                    </p>
                    <button className="mt-2 text-purple-600 hover:text-purple-800">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Favoritos */}
            {abaSelecionada === 'favoritos' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Meus Favoritos</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                      <div className="h-48 bg-gray-200 relative">
                        {/* Placeholder para imagem do produto */}
                        <button className="absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full">
                          <Heart size={20} fill="currentColor" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2">Montana Black 400ml</h3>
                        <div className="flex items-center mb-2">
                          <div 
                            className="w-4 h-4 rounded-full mr-1 border border-gray-300" 
                            style={{ backgroundColor: 'black' }}
                          ></div>
                          <span className="text-sm text-gray-600">Preto</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-purple-700">
                            R$ 39,90
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
            )}
            
            {/* Configurações */}
            {abaSelecionada === 'configuracoes' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Configurações</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notificações</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">E-mail de confirmação de pedido</p>
                          <p className="text-sm text-gray-600">Receba e-mails quando fizer um novo pedido</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações de status do pedido</p>
                          <p className="text-sm text-gray-600">Receba e-mails quando o status do seu pedido mudar</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promoções e novidades</p>
                          <p className="text-sm text-gray-600">Receba e-mails sobre promoções e novos produtos</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Privacidade</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Compartilhar histórico de compras</p>
                          <p className="text-sm text-gray-600">Permitir que usemos seu histórico para recomendações</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Cookies de rastreamento</p>
                          <p className="text-sm text-gray-600">Permitir cookies para melhorar sua experiência</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-red-600 hover:text-red-800">
                      Excluir minha conta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
