import React from 'react';
import { X, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Habit } from '../../types';
import HabitTimeline from '../home/HabitTimeline';

interface HabitDetailsModalProps {
  habit: Habit;
  onClose: () => void;
  color: string;
}

const HabitDetailsModal: React.FC<HabitDetailsModalProps> = ({ habit, onClose, color }) => {
  // Calculate days since creation
  const daysSinceCreation = Math.floor(
    (new Date().getTime() - new Date(habit.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate success and missed days based on streak
  const successDays = habit.streakDays;
  const missedDays = Math.max(0, daysSinceCreation - successDays);

  // Calculate end date if goal days is set
  const getEndDate = () => {
    if (!habit.goalDays) return null;
    const startDate = new Date(habit.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + habit.goalDays);
    return endDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const endDate = getEndDate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{habit.emoji}</span>
            <h2 className="text-xl font-semibold text-gray-900">{habit.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar size={16} />
              <span className="text-sm">Total Days</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{daysSinceCreation}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock size={16} />
              <span className="text-sm">Daily Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{habit.time}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle size={16} />
              <span className="text-sm">Success Days</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{successDays}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <XCircle size={16} />
              <span className="text-sm">Missed Days</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{missedDays}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Progress Timeline</h3>
          <HabitTimeline 
            streakDays={habit.streakDays} 
            successDays={successDays}
            missedDays={missedDays}
            goalDays={habit.goalDays}
          />
          {endDate && (
            <p className="text-sm text-gray-600 mt-3">
              Target completion date: {endDate}
            </p>
          )}
        </div>

        {/* Schedule */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Schedule</h3>
          <div className="flex flex-wrap gap-2">
            {habit.selectedDays.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-[#f8f4b2] text-gray-900 rounded-full text-sm"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsModal;