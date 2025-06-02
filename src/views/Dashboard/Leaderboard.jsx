import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LEADERBOARD } from '../../data/mockData';

export default function Leaderboard() {
  return (
    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-base lg:text-xl font-bold text-gray-800">🏆 לוח תוצאות</h3>
        <span className="text-xs lg:text-sm text-gray-500">מתעדכן בזמן אמת</span>
      </div>
      <div className="space-y-3 lg:space-y-4">
        {LEADERBOARD.slice(0, 3).map((member, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-300 ${
              member.isCurrentUser 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="text-lg lg:text-2xl font-bold text-gray-400">#{index + 1}</div>
              <div className="text-2xl lg:text-3xl">{member.avatar}</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm lg:text-base">{member.name}</p>
                <p className="text-xs lg:text-sm text-gray-500">{member.deals} עסקאות</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-1">
                {member.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 lg:w-4 lg:h-4 text-red-500" />
                )}
                <span className={`text-xs lg:text-sm ${
                  member.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {Math.abs(member.change)}%
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{member.score}</p>
                <p className="text-xs lg:text-sm text-gray-500">נקודות</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}