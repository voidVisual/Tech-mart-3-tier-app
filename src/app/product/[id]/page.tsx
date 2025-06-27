
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, StarHalf, ShieldCheck, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductByIdAction, getProductsAction } from '@/app/actions';

export async function generateStaticParams() {
  const products = await getProductsAction();
  return products.map(product => ({
    id: product.id,
  }));
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
      {halfStar && <StarHalf className="w-5 h-5 text-amber-400 fill-amber-400" />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)}
    </div>
  );
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductByIdAction(params.id);

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
           <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      data-ai-hint={product.aiHint}
                      width={600}
                      height={600}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2"/>
            <CarouselNext className="right-2"/>
          </Carousel>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-4">
            <StarRating rating={averageRating} />
            <span className="text-muted-foreground">{product.reviews.length} reviews</span>
          </div>
          <p className="text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="space-y-4 pt-4">
            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </Badge>
            <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={product.stock === 0}>
              Buy Now
            </Button>
          </div>

          <Card>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>1 Year Manufacturer Warranty</span>
            </div>
             <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Fast Delivery Across India</span>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator className="my-12" />

      <div>
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key} className="flex justify-between items-center p-4">
                      <span className="font-medium text-muted-foreground">{key}</span>
                      <span className="text-right font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
             <div className="space-y-6">
                {product.reviews.length > 0 ? product.reviews.map(review => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="person portrait"/>
                              <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{review.author}</span>
                         </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{review.text}</p>
                    </CardContent>
                  </Card>
                )) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      No reviews yet. Be the first to review this product!
                    </CardContent>
                  </Card>
                )}
              </div>
          </TabsContent>
        </Tabs>
      </div>

       <Separator className="my-12" />

      <ProductRecommendations currentProduct={product} />

    </div>
  );
}
