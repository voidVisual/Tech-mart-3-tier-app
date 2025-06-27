
'use server';

import { products, categories, type Product, type Category } from '@/lib/data';

export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return Promise.resolve(products.slice(0, 4));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return Promise.resolve(products.find(p => p.id === id));
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return Promise.resolve(products.filter(p => p.category === categoryId));
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
    const lowerCaseNames = names.map(name => name.toLowerCase());
    return Promise.resolve(
        products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()))
    );
}

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return Promise.resolve(categories.find(c => c.id === id));
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query) return Promise.resolve([]);
  const lowerCaseQuery = query.toLowerCase();
  return Promise.resolve(
    products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    )
  );
}
