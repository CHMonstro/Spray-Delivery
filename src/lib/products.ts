import { Product } from '@/types/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductsState {
  products: Product[];
  categories: string[];
  brands: string[];
  colors: string[];
  
  // Ações
  setProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByBrand: (brand: string) => Product[];
  getProductsByColor: (color: string) => Product[];
  searchProducts: (query: string) => Product[];
  filterProducts: (filters: {
    category?: string;
    brand?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => Product[];
}

// Dados simulados de produtos
const initialProducts: Product[] = [
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

// Extrair categorias, marcas e cores únicas dos produtos
const extractCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category || ''));
  return Array.from(categories).filter(Boolean);
};

const extractBrands = (products: Product[]): string[] => {
  const brands = new Set(products.map(p => p.brand));
  return Array.from(brands);
};

const extractColors = (products: Product[]): string[] => {
  const colors = new Set(products.map(p => p.color));
  return Array.from(colors);
};

export const useProductsStore = create<ProductsState>()((set, get) => ({
  products: initialProducts,
  categories: extractCategories(initialProducts),
  brands: extractBrands(initialProducts),
  colors: extractColors(initialProducts),
  
  setProducts: (products: Product[]) => {
    set({
      products,
      categories: extractCategories(products),
      brands: extractBrands(products),
      colors: extractColors(products)
    });
  },
  
  getProductById: (id: number) => {
    return get().products.find(p => p.id === id);
  },
  
  getProductsByCategory: (category: string) => {
    if (category === 'Todas') return get().products;
    return get().products.filter(p => p.category === category);
  },
  
  getProductsByBrand: (brand: string) => {
    if (brand === 'Todas') return get().products;
    return get().products.filter(p => p.brand === brand);
  },
  
  getProductsByColor: (color: string) => {
    if (color === 'Todas') return get().products;
    return get().products.filter(p => p.color === color);
  },
  
  searchProducts: (query: string) => {
    if (!query) return get().products;
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return get().products.filter(product => {
      const searchableText = `${product.name} ${product.brand} ${product.color} ${product.category}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  },
  
  filterProducts: (filters) => {
    return get().products.filter(product => {
      // Filtro por categoria
      if (filters.category && filters.category !== 'Todas' && product.category !== filters.category) {
        return false;
      }
      
      // Filtro por marca
      if (filters.brand && filters.brand !== 'Todas' && product.brand !== filters.brand) {
        return false;
      }
      
      // Filtro por cor
      if (filters.color && filters.color !== 'Todas' && product.color !== filters.color) {
        return false;
      }
      
      // Filtro por preço mínimo
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      
      // Filtro por preço máximo
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }
      
      return true;
    });
  }
}));
