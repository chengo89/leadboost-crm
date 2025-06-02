import React from 'react';
import { 
  DollarSign, Phone, TrendingUp, Star, Trophy, ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { STATS, PERFORMANCE_DATA, TEAM_PERFORMANCE } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function Performance() {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-500">החודש</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{STATS.monthlyTarget.current}</p>
          <p className="text-sm text-gray-600 mt-1">מכירות</p>
          <div className="mt-4 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">
              {formatCurrency(STATS.monthlyTarget.current * STATS.avgPackageValue)} הכנסות
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Phone className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-500">היום</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{STATS.callsToday}</p>
          <p className="text-sm text-gray-600 mt-1">שיחות</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">75% מהיעד היומי</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-500">ממוצע</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{STATS.conversionRate}%</p>
          <p className="text-sm text-gray-600 mt-1">המרה</p>
          <div className="mt-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">מקום 3 בצוות</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-gray-500">ממוצע</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">4.8/5</p>
          <p className="text-sm text-gray-600 mt-1">דירוג לקוחות</p>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= 4.8 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Trend */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">מגמת ביצועים חודשית</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="מכירות" />
              <Area type="monotone" dataKey="calls" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="שיחות" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Team Comparison Radar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">השוואה לממוצע הצוות</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={TEAM_PERFORMANCE}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="subject" stroke="#666" />
              <PolarRadiusAxis stroke="#666" />
              <Radar name="אתה" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Radar name="ממוצע צוות" dataKey="B" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personal Goals */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">יעדים אישיים</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">יעד מכירות חודשי</span>
              <span className="text-sm text-gray-500">
                {STATS.monthlyTarget.current}/{STATS.monthlyTarget.target}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(STATS.monthlyTarget.current / STATS.monthlyTarget.target) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">שיחות יומיות</span>
              <span className="text-sm text-gray-500">47/60</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: '78%' }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">אחוז המרה</span>
              <span className="text-sm text-gray-500">28%/30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: '93%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}