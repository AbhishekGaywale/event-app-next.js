"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    ...(isAdmin() ? [{ name: "Dashboard", path: "/admin/dashboard" }] : []),
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    // Redirect to home if on admin page
    if (pathname.startsWith('/admin')) {
      router.push('/');
    }
  };

  return (
    <header className="bg-[#1f2937] text-white w-full sticky top-0 z-30">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Image
            src="/logo/The-Balloon-Story-logo.png"
            alt="The Balloon Story"
            width={60}
            height={60}
            className="transition-transform duration-300 hover:scale-105"
            priority
          />
          <span className="text-2xl font-bold font-serif tracking-tight text-[#fcfaf9]">
            The Balloon Story
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`hover:text-[#a855f7] transition-colors ${
                pathname === item.path ? "text-[#a855f7] font-semibold" : "text-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg uppercase hover:bg-purple-700 focus:outline-none transition-colors"
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                {user.name?.[0]}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200 divide-y divide-gray-100">
                  <div className="py-3 px-4">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/The-Balloon-Story-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>
        <button 
          onClick={() => setMenuOpen(true)} 
          aria-label="Open Menu"
          className="text-white focus:outline-none p-1"
        >
          <Menu size={28} />
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
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Image
                src="/logo/The-Balloon-Story-logo.png"
                alt="logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-lg">The Balloon Story</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 rounded-md transition-colors ${
                  pathname === item.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg uppercase">
                    {user.name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-600">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;