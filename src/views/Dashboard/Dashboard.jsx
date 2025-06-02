import React, { useState } from 'react';
import DailyChallenge from './DailyChallenge';
import StatsCards from './StatsCards';
import Leaderboard from './Leaderboard';
import AchievementsWidget from './AchievementsWidget';
import PerformanceCharts from './PerformanceCharts';
import { STATS } from '../../data/mockData';

export default function Dashboard({ showToast }) {
  const [dailyChallenge] = useState({ completed: false, target: 20, current: 12 });
  const [userStreak] = useState(7);

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Daily Challenge Banner */}
      <DailyChallenge 
        dailyChallenge={dailyChallenge}
        userStreak={userStreak}
      />

      {/* Stats Cards */}
      <StatsCards stats={STATS} />

      {/* Charts Row */}
      <PerformanceCharts />

      {/* Leaderboard & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Leaderboard />
        <AchievementsWidget />
      </div>
    </div>
  );
}