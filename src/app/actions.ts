
'use server'

import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import type { ProductRecommendationsInput } from '@/ai/flows/product-recommendations';
import * as productService from '@/services/productService';
import { notFound, redirect } from 'next/navigation';
import type { Product } from '@/lib/data';
import { z } from 'zod';
import * as authService from '@/services/authService';
import { createSession, clearSession } from '@/lib/session';

export async function getAIRecommendations(currentProductId: string): Promise<{ success: boolean; recommendations?: (Product & { reason: string })[]; error?: string }> {
  try {
    const allProducts = await productService.getProducts();
    const currentProduct = allProducts.find(p => p.id === currentProductId);

    if (!currentProduct) {
      return { success: false, error: "Current product not found." };
    }

    const otherProducts = allProducts
        .filter(p => p.id !== currentProductId)
        .slice(0, 3)
        .map(p => p.name);
    
    const input: ProductRecommendationsInput = {
      browsingHistory: [currentProduct.name, ...otherProducts.slice(0, 2)].join(', '),
      pastPurchases: otherProducts.length > 2 ? otherProducts[2] : ''
    };

    const result = await getProductRecommendations(input);
    if (!result || !result.recommendations) {
      return { success: false, error: "Failed to get recommendations from AI." };
    }

    const recommendedProductNames = result.recommendations.map(r => r.productName);
    const recommendedProducts = await productService.getProductsByNames(recommendedProductNames);

    const finalRecommendations = recommendedProducts.map(product => {
        const recommendation = result.recommendations.find(r => r.productName.toLowerCase() === product.name.toLowerCase());
        return {
            ...product,
            reason: recommendation?.reason || "Recommended for you."
        };
    });

    return { success: true, recommendations: finalRecommendations };
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

// Product and Category Actions
export async function getCategoriesAction() {
    return productService.getCategories();
}

export async function getCategoryByIdAction(id: string) {
    const category = await productService.getCategoryById(id);
    if (!category) notFound();
    return category;
}

export async function getFeaturedProductsAction() {
    return productService.getFeaturedProducts();
}

export async function getProductsAction() {
    return productService.getProducts();
}

export async function getProductByIdAction(id: string) {
    const product = await productService.getProductById(id);
    if (!product) notFound();
    return product;
}

export async function getProductsByCategoryAction(categoryId: string) {
    return productService.getProductsByCategory(categoryId);
}

export async function searchProductsAction(query: string) {
    return productService.searchProducts(query);
}

export async function getTestimonialsAction() {
    return productService.getTestimonials();
}


// Auth Actions

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function signupAction(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        await authService.signup(name, email, password);
        return { type: 'success', message: 'Signup successful! Please log in.' };
    } catch (error: any) {
        return { type: 'error', message: error.message || 'An unexpected error occurred.' };
    }
}

const loginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
});

export async function loginAction(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const user = await authService.login(email, password);
        if (user) {
            await createSession({ id: user.id, name: user.name, email: user.email });
            redirect('/account');
        } else {
             return { type: 'error', message: 'Invalid credentials.' };
        }
    } catch (error: any) {
         return { type: 'error', message: error.message || 'An unexpected error occurred.' };
    }
}

export async function logoutAction() {
    await clearSession();
}
