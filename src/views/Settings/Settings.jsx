import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Phone, Award, Check, Save, Camera, Moon, Sun, 
  Globe, Clock, Upload, X, User, Palette, AlertCircle 
} from 'lucide-react';

export default function Settings({ showToast }) {
  // Profile Image State
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || null;
  });
  const fileInputRef = useRef(null);

  // Load saved data from localStorage or use defaults
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      fullName: 'יוסי כהן',
      role: 'נציג מכירות בכיר',
      email: 'yossi@leadboost.com',
      phone: '050-1234567'
    };
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : {
      newLeads: true,
      callReminders: true,
      achievements: true
    };
  });

  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('systemSettings');
    return saved ? JSON.parse(saved) : {
      language: 'he',
      theme: 'light',
      timezone: 'IL'
    };
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Apply theme on mount and changes
  useEffect(() => {
    applyTheme(systemSettings.theme);
  }, [systemSettings.theme]);

  // Apply language direction
  useEffect(() => {
    document.documentElement.dir = systemSettings.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = systemSettings.language;
  }, [systemSettings.language]);

  // Track changes
  useEffect(() => {
    setHasChanges(true);
  }, [formData, notifications, systemSettings]);

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.body.style.backgroundColor = '#1a1a1a';
    } else if (theme === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 6) {
        document.documentElement.classList.add('dark-theme');
        document.body.style.backgroundColor = '#1a1a1a';
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.style.backgroundColor = '#f3f4f6';
      }
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.body.style.backgroundColor = '#f3f4f6';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validation
    if (name === 'phone') {
      // Allow only numbers and dashes
      const cleaned = value.replace(/[^\d-]/g, '');
      setFormData({ ...formData, [name]: cleaned });
    } else if (name === 'email') {
      // Basic email validation
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNotificationChange = (key) => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key]
    };
    setNotifications(newNotifications);
    
    // Show immediate feedback
    showToast(newNotifications[key] 
      ? `התראות ${getNotificationName(key)} הופעלו` 
      : `התראות ${getNotificationName(key)} כובו`
    );
  };

  const getNotificationName = (key) => {
    const names = {
      newLeads: 'לידים חדשים',
      callReminders: 'תזכורות שיחות',
      achievements: 'הישגים'
    };
    return names[key] || key;
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings({
      ...systemSettings,
      [name]: value
    });
    
    // Immediate feedback for theme changes
    if (name === 'theme') {
      showToast(`ערכת נושא שונתה ל${value === 'dark' ? 'כהה' : value === 'light' ? 'בהיר' : 'אוטומטי'}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('הקובץ גדול מדי. מקסימום 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
        
        // Update sidebar
        const event = new CustomEvent('profileImageUpdated', { 
          detail: { image: reader.result } 
        });
        window.dispatchEvent(event);
        
        showToast('תמונת הפרופיל עודכנה בהצלחה!');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    
    const event = new CustomEvent('profileImageUpdated', { 
      detail: { image: null } 
    });
    window.dispatchEvent(event);
    
    showToast('תמונת הפרופיל הוסרה');
  };

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('כתובת האימייל אינה תקינה');
      return false;
    }
    
    // Phone validation
    const phoneRegex = /^0\d{2}-?\d{7}$/;
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      showToast('מספר הטלפון אינו תקין');
      return false;
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
    
    // Update the sidebar user info
    const event = new CustomEvent('userProfileUpdated', { 
      detail: { name: formData.fullName, role: formData.role } 
    });
    window.dispatchEvent(event);
    
    setIsSaving(false);
    setHasChanges(false);
    showToast('ההגדרות נשמרו בהצלחה! ✓');
  };

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל ההגדרות?')) {
      // Reset to defaults
      const defaults = {
        fullName: 'יוסי כהן',
        role: 'נציג מכירות בכיר',
        email: 'yossi@leadboost.com',
        phone: '050-1234567'
      };
      const defaultNotifications = {
        newLeads: true,
        callReminders: true,
        achievements: true
      };
      const defaultSystem = {
        language: 'he',
        theme: 'light',
        timezone: 'IL'
      };
      
      setFormData(defaults);
      setNotifications(defaultNotifications);
      setSystemSettings(defaultSystem);
      setProfileImage(null);
      
      // Clear localStorage
      localStorage.clear();
      
      // Update UI
      applyTheme('light');
      document.documentElement.dir = 'rtl';
      
      // Update sidebar
      const event = new CustomEvent('userProfileUpdated', { 
        detail: { name: defaults.fullName, role: defaults.role } 
      });
      window.dispatchEvent(event);
      
      const imageEvent = new CustomEvent('profileImageUpdated', { 
        detail: { image: null } 
      });
      window.dispatchEvent(imageEvent);
      
      showToast('כל ההגדרות אופסו בהצלחה');
    }
  };

  const exportSettings = () => {
    const allSettings = {
      profile: formData,
      notifications,
      system: systemSettings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allSettings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `leadboost-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('ההגדרות יוצאו בהצלחה');
  };

  return (
    <div className="space-y-6">
      {/* Save Indicator */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">יש שינויים שלא נשמרו</span>
          </div>
          <button 
            onClick={handleSave}
            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
          >
            שמור עכשיו
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">הגדרות אישיות</h3>
        
        {/* Profile Settings */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-700 mb-4">פרופיל</h4>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                )}
              </div>
              {profileImage && (
                <button
                  onClick={removeProfileImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                העלה תמונה
              </button>
              <p className="text-xs text-gray-500 mt-1">תמונת פרופיל תופיע בכל המערכת</p>
              <p className="text-xs text-gray-400">מקסימום 5MB, JPG/PNG</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">שם מלא *</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תפקיד</label>
              <input 
                type="text" 
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">אימייל *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">טלפון *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="050-1234567"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-700 mb-4">התראות</h4>
          <div className="space-y-3">
            <label 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => handleNotificationChange('newLeads')}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="text-gray-700">התראות על לידים חדשים</span>
                  <p className="text-xs text-gray-500">קבל התראה כשנכנס ליד חדש למערכת</p>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={notifications.newLeads}
                  onChange={() => {}}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                  notifications.newLeads ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                    notifications.newLeads ? 'translate-x-5' : 'translate-x-1'
                  } mt-1`}></div>
                </div>
              </div>
            </label>
            
            <label 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => handleNotificationChange('callReminders')}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="text-gray-700">תזכורות לשיחות</span>
                  <p className="text-xs text-gray-500">תזכורות לשיחות מתוכננות</p>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={notifications.callReminders}
                  onChange={() => {}}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                  notifications.callReminders ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                    notifications.callReminders ? 'translate-x-5' : 'translate-x-1'
                  } mt-1`}></div>
                </div>
              </div>
            </label>
            
            <label 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => handleNotificationChange('achievements')}
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-600" />
                <div>
                  <span className="text-gray-700">עדכונים על הישגים</span>
                  <p className="text-xs text-gray-500">קבל התראה כשאתה משיג הישג חדש</p>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={notifications.achievements}
                  onChange={() => {}}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                  notifications.achievements ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${
                    notifications.achievements ? 'translate-x-5' : 'translate-x-1'
                  } mt-1`}></div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              איפוס הגדרות
            </button>
            <button 
              onClick={exportSettings}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ייצוא הגדרות
            </button>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className={`px-6 py-3 rounded-lg transform transition-all duration-200 flex items-center gap-2 ${
              isSaving || !hasChanges 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                שומר...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                שמור שינויים
              </>
            )}
          </button>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">הגדרות מערכת</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              שפת ממשק
            </label>
            <select 
              name="language"
              value={systemSettings.language}
              onChange={handleSystemChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="he">עברית</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              ערכת נושא
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSystemChange({ target: { name: 'theme', value: 'light' }})}
                className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  systemSettings.theme === 'light' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>בהיר</span>
              </button>
              <button
                onClick={() => handleSystemChange({ target: { name: 'theme', value: 'dark' }})}
                className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  systemSettings.theme === 'dark' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span>כהה</span>
              </button>
              <button
                onClick={() => handleSystemChange({ target: { name: 'theme', value: 'auto' }})}
                className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  systemSettings.theme === 'auto' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span>אוטומטי</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {systemSettings.theme === 'auto' && 'מצב אוטומטי: כהה בשעות 19:00-06:00'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              איזור זמן
            </label>
            <select 
              name="timezone"
              value={systemSettings.timezone}
              onChange={handleSystemChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="IL">ישראל (GMT+3)</option>
              <option value="NY">ניו יורק (GMT-5)</option>
              <option value="LON">לונדון (GMT+0)</option>
              <option value="TLV">תל אביב (GMT+3)</option>
              <option value="LA">לוס אנג'לס (GMT-8)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">סטטיסטיקות פרופיל</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">128</p>
            <p className="text-sm text-gray-600">נקודות</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">142</p>
            <p className="text-sm text-gray-600">מכירות</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">28%</p>
            <p className="text-sm text-gray-600">המרה</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">7</p>
            <p className="text-sm text-gray-600">ימי רצף</p>
          </div>
        </div>
      </div>
    </div>
  );
}