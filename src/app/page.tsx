
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonials } from '@/components/Testimonials';
import { ArrowRight, Laptop, Smartphone, Camera, Headphones } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { getCategoriesAction, getFeaturedProductsAction } from './actions';

const categoryIcons: { [key: string]: React.ReactNode } = {
  laptops: <Laptop className="h-8 w-8" />,
  smartphones: <Smartphone className="h-8 w-8" />,
  cameras: <Camera className="h-8 w-8" />,
  accessories: <Headphones className="h-8 w-8" />,
};

export default async function Home() {
  const categories = await getCategoriesAction();
  const featuredProducts = await getFeaturedProductsAction();

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                  TechMart India
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Your trusted source for the latest electronics. Unbeatable prices, fast delivery, and top-notch service.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="#categories">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1550009158-94ae76552485"
              data-ai-hint="modern electronics collage"
              alt="Hero Product"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section id="categories" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Shop by Category</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our wide range of electronic products. We have everything you need.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/products/${category.id}`}>
                <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="text-primary">{categoryIcons[category.id]}</div>
                    <h3 className="text-xl font-bold font-headline">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our hand-picked selection of top-selling electronics.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-center mb-12">What Our Customers Say</h2>
          <Testimonials />
        </div>
      </section>
    </div>
  );
}
