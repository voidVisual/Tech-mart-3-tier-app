"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, User, Zap, Laptop, Smartphone, Camera, Headphones } from 'lucide-react';
import { categories } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = categories.map(c => ({ href: `/products/${c.id}`, label: c.name }));

const iconMap: { [key: string]: React.ReactNode } = {
  laptops: <Laptop className="h-4 w-4" />,
  smartphones: <Smartphone className="h-4 w-4" />,
  cameras: <Camera className="h-4 w-4" />,
  accessories: <Headphones className="h-4 w-4" />,
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">TechMart India</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname?.startsWith(link.href) ? "text-primary" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">TechMart India</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "transition-colors hover:text-primary flex items-center gap-2 p-2 rounded-md",
                         pathname?.startsWith(link.href) ? "bg-secondary text-primary" : "text-foreground"
                      )}
                    >
                      {iconMap[link.label.toLowerCase()]}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">TechMart</span>
          </Link>


          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
