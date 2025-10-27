"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

interface HeaderProps {
  showNavigation?: boolean;
}

export default function Header({ showNavigation = true }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Stories", href: "/stories" },
    { name: "Gợi ý", href: "/suggestions" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-primary-blue/20 backdrop-blur-sm border-b border-primary-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo và tên web */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-blue rounded-full">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <Link
              href="/home"
              className="font-heading font-bold text-2xl text-white"
            >
              carezone
            </Link>
          </div>

          {/* Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-body text-lg transition-colors duration-200 hover:text-white ${
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Logo nhóm */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">T</span>
            </div>
            <span className="text-white/80 font-body text-sm">Team</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showNavigation && (
          <div className="md:hidden pb-4">
            <nav className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-body text-sm transition-colors duration-200 hover:text-white ${
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
