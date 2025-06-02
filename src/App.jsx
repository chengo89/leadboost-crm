import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard/Dashboard';
import Leads from './views/Leads/Leads';
import Calls from './views/Calls/Calls';
import Performance from './views/Performance/Performance';
import Achievements from './views/Achievements/Achievements';
import Settings from './views/Settings/Settings';
import NotificationToast from './components/common/NotificationToast';
import './styles/animations.css';
import './styles/darkTheme.css';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard showToast={showToast} />;
      case 'leads':
        return <Leads showToast={showToast} />;
      case 'calls':
        return <Calls showToast={showToast} />;
      case 'performance':
        return <Performance />;
      case 'achievements':
        return <Achievements />;
      case 'settings':
        return <Settings showToast={showToast} />;
      default:
        return <Dashboard showToast={showToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <Layout
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        {renderView()}
      </Layout>
      
      {showNotification && (
        <NotificationToast message={notificationMessage} />
      )}
    </div>
  );
}