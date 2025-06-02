import React from 'react';
import { 
  Star, Phone, TrendingUp, Trophy, Zap, Brain, 
  Check, Rocket, DollarSign 
} from 'lucide-react';
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

export default function Achievements() {
  return (
    <div className="space-y-6">
      {/* Gamification Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🏆 אזור ההישגים</h2>
            <p className="text-yellow-100">השג הישגים, צבור נקודות והפוך לאגדה במכירות!</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold">128</p>
            <p className="text-yellow-100">נקודות</p>
          </div>
        </div>
      </div>

      {/* All Achievements Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">כל ההישגים</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const IconComponent = iconMap[achievement.icon];
            return (
              <div 
                key={achievement.id} 
                className={`relative p-6 rounded-xl transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 transform hover:scale-105 cursor-pointer' 
                    : 'bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  {IconComponent && (
                    <IconComponent 
                      className={`w-16 h-16 mb-3 ${
                        achievement.unlocked ? 'text-orange-500' : 'text-gray-400'
                      }`} 
                    />
                  )}
                  <p className="font-semibold text-center text-gray-800">{achievement.name}</p>
                  <p className="text-xs text-gray-500 text-center mt-2">{achievement.description}</p>
                  {!achievement.unlocked && (
                    <>
                      <div className="mt-4 w-full">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">{achievement.progress}%</p>
                      </div>
                      {achievement.unlocked === false && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-20 rounded-xl"></div>
                      )}
                    </>
                  )}
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-800">אתגרים יומיים</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <Phone className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">+50</span>
            </div>
            <p className="font-semibold text-gray-800">מרתון שיחות</p>
            <p className="text-sm text-gray-600 mt-1">בצע 20 שיחות היום</p>
            <div className="mt-3">
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(12/20) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">12/20 שיחות</p>
            </div>
          </div>

          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">+100</span>
            </div>
            <p className="font-semibold text-gray-800">סוגר עסקאות</p>
            <p className="text-sm text-gray-600 mt-1">סגור 3 עסקאות היום</p>
            <div className="mt-3">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(1/3) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">1/3 עסקאות</p>
            </div>
          </div>

          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <div className="flex items-center justify-between mb-3">
              <Star className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-600">+75</span>
            </div>
            <p className="font-semibold text-gray-800">שביעות רצון</p>
            <p className="text-sm text-gray-600 mt-1">קבל 5 דירוגים חיוביים</p>
            <div className="mt-3">
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(3/5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">3/5 דירוגים</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Shop */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">חנות פרסים</h3>
        <p className="text-gray-600 mb-4">המר את הנקודות שלך לפרסים מדהימים!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">☕</div>
            <h4 className="font-semibold">כרטיס קפה</h4>
            <p className="text-sm text-gray-600 mt-1">קפה ומאפה במתנה</p>
            <p className="text-purple-600 font-bold mt-3">50 נקודות</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎬</div>
            <h4 className="font-semibold">כרטיס קולנוע</h4>
            <p className="text-sm text-gray-600 mt-1">2 כרטיסים לסרט</p>
            <p className="text-purple-600 font-bold mt-3">150 נקודות</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🏖️</div>
            <h4 className="font-semibold">יום חופש</h4>
            <p className="text-sm text-gray-600 mt-1">יום חופש נוסף</p>
            <p className="text-purple-600 font-bold mt-3">500 נקודות</p>
          </div>
        </div>
      </div>
    </div>
  );
}