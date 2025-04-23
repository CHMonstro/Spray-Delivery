export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  brand: string;
  description?: string;
  category?: string;
  stock?: number;
  rating?: number;
}
