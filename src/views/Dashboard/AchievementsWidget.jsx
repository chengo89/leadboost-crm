import React from 'react';
import { Star, Phone, TrendingUp, Trophy, Zap, Brain } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/mockData';

// Map icon names to actual components
const iconMap = {
  Star,
  Phone,
  TrendingUp,
  Trophy,
  Zap,
  Brain
};

export default function AchievementsWidget() {
  return (
    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-base lg:text-xl font-bold text-gray-800">🎖️ הישגים</h3>
        <span className="text-xs lg:text-sm text-gray-500">
          {ACHIEVEMENTS.filter(a => a.unlocked).length}/{ACHIEVEMENTS.length} הושגו
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 lg:gap-4">
        {ACHIEVEMENTS.slice(0, 6).map((achievement) => {
          const IconComponent = iconMap[achievement.icon];
          return (
            <div 
              key={achievement.id} 
              className={`relative flex flex-col items-center p-2 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 transform hover:scale-110' 
                  : 'bg-gray-100'
              }`}
            >
              {IconComponent && (
                <IconComponent 
                  className={`w-8 h-8 lg:w-12 lg:h-12 mb-1 lg:mb-2 ${
                    achievement.unlocked ? 'text-orange-500' : 'text-gray-400'
                  }`} 
                />
              )}
              <p className="text-xs lg:text-sm font-semibold text-center text-gray-800">
                {achievement.name}
              </p>
              {!achievement.unlocked && (
                <div className="absolute bottom-1 left-1 right-1 lg:bottom-2 lg:left-2 lg:right-2">
                  <div className="w-full bg-gray-300 rounded-full h-0.5 lg:h-1">
                    <div 
                      className="bg-orange-500 h-0.5 lg:h-1 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}