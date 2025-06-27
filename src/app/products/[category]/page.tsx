
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getCategoriesAction, getCategoryByIdAction, getProductsByCategoryAction } from '@/app/actions';

export async function generateStaticParams() {
  const categories = await getCategoriesAction();
  return categories.map(category => ({
    category: category.id,
  }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCategoryByIdAction(params.category);
  const categoryProducts = await getProductsByCategoryAction(params.category);

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">{category.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{category.description}</p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No products found</h2>
          <p className="text-muted-foreground mt-2">Check back later for new products in this category.</p>
        </div>
      )}
    </div>
  );
}
