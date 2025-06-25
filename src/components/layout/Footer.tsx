import Link from 'next/link';
import { Zap, Twitter, Facebook, Instagram } from 'lucide-react';
import { categories } from '@/lib/data';

export function Footer() {
  const navLinks = categories.map(c => ({ href: `/products/${c.id}`, label: c.name }));

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">TechMart India</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your one-stop shop for electronics.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2 font-headline">Categories</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 font-headline">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 font-headline">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TechMart India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
