import React, { useState } from 'react';
import { Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';

export function Header({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: 'New inward mail assigned to you', time: '5 mins ago', read: false },
        { id: 2, text: 'Mail status updated to In Progress', time: '15 mins ago', read: false },
        { id: 3, text: 'Department meeting scheduled', time: '1 hour ago', read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    <p className="text-sm text-gray-500">You have {unreadCount} unread notifications</p>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'
                                                    }`}></div>
                                                <div className="flex-1">
                                                    <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'
                                                        }`}>
                                                        {notification.text}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200">
                                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    SA
                                </div>
                                <span className="text-sm font-medium text-gray-700">System Admin</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </div>
                        </button>

                        {/* User Menu Dropdown */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                            SA
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">System Admin</p>
                                            <p className="text-sm text-gray-500">admin@tapaal.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <button 
                                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                        onClick={() => onNavigate && onNavigate('profile')}
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </button>
                                    <button 
                                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                        onClick={() => onNavigate && onNavigate('settings')}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
