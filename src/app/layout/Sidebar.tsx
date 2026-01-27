import React from 'react';
import { LayoutDashboard, Mail, Users, BarChart3, Map, Building2, Bell } from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'inward', label: 'Inward Mails', icon: Mail },
        { id: 'outward', label: 'Outward Mails', icon: Mail },

        { id: 'departments', label: 'Departments', icon: Building2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'tracking', label: 'Tracking', icon: Map },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold">Tapaal</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-300 hover:bg-slate-800'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
