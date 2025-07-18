'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Users', href: '/admin/users'},
  { label: 'Services/Events', href: '/admin/services' },
  { label: 'Event Category', href: '/admin/event-category' },
  { label: 'Testimonial', href: '/admin/testimonials' },
  { label: 'Settings', href: '/admin/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 
          bg-black text-white px-6 py-5 space-y-6 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:block min-h-screen
        `}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Title (Desktop) */}
        <h2 className="text-xl font-bold tracking-wide hidden md:block">Admin Panel</h2>

        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-gray-800 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
