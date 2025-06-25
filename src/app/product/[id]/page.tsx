import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, StarHalf, ShieldCheck, Truck, IndianRupee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
           <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
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
          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </Badge>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={product.stock === 0}>
                Buy Now
              </Button>
              <div className="text-center text-sm text-muted-foreground">Secure payment via:</div>
              <div className="flex justify-center items-center gap-4 text-sm">
                <span>UPI</span>
                <span>•</span>
                <span>Credit/Debit Card</span>
                 <span>•</span>
                <span>Net Banking</span>
                 <span>•</span>
                <span className="font-bold">COD</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 text-sm">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>1 Year Manufacturer Warranty</span>
            </div>
             <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Fast Delivery Across India</span>
            </div>
          </div>

        </div>
      </div>
      
      <Separator className="my-12" />

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-4">Specifications</h3>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key} className="flex justify-between p-4">
                        <span className="font-medium text-muted-foreground">{key}</span>
                        <span className="text-right">{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="font-headline text-2xl font-bold mb-4">Customer Reviews</h3>
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
                )) : <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>}
              </div>
            </div>
        </div>
      </div>

       <Separator className="my-12" />

      <ProductRecommendations currentProduct={product} />

    </div>
  );
}
