import React from 'react';
import { Menu, Bell, Search, Plus } from 'lucide-react';

const viewTitles = {
  dashboard: 'לוח בקרה',
  leads: 'ניהול לידים',
  calls: 'מרכז השיחות',
  performance: 'ביצועים אישיים',
  achievements: 'הישגים ותגמולים',
  settings: 'הגדרות'
};

export default function Header({ activeView, setSidebarOpen }) {
  return (
    <header className="bg-white shadow-md p-3 lg:p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 truncate">
            {viewTitles[activeView]}
          </h2>
          <span className="text-xs lg:text-sm text-gray-500 hidden sm:block">
            {new Date().toLocaleDateString('he-IL')}
          </span>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button className="p-1.5 lg:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-1.5 lg:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 hidden sm:block">
            <Search className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 lg:gap-2 text-sm lg:text-base">
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">פעולה מהירה</span>
          </button>
        </div>
      </div>
    </header>
  );
}