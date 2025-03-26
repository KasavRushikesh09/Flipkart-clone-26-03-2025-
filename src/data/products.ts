// src/data/products.ts
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

export const dummyProducts: Product[] = [
  { id: 1, name: "Smartphone X", price: 14999, originalPrice: 17999, rating: 3.3, reviewCount: 245, image: "https://tse4.mm.bing.net/th?id=OIP.ah_L4-0_Dz0dAQCYnyk2jQHaHa&pid=Api&P=0&h=220", category: "Electronics", brand: "Samsung", discount: 16, description: "A powerful smartphone with 5G support and a stunning display." },
  { id: 2, name: "Cotton T-Shirt", price: 799, originalPrice: 999, rating: 3.1, reviewCount: 189, image: "https://rukminim1.flixcart.com/image/150/150/xif0q/t-shirt/t/e/0/l-st-theboys-black-smartees-original-imagnqszzzzyuzru.jpeg?q=70", category: "Clothing", brand: "Smartees", discount: 20, description: "Comfortable black cotton t-shirt with a trendy design." },
  { id: 3, name: "Casual Shoes", price: 799, originalPrice: 1999, rating: 2.2, reviewCount: 80, image: "https://m.media-amazon.com/images/I/711wOx63QiL._SY695_.jpg", category: "Footwear", brand: "Nike", discount: 60, description: "Stylish casual shoes perfect for everyday wear." },
  { id: 4, name: "Wrist Watch", price: 599, originalPrice: 1999, rating: 4.3, reviewCount: 200, image: "https://www.carlington.in/cdn/shop/products/3377_Black_1_0c08f99b-f0a5-4747-a63d-0910c2ed43b2.jpg?v=1695529841&width=1920", category: "Electronics", brand: "Carlington", discount: 70, description: "Elegant wrist watch with a sleek black design." },
  { id: 5, name: "Handbag", price: 1199, originalPrice: 1999, rating: 3.1, reviewCount: 90, image: "https://tse3.mm.bing.net/th?id=OIP.2osHOZ52JG1Hjbad7m3xXgHaJ4&pid=Api&P=0&h=220", category: "Clothing", brand: "Lavie", discount: 40, description: "Chic handbag for women, ideal for daily use." },
  { id: 6, name: "Sandals & Floaters", price: 499, originalPrice: 999, rating: 4.0, reviewCount: 70, image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/30/FITagAN2_04f83a6ffe5a46cfb1d18d2d33963724.jpg", category: "Footwear", brand: "Myntra", discount: 50, description: "Comfortable sandals for casual outings." },
  { id: 7, name: "Kurta Set", price: 699, originalPrice: 1999, rating: 0, reviewCount: 120, image: "https://5.imimg.com/data5/SELLER/Default/2022/1/UV/TP/SV/74166486/inl09-5--500x500.jpg", category: "Clothing", brand: "Biba", discount: 65, description: "Traditional kurta set for festive occasions." },
  { id: 8, name: "Bluetooth Headphones", price: 999, originalPrice: 3999, rating: 2.2, reviewCount: 150, image: "https://tse3.mm.bing.net/th?id=OIP.DpO9BvSC8255RfrqM4QGqgHaHa&pid=Api&P=0&h=220", category: "Electronics", brand: "BrandA", discount: 75, description: "Wireless headphones with noise cancellation." },
  { id: 9, name: "Printer", price: 3999, originalPrice: 4999, rating: 3.9, reviewCount: 80, image: "https://rukminim1.flixcart.com/image/150/150/printer/j/j/y/hp-laserjet-m1005-multifunction-original-imadxhzpeb9qbrfg.jpeg?q=70", category: "Electronics", brand: "HP", discount: 20, description: "Compact printer for home and office use." },
  { id: 10, name: "Monitor", price: 7999, originalPrice: 9999, rating: 4.3, reviewCount: 120, image: "https://rukminim1.flixcart.com/image/150/150/ko8xtow0/monitor/t/a/y/d24-20-66aekac1in-lenovo-original-imag2qwzazcdmqtb.jpeg?q=70", category: "Electronics", brand: "Lenovo", discount: 20, description: "24-inch monitor with Full HD resolution." },
  { id: 11, name: "Camera", price: 1999, originalPrice: 9999, rating: 3.5, reviewCount: 200, image: "https://rukminim1.flixcart.com/image/150/150/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70", category: "Electronics", brand: "Canon", discount: 80, description: "DSLR camera for photography enthusiasts." },
  { id: 12, name: "External Hard Drive", price: 3499, originalPrice: 4499, rating: 4.1, reviewCount: 90, image: "https://tse2.mm.bing.net/th?id=OIP.m7ZLuj_XiwqZ3lRdkiQorwHaHa&pid=Api&P=0&h=220", category: "Electronics", brand: "WD", discount: 22, description: "1TB external hard drive for data storage." },
  { id: 13, name: "Gaming Laptop", price: 59999, originalPrice: 74999, rating: 2.4, reviewCount: 300, image: "https://tse3.mm.bing.net/th?id=OIP.AaGdVAV6RcUI_vFW5lZQMAHaFj&pid=Api&P=0&h=220", category: "Electronics", brand: "Asus", discount: 20, description: "High-performance gaming laptop with RGB keyboard." },
  { id: 14, name: "Smartwatch", price: 1999, originalPrice: 4999, rating: 1.3, reviewCount: 180, image: "https://tse4.mm.bing.net/th?id=OIP.z8FnZH-EdzeOPJLvW86V_QHaHa&pid=Api&P=0&h=220", category: "Electronics", brand: "Noise", discount: 60, description: "Smartwatch with fitness tracking features." },
  { id: 15, name: "Beauty Product", price: 499, originalPrice: 999, rating: 2.2, reviewCount: 110, image: "https://tse2.mm.bing.net/th?id=OIP.pHk0oBVIz_kWo4erdbOlwQHaFi&pid=Api&P=0&h=220", category: "Beauty", brand: "Lakme", discount: 50, description: "Makeup kit for daily beauty needs." },
  { id: 16, name: "Home Appliance", price: 6999, originalPrice: 9999, rating: 4.1, reviewCount: 95, image: "https://tse1.mm.bing.net/th?id=OIP.3NGbQwBq6vS0wWGzoHBM3AHaFF&pid=Api&P=0&h=220", category: "Appliances", brand: "Philips", discount: 30, description: "Multi-purpose home appliance for cooking." },
  { id: 17, name: "Electric Kettle", price: 1299, originalPrice: 1999, rating: 3.0, reviewCount: 85, image: "https://tse2.mm.bing.net/th?id=OIP.h9-eeo-e2BEHaJ-y6VHTqAHaHa&pid=Api&P=0&h=220", category: "Appliances", brand: "Pigeon", discount: 35, description: "Electric kettle with fast boiling technology." },
  { id: 18, name: "Lipstick", price: 299, originalPrice: 599, rating: 2.3, reviewCount: 130, image: "https://tse1.mm.bing.net/th?id=OIP.CNNhcwWFf_8LSK9CuZ2hGAHaHa&pid=Api&P=0&h=220", category: "Beauty", brand: "Maybelline", discount: 50, description: "Long-lasting lipstick in vibrant shades." },
  { id: 19, name: "Jeans", price: 1199, originalPrice: 2499, rating: 3.2, reviewCount: 160, image: "https://tse3.mm.bing.net/th?id=OIP.dxfbceNEgmMOz1nE4BikPQHaLW&pid=Api&P=0&h=220", category: "Clothing", brand: "Levi's", discount: 52, description: "Slim-fit jeans for men, durable and stylish." },
  { id: 20, name: "Bluetooth Speaker", price: 1499, originalPrice: 2999, rating: 4.4, reviewCount: 220, image: "https://tse2.mm.bing.net/th?id=OIP.TPp7UhAmDyrtMaXAEeVGKwHaHa&pid=Api&P=0&h=220", category: "Electronics", brand: "JBL", discount: 50, description: "Portable Bluetooth speaker with deep bass." },
  { id: 21, name: "Backpack", price: 899, originalPrice: 1499, rating: 1.1, reviewCount: 75, image: "https://tse4.mm.bing.net/th?id=OIP.OMMCNeFf2hlRhWOxvgm50gHaIL&pid=Api&P=0&h=220", category: "Clothing", brand: "Wildcraft", discount: 40, description: "Spacious backpack for travel and daily use." },
  { id: 22, name: "Air Conditioner", price: 29999, originalPrice: 39999, rating: 4.5, reviewCount: 250, image: "https://tse4.mm.bing.net/th?id=OIP.LRikGozW1ySnSFN3KFeI4QHaE7&pid=Api&P=0&h=220", category: "Appliances", brand: "LG", discount: 25, description: "Energy-efficient air conditioner with smart features." },
  { id: 23, name: "Sunglasses", price: 599, originalPrice: 1299, rating: 4.0, reviewCount: 90, image: "https://tse2.mm.bing.net/th?id=OIP.JY0vpJiSXknZ1_WPXo5yUwHaJ4&pid=Api&P=0&h=220", category: "Clothing", brand: "Ray-Ban", discount: 54, description: "UV-protected sunglasses with a classic design." },
  { id: 24, name: "Electric Toothbrush", price: 1999, originalPrice: 2999, rating: 4.3, reviewCount: 140, image: "https://tse4.mm.bing.net/th?id=OIP.3ug56Nm8p5NcYfSIUjZYngHaHa&pid=Api&P=0&h=220", category: "Beauty", brand: "Oral-B", discount: 33, description: "Electric toothbrush for superior cleaning." },
  { id: 25, name: "Gaming Console", price: 34999, originalPrice: 44999, rating: 2.6, reviewCount: 320, image: "https://tse4.mm.bing.net/th?id=OIP.5wFEqCt6ZP4WTAuLyVBMwwHaD2&pid=Api&P=0&h=220", category: "Electronics", brand: "Sony", discount: 22, description: "Next-gen gaming console with 4K support." },
  { id: 26, name: "Winter Jacket", price: 2499, originalPrice: 3999, rating: 3.2, reviewCount: 110, image: "https://tse1.mm.bing.net/th?id=OIP.tJe56hpHdmckWtC10V4IywHaHf&pid=Api&P=0&h=220", category: "Clothing", brand: "Columbia", discount: 37, description: "Warm winter jacket for cold weather." },
];