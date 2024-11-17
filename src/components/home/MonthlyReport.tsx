import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Star } from 'lucide-react';
import type { Habit } from '../../types';

interface MonthlyReportProps {
  habits: Habit[];
  onClose: () => void;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ habits, onClose }) => {
  const calculateMonthStats = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let totalSuccesses = 0;
    let totalFailures = 0;
    const habitStats: { habit: Habit; successRate: number }[] = [];

    habits.forEach(habit => {
      let successes = 0;
      let failures = 0;

      Object.entries(habit.dailyRecords).forEach(([date, completed]) => {
        const recordDate = new Date(date);
        if (recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear) {
          if (completed) {
            successes++;
            totalSuccesses++;
          } else {
            failures++;
            totalFailures++;
          }
        }
      });

      const totalDays = successes + failures;
      const successRate = totalDays > 0 ? (successes / totalDays) * 100 : 0;
      habitStats.push({ habit, successRate });
    });

    // Sort habits by success rate
    const sortedHabits = [...habitStats].sort((a, b) => b.successRate - a.successRate);

    // Calculate overall score (0-10)
    const totalDays = totalSuccesses + totalFailures;
    const overallScore = totalDays > 0 
      ? Math.round((totalSuccesses / totalDays) * 10) 
      : 0;

    return {
      totalSuccesses,
      totalFailures,
      bestHabits: sortedHabits.slice(0, 3),
      worstHabits: sortedHabits.slice(-3).reverse(),
      overallScore
    };
  };

  const stats = calculateMonthStats();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  const getScoreMessage = (score: number) => {
    if (score >= 9) return "Exceptional month! You're crushing your goals! 🌟";
    if (score >= 7) return "Great progress! Keep up the momentum! 💪";
    if (score >= 5) return "Steady progress. Room for improvement! 🎯";
    if (score >= 3) return "Keep pushing! Small steps lead to big changes. 🌱";
    return "Don't give up! Every day is a new opportunity. ✨";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[#f8f4b2]" />
              <h2 className="text-xl font-semibold">Monthly Report</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Month Overview */}
          <div className="text-center p-6 bg-[#f8f4b2] bg-opacity-20 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentMonth}</h3>
            <div className="text-4xl font-bold text-[#f8f4b2] mb-2">
              {stats.overallScore}/10
            </div>
            <p className="text-gray-600">{getScoreMessage(stats.overallScore)}</p>
          </div>

          {/* Success/Failure Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-semibold mb-1">Successes</div>
              <div className="text-2xl font-bold text-green-700">
                {stats.totalSuccesses} days
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 font-semibold mb-1">Missed</div>
              <div className="text-2xl font-bold text-red-700">
                {stats.totalFailures} days
              </div>
            </div>
          </div>

          {/* Best Performing Habits */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Best Performing Habits</h3>
            </div>
            <div className="space-y-2">
              {stats.bestHabits.map(({ habit, successRate }) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{habit.emoji}</span>
                    <span className="font-medium">{habit.title}</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {Math.round(successRate)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Improvement */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold">Needs Improvement</h3>
            </div>
            <div className="space-y-2">
              {stats.worstHabits.map(({ habit, successRate }) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{habit.emoji}</span>
                    <span className="font-medium">{habit.title}</span>
                  </div>
                  <span className="text-red-600 font-semibold">
                    {Math.round(successRate)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;