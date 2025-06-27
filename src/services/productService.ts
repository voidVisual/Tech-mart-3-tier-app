
'use server';

import { query } from '@/lib/db';
import type { Product, Category, Review, Testimonial } from '@/lib/data';

// Helper to parse JSON fields from the database
function parseProduct(dbProduct: any): Product {
    return {
        ...dbProduct,
        price: Number(dbProduct.price),
        images: typeof dbProduct.images === 'string' ? JSON.parse(dbProduct.images) : [],
        specs: typeof dbProduct.specs === 'string' ? JSON.parse(dbProduct.specs) : {},
        reviews: dbProduct.reviews || [], // Reviews will be attached separately
        aiHint: dbProduct.ai_hint,
    };
}

export async function getProducts(): Promise<Product[]> {
  const products = await query<any[]>('SELECT * FROM products');
  return products.map(parseProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await query<any[]>('SELECT * FROM products LIMIT 4');
  return products.map(parseProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
  if (products.length === 0) {
    return undefined;
  }
  const product = products[0];
  const reviews = await query<Review[]>('SELECT * FROM reviews WHERE product_id = ?', [id]);
  
  const parsedProduct = parseProduct(product);
  parsedProduct.reviews = reviews;
  
  return parsedProduct;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await query<any[]>('SELECT * FROM products WHERE category_id = ?', [categoryId]);
  return products.map(parseProduct);
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
    if (names.length === 0) return [];
    const placeholders = names.map(() => '?').join(',');
    const products = await query<any[]>(`SELECT * FROM products WHERE name IN (${placeholders})`, names);
    return products.map(parseProduct);
}

export async function getCategories(): Promise<Category[]> {
  return query<Category[]>('SELECT * FROM categories');
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const categories = await query<Category[]>('SELECT * FROM categories WHERE id = ?', [id]);
  return categories[0];
}

export async function searchProducts(queryStr: string): Promise<Product[]> {
  if (!queryStr) return [];
  const lowerCaseQuery = `%${queryStr.toLowerCase()}%`;
  const products = await query<any[]>(
    'SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?',
    [lowerCaseQuery, lowerCaseQuery]
  );
  return products.map(parseProduct);
}

export async function getTestimonials(): Promise<Testimonial[]> {
    return query<Testimonial[]>('SELECT * FROM testimonials');
}
