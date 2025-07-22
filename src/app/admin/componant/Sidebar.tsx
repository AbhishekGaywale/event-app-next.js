'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Users, Calendar, Layers, MessageSquare } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Services/Events', href: '/admin/services', icon: Calendar },
  { label: 'Event Category', href: '/admin/event-category', icon: Layers },
  { label: 'Testimonial', href: '/admin/testimonials', icon: MessageSquare },
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
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-white px-6 py-8 space-y-8
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:block min-h-screen
          border-r border-gray-100
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </Link>
          <button 
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Nav Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 pb-10">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={onClose}
                >
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-indigo-600' : 'text-gray-500'} 
                  />
                  {label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* <div className="pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Your Company
          </div>
        </div> */}
      </aside>
    </>
  );
}