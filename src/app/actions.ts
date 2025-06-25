'use server'

import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import type { ProductRecommendationsInput, ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';

export async function getAIRecommendations(input: ProductRecommendationsInput): Promise<{ success: boolean; recommendations?: ProductRecommendationsOutput['recommendations']; error?: string }> {
  try {
    const result = await getProductRecommendations(input);
    if (!result || !result.recommendations) {
      return { success: false, error: "Failed to get recommendations." };
    }
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
