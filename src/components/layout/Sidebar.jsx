import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Phone, TrendingUp, Award, Settings, User, X 
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'לוח בקרה', icon: BarChart3 },
  { id: 'leads', label: 'לידים', icon: Users },
  { id: 'calls', label: 'שיחות', icon: Phone },
  { id: 'performance', label: 'ביצועים', icon: TrendingUp },
  { id: 'achievements', label: 'הישגים', icon: Award },
  { id: 'settings', label: 'הגדרות', icon: Settings },
];

export default function Sidebar({ activeView, setActiveView, sidebarOpen, setSidebarOpen }) {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      fullName: 'יוסי כהן',
      role: 'נציג בכיר'
    };
  });

  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });

  useEffect(() => {
    // Listen for profile updates
    const handleProfileUpdate = (event) => {
      setUserProfile({
        fullName: event.detail.name,
        role: event.detail.role
      });
    };

    const handleImageUpdate = (event) => {
      setProfileImage(event.detail.image);
    };

    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    window.addEventListener('profileImageUpdated', handleImageUpdate);
    
    // Check localStorage on mount
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile({
        fullName: profile.fullName,
        role: profile.role
      });
    }

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }

    return () => {
      window.removeEventListener('userProfileUpdated', handleProfileUpdate);
      window.removeEventListener('profileImageUpdated', handleImageUpdate);
    };
  }, []);

  if (!sidebarOpen) return null;

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white flex flex-col z-50 animate-slide-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-xl lg:text-2xl">LeadBoost</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-purple-600 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                activeView === item.id 
                  ? 'bg-purple-600 shadow-lg' 
                  : 'hover:bg-purple-600/50'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm lg:text-base">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div 
          className="flex items-center gap-3 p-3 bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
          onClick={() => {
            setActiveView('settings');
            setSidebarOpen(false);
          }}
        >
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt={userProfile.fullName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs lg:text-sm font-bold">
                {getInitials(userProfile.fullName)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm lg:text-base">{userProfile.fullName}</p>
            <p className="text-xs lg:text-sm text-purple-200">{userProfile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}