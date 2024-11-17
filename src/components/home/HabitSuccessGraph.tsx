import React from 'react';
import { Habit } from '../../types';
import { getHabitColor } from '../../utils/colors';

interface HabitSuccessGraphProps {
  habits: Habit[];
}

const HabitSuccessGraph: React.FC<HabitSuccessGraphProps> = ({ habits = [] }) => {
  if (!habits || habits.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        No habit data to display yet
      </div>
    );
  }

  // Get last 6 months for X-axis
  const getMonthsArray = () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date);
    }
    return months;
  };

  const months = getMonthsArray();

  // Calculate success rates for each habit over the months
  const habitData = habits.map((habit, index) => {
    const records = habit.dailyRecords || {};
    const dataPoints = months.map(monthDate => {
      const month = monthDate.getMonth();
      const year = monthDate.getFullYear();
      
      // Get all records for this month
      const monthRecords = Object.entries(records).filter(([date]) => {
        const recordDate = new Date(date);
        return recordDate.getMonth() === month && recordDate.getFullYear() === year;
      });

      // Calculate success rate for the month
      const successCount = monthRecords.filter(([_, completed]) => completed).length;
      const totalDays = monthRecords.length || 1; // Avoid division by zero
      const successRate = (successCount / totalDays) * 100;

      return {
        date: monthDate,
        successRate: successRate || 0
      };
    });

    return {
      habit,
      color: getHabitColor(index),
      dataPoints
    };
  });

  return (
    <div className="relative w-full h-[300px]">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
        {[100, 75, 50, 25, 0].map(value => (
          <div key={value} className="h-6 flex items-center">
            {value}%
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="absolute left-10 right-0 top-0 bottom-0">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[0, 25, 50, 75, 100].map(value => (
            <div
              key={value}
              className="absolute w-full border-t border-gray-100"
              style={{ top: `${(100 - value)}%` }}
            />
          ))}
        </div>

        {/* Data visualization */}
        <svg
          width="100%"
          height="100%"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {habitData.map(({ habit, color, dataPoints }) => (
            <g key={habit.id}>
              {/* Line connecting points with smooth curve */}
              <path
                d={dataPoints
                  .map((point, i) => {
                    const x = (i / (months.length - 1)) * 100;
                    const y = 100 - point.successRate;
                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  })
                  .join(' ')}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 ease-in-out"
              />

              {/* Data points */}
              {dataPoints.map((point, i) => {
                const x = (i / (months.length - 1)) * 100;
                const y = 100 - point.successRate;
                return (
                  <circle
                    key={`${habit.id}-${i}`}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300 ease-in-out"
                  />
                );
              })}
            </g>
          ))}
        </svg>

        {/* X-axis labels (months) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between transform translate-y-full pt-2">
          {months.map((date, index) => (
            <div key={index} className="text-xs text-gray-500">
              {date.toLocaleDateString('en-US', { month: 'short' })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute left-10 -bottom-16 right-0 flex flex-wrap gap-4">
        {habitData.map(({ habit, color }) => (
          <div key={habit.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-gray-600">{habit.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitSuccessGraph;