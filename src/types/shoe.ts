export interface Shoe {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
  gender: 'Men' | 'Women' | 'Boys' | 'Girls' | 'Unisex' | string;
  shoeType?: string;
  features?: string[];
  closureType?: string;
  material?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
  quantity: number;
}