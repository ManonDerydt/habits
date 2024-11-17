import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface HabitTimelineProps {
  streakDays: number;
  successDays: number;
  missedDays: number;
  goalDays?: number;
}

const HabitTimeline: React.FC<HabitTimelineProps> = ({ 
  streakDays, 
  successDays,
  missedDays,
  goalDays
}) => {
  const getMilestones = () => {
    if (goalDays && goalDays > 0) {
      return [
        { days: 0, label: 'Start' },
        { days: Math.floor(goalDays / 2), label: 'Halfway' },
        { days: goalDays, label: 'Goal' }
      ];
    }
    
    return [
      { days: 10, label: 'On Track' },
      { days: 21, label: 'New Habit' },
      { days: 200, label: 'For Life' }
    ];
  };

  const milestones = getMilestones();

  const getProgress = () => {
    if (goalDays && goalDays > 0) {
      return Math.min(100, (successDays / goalDays) * 100);
    }
    return successDays >= 200 ? 100 : 
           successDays >= 21 ? 60 : 
           successDays >= 10 ? 30 : 
           (successDays / 10) * 30;
  };

  const getDaysRemaining = () => {
    if (!goalDays) return null;
    const remaining = goalDays - successDays;
    return remaining > 0 ? remaining : 0;
  };

  const delayedDays = missedDays;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <CheckCircle size={16} className="text-green-600" />
          <span>{successDays} successes</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle size={16} className="text-red-600" />
          <span>{missedDays} missed</span>
        </div>
      </div>

      <div className="relative pt-8 pb-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#f8f4b2] rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          {milestones.map(({ days, label }) => (
            <div
              key={days}
              className={`flex flex-col items-center relative ${
                successDays >= days && days !== 0 ? 'text-[#f8f4b2]' : 'text-gray-400'
              }`}
            >
              <CheckCircle
                className={`w-6 h-6 absolute -top-10 ${
                  successDays >= days && days !== 0 ? 'text-[#f8f4b2]' : 'text-gray-300'
                }`}
              />
              <span className="text-sm font-medium">{days} days</span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>

        {successDays > 0 && (
          <div
            className="absolute top-6 transform -translate-x-1/2"
            style={{ left: `${getProgress()}%` }}
          >
            <div className="w-4 h-4 bg-[#f8f4b2] rounded-full border-2 border-white" />
            <div className="text-xs font-medium text-gray-600 mt-1">
              {successDays} days progress
            </div>
          </div>
        )}
      </div>

      {getDaysRemaining() !== null && (
        <div className="text-sm text-gray-600 mt-2 space-y-1">
          {getDaysRemaining() === 0 ? (
            <p className="text-green-600 font-medium">Goal achieved! 🎉</p>
          ) : (
            <>
              <p>{getDaysRemaining()} days remaining to reach your goal</p>
              {delayedDays > 0 && (
                <p className="text-red-600">
                  {delayedDays} day{delayedDays > 1 ? 's' : ''} delayed due to missed habits
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HabitTimeline;