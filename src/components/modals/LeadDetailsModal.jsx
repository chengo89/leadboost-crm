import React, { useState } from 'react';
import { 
  X, Phone, Mail, MapPin, Package, Globe, Calendar, 
  Brain, MessageSquare 
} from 'lucide-react';
import { getStatusColor, getSentimentIcon, getStageInfo } from '../../utils/helpers';

export default function LeadDetailsModal({ lead, onClose }) {
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800">פרטי ליד</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 overflow-y-auto">
          {/* Lead Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-lg lg:text-2xl font-bold text-white">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-base lg:text-xl font-bold text-gray-800">{lead.name}</h3>
                <p className="text-sm lg:text-base text-gray-600">{lead.currentProvider} | גודל משפחה: {lead.familySize}</p>
                <div className="flex items-center gap-2 lg:gap-3 mt-2 flex-wrap">
                  <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                    {lead.status === 'hot' ? 'חם 🔥' : lead.status === 'warm' ? 'חמים ☀️' : 'קר ❄️'}
                  </span>
                  <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold text-white ${getStageInfo(lead.stage).color}`}>
                    {getStageInfo(lead.stage).label}
                  </span>
                  <span className="text-xl lg:text-2xl">{getSentimentIcon(lead.sentiment)}</span>
                </div>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">₪{lead.monthlyValue}/חודש</p>
              <p className="text-xs lg:text-sm text-gray-500">ערך חודשי</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4 lg:mb-6 overflow-x-auto">
            <div className="flex gap-4 lg:gap-6 min-w-max">
              {['overview', 'timeline', 'notes', 'tasks'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-2 lg:pb-3 px-1 border-b-2 transition-colors duration-200 text-sm lg:text-base whitespace-nowrap ${
                    selectedTab === tab 
                      ? 'border-blue-500 text-blue-600 font-semibold' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab === 'overview' ? 'סקירה' :
                   tab === 'timeline' ? 'ציר זמן' :
                   tab === 'notes' ? 'הערות' : 'משימות'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm lg:text-base">פרטי קשר</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">{lead.city}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm lg:text-base">מידע נוסף</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Package className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">חבילה מבוקשת: {lead.packageType}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">מקור: {lead.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                      <span className="text-sm lg:text-base text-gray-600">קשר אחרון: {lead.lastContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm lg:text-base">תחומי עניין</h4>
                <div className="flex gap-2 flex-wrap">
                  {lead.interests.map((interest, idx) => (
                    <span key={idx} className="px-2 lg:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs lg:text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm lg:text-base">תובנות AI</h4>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 lg:p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-xs lg:text-sm text-gray-700">
                        הליד מראה עניין גבוה בחבילה משפחתית. מומלץ להדגיש את הערכים המוספים לילדים כולל ערוצי ילדים ו-VOD.
                        הזמן האופטימלי ליצירת קשר: ימי ראשון ורביעי בין 19:00-21:00.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'timeline' && (
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm lg:text-base">שיחת מכירות</p>
                  <p className="text-xs lg:text-sm text-gray-600">שיחה מוצלחת, הלקוח מעוניין בחבילה</p>
                  <p className="text-xs text-gray-500 mt-1">היום, 10:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm lg:text-base">מייל מעקב</p>
                  <p className="text-xs lg:text-sm text-gray-600">נשלחה הצעת מחיר ראשונית</p>
                  <p className="text-xs text-gray-500 mt-1">אתמול, 14:22</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
            <a href={`tel:${lead.phone}`} className="flex-1">
              <button className="w-full py-2.5 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-sm lg:text-base">
                <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                התקשר עכשיו
              </button>
            </a>

            <button className="flex-1 py-2.5 lg:py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm lg:text-base">
              <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              שלח מייל
            </button>
            <button className="flex-1 py-2.5 lg:py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm lg:text-base">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
              קבע פגישה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}