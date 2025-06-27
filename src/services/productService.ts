
'use server';

import { query } from '@/lib/db';
import type { Product, Category, Review, Testimonial } from '@/lib/data';

// Import mock data for fallback
const { 
    products: mockProductsData, 
    categories: mockCategories, 
    testimonials: mockTestimonials 
} = require('../../db/data-to-seed.js');

// Map mock product data to match the Product type, which the app expects
const mockProducts: Product[] = mockProductsData.map((p: any) => ({
    ...p,
    category_id: p.category, // Map `category` to `category_id`
    reviews: p.reviews || [],
}));


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

// A helper function to wrap database calls with a fallback to mock data
async function tryDb<T>(dbCall: () => Promise<T>, fallback: () => T, feature: string): Promise<T> {
    try {
        // A quick check to see if the database is available.
        await query('SELECT 1');
        return await dbCall();
    } catch (error) {
        console.warn(`⚠️ Database connection failed for feature: [${feature}]. Falling back to mock data. Please check your .env file and ensure MySQL is running.`);
        return fallback();
    }
}


export async function getProducts(): Promise<Product[]> {
  return tryDb(
    async () => {
      const products = await query<any[]>('SELECT * FROM products');
      return products.map(parseProduct);
    },
    () => mockProducts,
    'getProducts'
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return tryDb(
    async () => {
      const products = await query<any[]>('SELECT * FROM products LIMIT 4');
      return products.map(parseProduct);
    },
    () => mockProducts.slice(0, 4),
    'getFeaturedProducts'
  );
}

export async function getProductById(id: string): Promise<Product | undefined> {
   return tryDb(
    async () => {
      const products = await query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
      if (products.length === 0) {
        return undefined;
      }
      const product = products[0];
      const reviews = await query<Review[]>('SELECT * FROM reviews WHERE product_id = ?', [id]);
      
      const parsedProduct = parseProduct(product);
      parsedProduct.reviews = reviews;
      
      return parsedProduct;
    },
    () => mockProducts.find(p => p.id === id),
    `getProductById(${id})`
  );
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return tryDb(
    async () => {
      const products = await query<any[]>('SELECT * FROM products WHERE category_id = ?', [categoryId]);
      return products.map(parseProduct);
    },
    () => mockProducts.filter(p => p.category_id === categoryId),
    `getProductsByCategory(${categoryId})`
  );
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
    if (names.length === 0) return [];
    return tryDb(
        async () => {
            const placeholders = names.map(() => '?').join(',');
            const products = await query<any[]>(`SELECT * FROM products WHERE name IN (${placeholders})`, names);
            return products.map(parseProduct);
        },
        () => {
            const lowerCaseNames = names.map(n => n.toLowerCase());
            return mockProducts.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
        },
        'getProductsByNames'
    );
}

export async function getCategories(): Promise<Category[]> {
  return tryDb(
    async () => await query<Category[]>('SELECT * FROM categories'),
    () => mockCategories,
    'getCategories'
  );
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return tryDb(
    async () => {
      const categories = await query<Category[]>('SELECT * FROM categories WHERE id = ?', [id]);
      return categories[0];
    },
    () => mockCategories.find((c: Category) => c.id === id),
    `getCategoryById(${id})`
  );
}

export async function searchProducts(queryStr: string): Promise<Product[]> {
  if (!queryStr) return [];
  return tryDb(
    async () => {
      const lowerCaseQuery = `%${queryStr.toLowerCase()}%`;
      const products = await query<any[]>(
        'SELECT * FROM products WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?',
        [lowerCaseQuery, lowerCaseQuery]
      );
      return products.map(parseProduct);
    },
    () => {
      const lowerCaseQuery = queryStr.toLowerCase();
      return mockProducts.filter(p => 
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.description.toLowerCase().includes(lowerCaseQuery)
      );
    },
    `searchProducts(${queryStr})`
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
    return tryDb(
        async () => await query<Testimonial[]>('SELECT * FROM testimonials'),
        () => mockTestimonials,
        'getTestimonials'
    );
}
