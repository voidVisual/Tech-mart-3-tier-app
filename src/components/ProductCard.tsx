import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-video overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              data-ai-hint={product.aiHint}
              width={400}
              height={225}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.id}`} className="block">
          <CardTitle className="text-lg font-headline hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="font-bold text-lg">{formatPrice(product.price)}</div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/product/${product.id}`}>
            View
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
