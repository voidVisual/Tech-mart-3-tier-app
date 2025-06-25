"use client";

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { useMemo, Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query) return [];
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mb-8 text-center">
        {query ? (
          <>
            <h1 className="text-3xl font-bold font-headline tracking-tight">
              Search results for "{query}"
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found.
            </p>
          </>
        ) : (
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Search Products
          </h1>
        )}
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        query ? (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">No products found</h2>
                <p className="text-muted-foreground mt-2">Try a different search term or browse our categories.</p>
            </div>
        ) : (
           <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">What are you looking for?</h2>
                <p className="text-muted-foreground mt-2">Use the search bar above to find products.</p>
            </div>
        )
      )}
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
