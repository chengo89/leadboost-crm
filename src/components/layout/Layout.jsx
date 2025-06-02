import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, activeView, setActiveView, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex relative">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Header 
          activeView={activeView}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 p-3 lg:p-6 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}