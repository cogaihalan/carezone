"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Stories", href: "/stories" },
    { name: "Drawing", href: "/drawing" },
    { name: "Tips for you", href: "/suggestions" },
    { name: "Safe space", href: "/safe-space" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (pathname === "/welcome" || pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo và tên web */}
          <div className="flex items-center space-x-3">
            <Link
              href="/home"
              className="text-2xl font-bold text-black hover:text-blue-100 transition-colors"
            >
              <Image
                src="/logo-carezone.png"
                alt="Carezone"
                width={isScrolled ? 80 : 100}
                height={isScrolled ? 67 : 80}
                className="transition-[width,height] duration-300 ease-out max-md:w-15"
              />
            </Link>
          </div>

          {/* Navigation menu */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-md font-semibold transition-all duration-200 ${
                  pathname === item.href
                    ? "text-blue-800 bg-blue-100"
                    : "text-black hover:text-blue-800 hover:bg-blue-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-blue-500 hover:text-blue-300 transition-all duration-200 p-2 rounded-md hover:bg-white/10"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-80 opacity-100 pb-4"
              : "max-h-0 opacity-0 pb-0"
          }`}
          style={{
            transitionProperty: "max-height, opacity, padding-bottom",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "text-blue-800 bg-blue-100 shadow-md"
                    : "text-blue-500 hover:bg-blue-100 hover:text-blue-800"
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
