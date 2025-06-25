"use client";

import { useState, useEffect } from 'react';
import { getAIRecommendations } from '@/app/actions';
import { products, type Product } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Wand2 } from 'lucide-react';

export function ProductRecommendations({ currentProduct }: { currentProduct: Product }) {
  const [recommendations, setRecommendations] = useState<{ productName: string; reason: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      const otherProducts = products
        .filter(p => p.id !== currentProduct.id)
        .slice(0, 3)
        .map(p => p.name);
      
      const input = {
        browsingHistory: [currentProduct.name, ...otherProducts.slice(0, 2)].join(', '),
        pastPurchases: otherProducts.length > 2 ? otherProducts[2] : ''
      };

      const result = await getAIRecommendations(input);

      if (result.success && result.recommendations) {
        setRecommendations(result.recommendations);
      } else {
        setError(result.error || 'Could not load recommendations.');
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [currentProduct]);

  return (
    <div className="space-y-4">
       <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
         <Wand2 className="h-6 w-6 text-primary"/>
         You Might Also Like
       </h3>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}
      {error && !loading && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && recommendations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.slice(0, 4).map((rec, index) => {
             const product = products.find(p => p.name.toLowerCase() === rec.productName.toLowerCase());
             return product ? (
              <Card key={index} className="overflow-hidden">
                <Link href={`/product/${product.id}`}>
                  <Image src={product.images[0]} alt={product.name} data-ai-hint={product.aiHint} width={300} height={300} className="w-full aspect-square object-cover" />
                  <CardHeader>
                    <CardTitle className="text-base font-headline">{product.name}</CardTitle>
                  </CardHeader>
                </Link>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                  <p className="font-bold">{formatPrice(product.price)}</p>
                </CardContent>
              </Card>
             ) : null;
          })}
        </div>
      )}
    </div>
  );
}
