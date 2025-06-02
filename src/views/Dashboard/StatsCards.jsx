import React from 'react';
import { Users, Phone, TrendingUp, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 lg:w-12 lg:h-12 text-green-200" />
          </div>
          <p className="text-green-100 text-xs lg:text-base">לידים חדשים היום</p>
          <p className="text-2xl lg:text-4xl font-bold mt-1 lg:mt-2">{stats.newLeads}</p>
          <p className="text-xs lg:text-sm text-green-100 mt-1">+12% מאתמול</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Phone className="w-8 h-8 lg:w-12 lg:h-12 text-blue-200" />
          </div>
          <p className="text-blue-100 text-xs lg:text-base">שיחות היום</p>
          <p className="text-2xl lg:text-4xl font-bold mt-1 lg:mt-2">{stats.callsToday}</p>
          <p className="text-xs lg:text-sm text-blue-100 mt-1">ממוצע: 5:23 דק׳</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 lg:w-12 lg:h-12 text-orange-200" />
          </div>
          <p className="text-orange-100 text-xs lg:text-base">מכירות החודש</p>
          <p className="text-2xl lg:text-4xl font-bold mt-1 lg:mt-2">{stats.conversions}</p>
          <p className="text-xs lg:text-sm text-orange-100 mt-1">
            {formatCurrency(stats.conversions * stats.avgPackageValue)}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 lg:w-12 lg:h-12 text-purple-200" />
          </div>
          <p className="text-purple-100 text-xs lg:text-base">יעד חודשי</p>
          <div className="mt-1 lg:mt-2">
            <div className="flex justify-between text-xs lg:text-sm">
              <span>{stats.monthlyTarget.current} מכירות</span>
              <span>{stats.monthlyTarget.target} יעד</span>
            </div>
            <div className="w-full bg-purple-300 rounded-full h-2 lg:h-3 mt-2">
              <div 
                className="bg-white rounded-full h-2 lg:h-3 transition-all duration-500" 
                style={{ width: `${(stats.monthlyTarget.current / stats.monthlyTarget.target) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}