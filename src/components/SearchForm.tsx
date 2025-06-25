"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query && inputRef.current) {
        inputRef.current.value = query;
    }
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("query") as string;
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        ref={inputRef}
        type="search"
        name="query"
        placeholder="Search products..."
        className="pr-10"
        defaultValue={query || ''}
      />
      <Button type="submit" variant="ghost" size="icon" className="absolute top-0 right-0 h-full w-10">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
