import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Habit } from '../../App';

interface TodayHabitsProps {
  habits: Habit[];
  onEditHabit: (habit: Habit) => void;
}

const TodayHabits: React.FC<TodayHabitsProps> = ({ habits, onEditHabit }) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-4 text-[#B0BEC5]">
        No habits scheduled for today
      </div>
    );
  }

  // Sort habits by time
  const sortedHabits = [...habits].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-3">
      {sortedHabits.map((habit) => (
        <div
          key={habit.id}
          className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg"
          onClick={() => onEditHabit(habit)}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{habit.emoji}</span>
            <div>
              <h3 className="font-medium text-[#424242]">{habit.title}</h3>
              <p className="text-sm text-[#B0BEC5]">{habit.time}</p>
            </div>
          </div>
          {habit.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TodayHabits;