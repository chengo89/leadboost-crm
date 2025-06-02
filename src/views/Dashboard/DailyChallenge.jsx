import React from 'react';
import { Flame } from 'lucide-react';

export default function DailyChallenge({ dailyChallenge, userStreak }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <h3 className="text-lg lg:text-2xl font-bold mb-2">🎯 אתגר יומי: 20 שיחות</h3>
          <p className="text-purple-100 text-sm lg:text-base">
            כבר ביצעת {dailyChallenge.current} שיחות מתוך {dailyChallenge.target}
          </p>
          <div className="w-full max-w-md bg-purple-300 rounded-full h-3 lg:h-4 mt-3">
            <div 
              className="bg-white rounded-full h-3 lg:h-4 transition-all duration-500"
              style={{ width: `${(dailyChallenge.current / dailyChallenge.target) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <Flame className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-300 mb-2" />
          <p className="text-2xl lg:text-3xl font-bold">{userStreak}</p>
          <p className="text-xs lg:text-sm">ימי רצף 🔥</p>
        </div>
      </div>
    </div>
  );
}