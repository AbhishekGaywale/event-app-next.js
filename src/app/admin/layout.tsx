'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Sidebar from './componant/Sidebar';
import { Menu } from 'lucide-react';
// import LoadingSpinner from './LoadingSpinner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if 
     (user && !isAdmin()) {
      // Logged in but not admin, redirect to unauthorized
      router.push('/unauthorized');
    }
  }, [user, isAdmin, router]);

  // Show loading while checking auth status
  // if (!user || !isAdmin()) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100 w-full overflow-y-auto">
        {/* Mobile Header with Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
            aria-label="Open sidebar"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {children}
      </main>
    </div>
  );
}