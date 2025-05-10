"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SearchBar } from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Concerts", href: "/concerts" },
    { label: "Arts", href: "/arts" },
    { label: "Conference", href: "/conference" },
    { label: "Movies", href: "/movies" },
    { label: "International", href: "/international" },
  ];

  return (
    <header className="w-full h-[74px] bg-white/90 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className="h-full max-w-[1328px] mx-auto px-4 md:px-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl text-[#4F4CEE] hover:opacity-90 transition-opacity font-[family-name:var(--font-geist-sans)]"
        >
          <span>Kahoot</span>
        </Link>

        {/* Desktop Navigation (SearchBar centered) */}
        <div className="flex-1 mx-8 hidden md:block">
          <SearchBar />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-[#4F4CEE] font-medium hover:bg-[#4F4CEE]/5 font-[family-name:var(--font-geist-sans)]"
          >
            Log In
          </Button>
          <Button
            className="bg-[#4F4CEE] hover:bg-[#4F4CEE]/90 font-medium text-white font-[family-name:var(--font-geist-sans)]"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-[#4F4CEE]/5">
                <Menu className="text-gray-600 w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center gap-2 text-[#4F4CEE] font-[family-name:var(--font-geist-sans)]">
                  Kahoot
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 font-medium hover:text-[#4F4CEE] transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-[#4F4CEE]/5 font-[family-name:var(--font-geist-sans)]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                  <Button
                    variant="ghost"
                    className="w-full text-gray-600 font-medium hover:text-[#4F4CEE] hover:bg-[#4F4CEE]/5 font-[family-name:var(--font-geist-sans)]"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full bg-[#4F4CEE] font-medium hover:bg-[#4F4CEE]/90 text-white font-[family-name:var(--font-geist-sans)]"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
