import React, { useState } from 'react';
import { Check, X, TrendingUp, BarChart3 } from 'lucide-react';
import HabitSuccessGraph from './HabitSuccessGraph';
import MonthlyReport from './MonthlyReport';
import type { Habit } from '../../types';

interface StatsOverviewProps {
  totalHabits: number;
  completedHabits: number;
  remainingHabits: number;
  habits: Habit[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalHabits,
  completedHabits,
  remainingHabits,
  habits
}) => {
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const currentDay = today.getDay();
  const todaysHabits = habits.filter(habit => 
    habit.selectedDays.includes(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDay])
  );

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Today, {formattedDate}
          </h2>
          
          <p className="text-gray-600">
            You have {todaysHabits.length} habit{todaysHabits.length !== 1 ? 's' : ''} scheduled for today
          </p>
        </div>
        
        <button
          onClick={() => setShowMonthlyReport(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#f8f4b2] text-gray-900 rounded-lg hover:bg-[#e8e4a2] transition-colors"
        >
          <BarChart3 size={20} />
          <span>Monthly Report</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        {completedHabits > 0 && (
          <div className="flex items-center gap-2 text-green-600">
            <Check size={20} className="stroke-2" />
            <span className="font-medium">{completedHabits} completed</span>
          </div>
        )}
        
        {remainingHabits > 0 && (
          <div className="flex items-center gap-2 text-gray-500">
            <X size={20} className="stroke-2" />
            <span className="font-medium">{remainingHabits} remaining</span>
          </div>
        )}
      </div>

      {habits.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-[#f8f4b2]" />
            <h3 className="text-lg font-medium text-gray-900">Success Rate</h3>
          </div>
          <div className="h-[300px]">
            <HabitSuccessGraph habits={habits} />
          </div>
        </div>
      )}

      {showMonthlyReport && (
        <MonthlyReport
          habits={habits}
          onClose={() => setShowMonthlyReport(false)}
        />
      )}
    </section>
  );
};

export default StatsOverview;