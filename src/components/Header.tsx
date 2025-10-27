'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Stories', href: '/stories' },
    { name: 'Drawing', href: '/drawing' },
    { name: 'Balloon Game', href: '/balloon-game' },
    { name: 'Tips for you', href: '/tips' },
    { name: 'Safe space', href: '/safe-space' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-200 to-blue-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo và tên web */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:rotate-180 transition-transform duration-300">
              <Heart className="w-6 h-6 text-blue-500" />
            </div>
            <Link href="/home" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors">
              carezone
            </Link>
          </div>

          {/* Navigation menu */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                  pathname === item.href
                    ? 'text-blue-800 bg-white/20'
                    : 'text-white hover:text-blue-800 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-100 hover:scale-110 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  pathname === item.href
                    ? 'text-blue-800 bg-white/20'
                    : 'text-white hover:text-blue-100 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
