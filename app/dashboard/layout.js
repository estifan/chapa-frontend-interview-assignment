'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SideNav from "@/app/components/SideNav";
import Header from "@/app/components/Header";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const storedUser = localStorage.getItem('user');
  const router = useRouter();
  const currentPath = pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);
  const pathRole = pathSegments[1];

  useEffect(() => {
    if (!storedUser) {
      router.push('/login');
      return;
    }
    // Parse user data
    const user = JSON.parse(storedUser);
    const currentPath = pathname;

    // Check if user is trying to access a route they don't have permission for
    if (currentPath.startsWith('/dashboard/')) {
      if (!['user', 'admin', 'superadmin'].includes(pathRole)) {
        router.push('/login');
        return;
      }

      if (user.role === 'user' && pathRole !== 'user') {
        router.push('/login');
      } else if (user.role === 'admin' && pathRole !== 'admin') {
        router.push('/login');
      } else if (user.role === 'superadmin' && pathRole !== 'superadmin') {
        router.push('/dashboard/superadmin');
      }
    }
  }, [storedUser, pathname, router]);



  // Check if mobile view on mount and on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when a navigation item is clicked on mobile
  const handleNavigation = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Sample user data - replace with actual user data from your auth provider
  const userData = storedUser ? JSON.parse(storedUser) : null;

  if (!storedUser || pathRole !== userData?.role) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <SideNav onNavigate={handleNavigation} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={userData}
          onMenuClick={toggleSidebar}
          className="sticky top-0 z-10"
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer - Optional: Add your footer content here */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Chapa. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </a>
              <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy
              </a>
              <a href="/help" className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}