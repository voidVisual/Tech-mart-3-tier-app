export type Review = {
  id: number;
  rating: number;
  text: string;
  author: string;
  avatar: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  reviews: Review[];
  stock: number;
  aiHint: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  { id: 'laptops', name: 'Laptops', description: 'Powerful laptops for work and play.' },
  { id: 'smartphones', name: 'Smartphones', description: 'The latest smartphones from top brands.' },
  { id: 'cameras', name: 'Cameras', description: 'Capture your moments with high-quality cameras.' },
  { id: 'accessories', name: 'Accessories', description: 'Enhance your tech with the best accessories.' },
];

export const products: Product[] = [
  {
    id: 'ultrabook-x1',
    name: 'Ultrabook X1',
    category: 'laptops',
    price: 89999,
    images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef'
    ],
    description: 'The Ultrabook X1 is a sleek and powerful laptop designed for professionals on the go. With its long battery life and lightweight design, it\'s the perfect companion for your busy lifestyle.',
    specs: { 'Processor': '13th Gen Intel Core i7', 'RAM': '16GB DDR5', 'Storage': '1TB NVMe SSD', 'Display': '14" 2.8K OLED' },
    reviews: [
      { id: 1, rating: 5, text: 'Absolutely love this laptop! It\'s fast, lightweight, and the screen is gorgeous.', author: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }
    ],
    stock: 15,
    aiHint: 'silver laptop'
  },
  {
    id: 'gaming-beast-pro',
    name: 'Gaming Beast Pro',
    category: 'laptops',
    price: 149999,
    images: [
        'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b',
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5'
    ],
    description: 'Unleash your gaming potential with the Gaming Beast Pro. Featuring a top-of-the-line GPU and a high-refresh-rate display, it delivers an immersive gaming experience.',
    specs: { 'Processor': 'AMD Ryzen 9', 'RAM': '32GB DDR5', 'Storage': '2TB NVMe SSD', 'GPU': 'NVIDIA RTX 4080' },
    reviews: [
      { id: 1, rating: 5, text: 'This machine is a monster! Runs every game I throw at it on max settings.', author: 'Rohan K.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' }
    ],
    stock: 8,
    aiHint: 'gaming laptop'
  },
  {
    id: 'galaxy-z10',
    name: 'Galaxy Z10',
    category: 'smartphones',
    price: 79999,
    images: [
        'https://images.unsplash.com/photo-1610945415295-d9bfbf46cd2e',
        'https://images.unsplash.com/photo-1601758003753-656157343694'
    ],
    description: 'Experience the future of mobile with the Galaxy Z10. Its stunning foldable display and pro-grade camera system redefine what a smartphone can do.',
    specs: { 'Display': '6.7" Foldable AMOLED', 'Camera': '108MP Triple Camera', 'Storage': '256GB', 'Battery': '4500mAh' },
    reviews: [
       { id: 1, rating: 4, text: 'The foldable screen is a game changer. A bit pricey but worth it.', author: 'Anjali M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' }
    ],
    stock: 25,
    aiHint: 'smartphone galaxy'
  },
  {
    id: 'pixel-pro-9',
    name: 'Pixel Pro 9',
    category: 'smartphones',
    price: 64999,
    images: [
        'https://images.unsplash.com/photo-1610423365997-f8e1208a0f9c', 
        'https://images.unsplash.com/photo-1616879809545-565451e9e731'
    ],
    description: 'The Pixel Pro 9 features an industry-leading camera powered by Google AI. Capture breathtaking photos and videos with ease.',
    specs: { 'Display': '6.5" OLED', 'Camera': '50MP Dual Camera with AI', 'Storage': '128GB', 'Chip': 'Google Tensor G4' },
    reviews: [
       { id: 1, rating: 5, text: 'The camera is simply magical. Best phone for photography.', author: 'Vikram P.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }
    ],
    stock: 30,
    aiHint: 'smartphone pixel'
  },
  {
    id: 'mirrorless-m50',
    name: 'Mirrorless M50',
    category: 'cameras',
    price: 55000,
    images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 
        'https://images.unsplash.com/photo-1519638831568-d9897f54ed69'
    ],
    description: 'A compact and powerful mirrorless camera perfect for content creators and enthusiasts. Capture stunning 4K video and crisp photos.',
    specs: { 'Sensor': '24.1MP APS-C', 'Video': '4K UHD', 'Autofocus': 'Dual Pixel CMOS AF', 'Connectivity': 'Wi-Fi, Bluetooth' },
    reviews: [],
    stock: 12,
    aiHint: 'mirrorless camera'
  },
  {
    id: 'action-cam-8k',
    name: 'Action Cam 8K',
    category: 'cameras',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1589172439293-17277b03623c'],
    description: 'Built for adventure. The Action Cam 8K is waterproof, durable, and captures incredibly smooth footage in stunning 8K resolution.',
    specs: { 'Resolution': '8K/30fps, 4K/120fps', 'Stabilization': 'HyperSmooth 6.0', 'Waterproof': 'Up to 33ft', 'Features': 'Front and rear displays' },
    reviews: [],
    stock: 20,
    aiHint: 'action camera'
  },
  {
    id: 'noise-cancelling-buds',
    name: 'Noise-Cancelling Buds',
    category: 'accessories',
    price: 12999,
    images: ['https://images.unsplash.com/photo-1606841832943-b3f8991c3c63'],
    description: 'Immerse yourself in sound. These wireless earbuds offer best-in-class noise cancellation and high-fidelity audio.',
    specs: { 'Connectivity': 'Bluetooth 5.3', 'Battery Life': '8 hours (32 hours with case)', 'Features': 'Active Noise Cancellation', 'Water Resistance': 'IPX4' },
    reviews: [],
    stock: 50,
    aiHint: 'wireless earbuds'
  },
  {
    id: 'powerbank-20k',
    name: 'PowerBank 20K',
    category: 'accessories',
    price: 3499,
    images: ['https://images.unsplash.com/photo-1588822285373-515437e452d4'],
    description: 'Never run out of power. This 20,000mAh power bank can charge your devices multiple times over with fast-charging support.',
    specs: { 'Capacity': '20,000mAh', 'Output': '45W USB-C PD', 'Ports': '2x USB-A, 1x USB-C', 'Weight': '350g' },
    reviews: [],
    stock: 100,
    aiHint: 'power bank'
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "TechMart India has the best prices and an incredible selection. My new laptop arrived in just two days. Highly recommended!",
    name: "Aarav Sharma",
    title: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19"
  },
  {
    id: 2,
    quote: "The customer service is outstanding. They helped me choose the perfect camera for my vlogging needs. I'm a customer for life.",
    name: "Meera Iyer",
    title: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    id: 3,
    quote: "I was skeptical about buying a phone online, but the process was seamless and secure. The phone was genuine and perfectly packed.",
    name: "Siddharth Verma",
    title: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: 4,
    quote: "Finally, a tech store that understands the Indian market. The UPI and COD options are super convenient. Great experience overall.",
    name: "Fatima Khan",
    title: "Student",
    avatar: "https://images.unsplash.com/photo-1488426862026-39b1ac707941"
  }
];
