'use client';

import { useState } from 'react';
import Sidebar from './componant/Sidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
