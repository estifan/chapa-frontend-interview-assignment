'use client';

import { usePathname } from 'next/navigation';
import { FiSettings, FiBell, FiChevronDown } from 'react-icons/fi';
import { IoMenu } from "react-icons/io5";

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/beneficiaries': 'Beneficiaries',
  '/cards': 'My Cards',
  '/notifications': 'Notifications',
  '/profile': 'My Profile',
  '/settings': 'Settings'
};

export default function Header({ user = null,onMenuClick }) {
  const pathname = usePathname();
  

  const getPageTitle = () => {
    return pageTitles[pathname];
  };
  const userData = user;

  return (
    <header className="sticky top-0 z-10 h-18 bg-white border-b border-gray-200 w-full flex items-center justify-between px-6">

       <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full" onClick={onMenuClick}>
        <IoMenu size={30} />
      </button>

      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
      </div>
      

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:outline-none text-sm w-40 md:w-48 lg:w-64"
          />
        </div>
        
        {/* Notifications */}
        <button 
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <FiBell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Settings */}
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <FiSettings size={20} />
        </button>
        

        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              {userData.name.split(' ')[0]}
            </span>
            <FiChevronDown className="text-gray-500 transition-transform" />
          </button>
          
          
        </div>
      </div>

     
    </header>
  );
}