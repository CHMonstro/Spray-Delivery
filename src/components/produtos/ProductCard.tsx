import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Link href={`/produtos/${product.id}`}>
        <div className="h-48 bg-gray-200 relative">
          {/* Placeholder para imagem do produto */}
          <div className="absolute bottom-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1">
            {product.brand}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div 
              className="w-4 h-4 rounded-full mr-1" 
              style={{ backgroundColor: product.color.toLowerCase() }}
            ></div>
            <span className="text-sm text-gray-600">{product.color}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-purple-700">
              R$ {product.price.toFixed(2)}
            </span>
            <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
