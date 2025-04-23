import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-purple-700 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Spray Delivery
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/produtos" className="hover:text-purple-200 transition">
              Produtos
            </Link>
            <Link href="/produtos/marcas" className="hover:text-purple-200 transition">
              Marcas
            </Link>
            <Link href="/produtos/cores" className="hover:text-purple-200 transition">
              Cores
            </Link>
            <Link href="/tutoriais" className="hover:text-purple-200 transition">
              Tutoriais
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Buscar tintas spray..."
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="absolute right-3 text-gray-600">
              <Search size={20} />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/perfil" className="hover:text-purple-200 transition">
              <User size={24} />
            </Link>
            <Link href="/carrinho" className="hover:text-purple-200 transition relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tintas spray..."
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-3 md:hidden bg-purple-800 rounded-lg p-4 space-y-3">
            <Link href="/produtos" className="block hover:text-purple-200 transition">
              Produtos
            </Link>
            <Link href="/produtos/marcas" className="block hover:text-purple-200 transition">
              Marcas
            </Link>
            <Link href="/produtos/cores" className="block hover:text-purple-200 transition">
              Cores
            </Link>
            <Link href="/tutoriais" className="block hover:text-purple-200 transition">
              Tutoriais
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
