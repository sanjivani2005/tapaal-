import React, { useState } from 'react';
import { LayoutDashboard, Mail, Users, BarChart3, Map, Building2, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'inward', label: 'Inward Mails', icon: Mail },
        { id: 'outward', label: 'Outward Mails', icon: Mail },

        { id: 'departments', label: 'Departments', icon: Building2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'tracking', label: 'Tracking', icon: Map },
    ];

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out relative`}>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-8 bg-slate-800 text-white rounded-full p-1.5 hover:bg-slate-700 transition-colors z-10 border border-slate-600"
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>

            {/* Header */}
            <div className="p-6 border-b border-slate-700">
                <h1 className={`font-bold transition-all duration-300 ${isCollapsed ? 'text-lg text-center' : 'text-xl'}`}>
                    {isCollapsed ? 'T' : 'Tapaal'}
                </h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group ${
                                isActive
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <span className="transition-all duration-300">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
