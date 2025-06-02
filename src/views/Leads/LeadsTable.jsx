import React from 'react';
import { Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';
import { getStatusColor, getSentimentIcon, getStageInfo } from '../../utils/helpers';

export default function LeadsTable({ leads, onSelectLead }) {
  return (
    <>
      {/* Mobile Cards View */}
      <div className="lg:hidden p-4 space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div 
                className="flex-1"
                onClick={() => onSelectLead(lead)}
              >
                <h4 className="font-semibold text-gray-800">{lead.name}</h4>
                <p className="text-sm text-gray-600">{lead.phone}</p>
                <p className="text-sm text-gray-500">{lead.currentProvider} • {lead.packageType}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                  {lead.status === 'hot' ? '🔥' : lead.status === 'warm' ? '☀️' : '❄️'}
                </span>
                <span className="text-2xl">{getSentimentIcon(lead.sentiment)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStageInfo(lead.stage).color}`}>
                  {getStageInfo(lead.stage).label}
                </span>
                <span className="text-sm font-semibold">₪{lead.monthlyValue}</span>
              </div>
              
              <div className="flex gap-1">
                <a href={`tel:${lead.phone}`} className="inline-block">
                  <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </button>
                </a>
                <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right p-6 font-semibold text-gray-700">שם</th>
              <th className="text-right p-6 font-semibold text-gray-700">ספק נוכחי</th>
              <th className="text-right p-6 font-semibold text-gray-700">חבילה מבוקשת</th>
              <th className="text-right p-6 font-semibold text-gray-700">סטטוס</th>
              <th className="text-right p-6 font-semibold text-gray-700">שלב</th>
              <th className="text-right p-6 font-semibold text-gray-700">ציון</th>
              <th className="text-right p-6 font-semibold text-gray-700">סנטימנט</th>
              <th className="text-right p-6 font-semibold text-gray-700">ערך חודשי</th>
              <th className="text-right p-6 font-semibold text-gray-700">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="p-6">
                  <div 
                    className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
                    onClick={() => onSelectLead(lead)}
                  >
                    <p className="font-semibold text-gray-800">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                  </div>
                </td>
                <td className="p-6">
                  <div>
                    <p className="font-medium text-gray-700">{lead.currentProvider}</p>
                    <p className="text-sm text-gray-500">גודל משפחה: {lead.familySize}</p>
                  </div>
                </td>
                <td className="p-6">
                  <div>
                    <p className="font-medium text-gray-700">{lead.packageType}</p>
                    <div className="flex gap-1 mt-1">
                      {lead.interests.slice(0, 2).map((interest, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                    {lead.status === 'hot' ? 'חם 🔥' : lead.status === 'warm' ? 'חמים ☀️' : 'קר ❄️'}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStageInfo(lead.stage).color}`}>
                    {getStageInfo(lead.stage).label}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          lead.score > 80 ? 'bg-green-500' : lead.score > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{lead.score}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-2xl">{getSentimentIcon(lead.sentiment)}</span>
                </td>
                <td className="p-6">
                  <p className="font-semibold">₪{lead.monthlyValue}/חודש</p>
                </td>
                <td className="p-6">
                  <div className="flex gap-2">
                    <a href={`tel:${lead.phone}`} className="inline-block">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="התקשר">
                        <Phone className="w-4 h-4" />
                      </button>
                    </a>
                    <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200" title="WhatsApp">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors duration-200" title="שלח מייל">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onSelectLead(lead)}
                      className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200" 
                      title="פרטים נוספים"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}