"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dots, setDots] = useState<React.ReactElement[]>([]);
  const [isClient, setIsClient] = useState(false);

  const navItems = [
    "Home",
    "Services",
    "About",
    "Gallery",
    "Contact",
    "Dashboard",
  ];

  useEffect(() => {
    setIsClient(true);

    const newDots = [...Array(25)].map((_, i) => (
      <div
        key={i}
        className="absolute w-[8px] h-[8px] bg-amber-50 rounded-full opacity-40 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${4 + Math.random() * 6}s`,
        }}
      />
    ));
    setDots(newDots);
  }, []);

  return (
    <header className="bg-[#1f2937] text-black top-0 z-50 w-full  overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-10 py-4 max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/The-Balloon-Story-logo.png"
            alt="The Balloon Story"
            width={60}
            height={60}
            className="transition-transform duration-300 hover:scale-110"
          />
          <span className="text-2xl font-bold font-serif  tracking-tight text-[#fcfaf9]">
            The Balloon Story
          </span>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex gap-8 text-base font-medium text-gray-50">
          {navItems.map((item) => {
            let path = "/";
            if (item === "Home") path = "/";
            else if (item === "Dashboard") path = "/admin/dashboard";
            else path = `/${item.toLowerCase()}`;

            return (
              <Link
                key={item}
                href={path}
                className="hover:text-[#a855f7] hover:underline underline-offset-4 transition-all"
              >
                {item}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/The-Balloon-Story-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Menu Button */}
        <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col space-y-4 h-full">
          {/* Close Button */}
          <button
            className="self-end mb-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>

          {/* Nav Links */}
          {navItems.map((item) => {
            let path = "/";
            if (item === "Home") path = "/";
            else if (item === "Dashboard") path = "/admin/dashboard";
            else path = `/${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                href={path}
                className="block text-base text-gray-800 hover:text-amber-900 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
