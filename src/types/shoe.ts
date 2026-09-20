export interface Shoe {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
  gender: 'Men' | 'Women' | 'Boys' | 'Girls' | 'Unisex';
  shoeType: 'Athletic Shoe' | 'Casual' | 'Boots' | 'Loafer' | 'Sandals';
  features: string[]; // e.g., ["Lightweight", "Breathable", "Water Resistant"]
  closureType: 'Lace-Up' | 'Slip-On' | 'Hook & Loop' | 'Zipper';
  material: string;
}

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
  quantity: number;
}