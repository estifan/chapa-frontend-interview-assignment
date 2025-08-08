'use client';

import { usePathname } from 'next/navigation';
import Image from "next/image";
import { 
    AiFillHome, 
    AiOutlineTransaction, 
    AiOutlineUser, 
    AiOutlineCreditCard, 
    AiOutlineSetting,
    AiOutlineLogout,
    AiOutlineBell,
    AiOutlineTeam
} from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

export default function SideNav() {
    const pathname = usePathname();
    const {logout} = useContext(AuthContext);

    const navItems = [
        { 
            name: 'Dashboard', 
            icon: <AiFillHome size={20} />, 
            path: '/dashboard/user' 
        },
        { 
            name: 'Transactions', 
            icon: <AiOutlineTransaction size={20} />, 
            path: '/dashboard/user/transactions' 
        },
        { 
            name: 'Beneficiaries', 
            icon: <AiOutlineTeam size={20} />, 
            path: '/dashboard/user/beneficiaries' 
        },
        { 
            name: 'Cards', 
            icon: <AiOutlineCreditCard size={20} />, 
            path: '/dashboard/user/cards' 
        },
        { 
            name: 'Notifications', 
            icon: <AiOutlineBell size={20} />, 
            path: '/dashboard/user/notifications' 
        },
        { 
            name: 'Profile', 
            icon: <AiOutlineUser size={20} />, 
            path: '/dashboard/user/profile' 
        },
        { 
            name: 'Settings', 
            icon: <AiOutlineSetting size={20} />, 
            path: '/dashboard/user/settings' 
        },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="px-6 py-4 border-b border-gray-100">
                <Image 
                    src="/logo.svg" 
                    alt="Chapa Logo" 
                    width={130} 
                    height={40} 
                    className="h-10 w-auto"
                    priority
                />
            </div>
            
            {/* Navigation Items */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <a
                            key={item.name}
                            href={item.path}
                            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                isActive 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <span className={`mr-3 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                {item.icon}
                            </span>
                            {item.name}
                            {isActive && (
                                <span className="ml-auto w-1 h-6 bg-primary rounded-l-lg"></span>
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100">
                <a
                    href="#"
                    onClick={() => logout()}
                    className="group flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                    <AiOutlineLogout className="mr-3 text-red-400 group-hover:text-red-500" size={20} />
                    Logout
                </a>
            </div>
        </div>
    );
}