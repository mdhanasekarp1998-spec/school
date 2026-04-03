"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/schools", label: "Find School" },
  { href: "/admissions", label: "Admissions" },
  { href: "/achievements", label: "Achievements" },
  { href: "/news", label: "News" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-[#1e3a5f]" />
          <span className="text-xl font-bold text-[#1e3a5f]">
            Sri Chaitanya <span className="text-[#e53e3e]">Schools</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-[#1e3a5f] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#1e3a5f] rounded-md hover:bg-[#2c5282] transition-colors"
          >
            Login
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col border-t bg-white px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-[#1e3a5f]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-3 px-4 py-2 text-sm font-medium text-center text-white bg-[#1e3a5f] rounded-md"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
