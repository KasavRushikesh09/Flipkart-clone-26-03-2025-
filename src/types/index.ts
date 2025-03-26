export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    brand: string;
    discount?: number;
    description: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    id: string; // Unique order ID (e.g., timestamp or UUID)
    items: CartItem[];
    total: number;
    date: string; // ISO date string (e.g., "2025-03-23T10:00:00Z")
    status: 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';
  }