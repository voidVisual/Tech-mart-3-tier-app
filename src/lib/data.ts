export type Review = {
  id: number;
  product_id: string;
  rating: number;
  text: string;
  author: string;
  avatar: string;
};

export type Product = {
  id: string;
  name: string;
  category_id: string;
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

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
}
