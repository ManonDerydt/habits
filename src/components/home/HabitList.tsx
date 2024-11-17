import React, { useState } from 'react';
import { Check, Edit, Trash2, Info, Lock, X } from 'lucide-react';
import type { Habit } from '../../types';
import HabitTimeline from './HabitTimeline';
import HabitDetailsModal from '../habits/HabitDetailsModal';
import { getHabitColor } from '../../utils/colors';

interface HabitListProps {
  habits: Habit[];
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onEditHabit, onDeleteHabit }) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning'>('success');

  if (!habits || habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No habits scheduled for today. Click "Add Habit" to get started!
      </div>
    );
  }

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const isHabitAvailableToday = (habit: Habit) => {
    return habit.selectedDays.includes(getCurrentDay());
  };

  const handleToggleCompletion = (habit: Habit, success: boolean = true) => {
    if (!isHabitAvailableToday(habit)) return;

    const today = new Date().toISOString().split('T')[0];
    const updatedHabit = {
      ...habit,
      completed: success,
      dailyRecords: {
        ...habit.dailyRecords,
        [today]: success
      },
      streakDays: success 
        ? (habit.streakDays || 0) + 1 
        : (habit.streakDays || 0)
    };

    const failedDays = Object.values(updatedHabit.dailyRecords).filter(v => v === false).length;

    if (!success) {
      setToastType('warning');
      setToastMessage(`Missed day recorded. ${failedDays} total missed days`);
      setShowToast(true);
    } else {
      setToastType('success');
      setToastMessage(`Great job! ${updatedHabit.streakDays} days completed!`);
      setShowToast(true);
    }

    setTimeout(() => setShowToast(false), 3000);
    onEditHabit(updatedHabit);
  };

  return (
    <div className="space-y-4 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
          <div className={`${
            toastType === 'success' ? 'bg-green-500' : 'bg-yellow-500'
          } text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
            {toastType === 'success' ? <Check size={20} /> : <Info size={20} />}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {habits.map((habit, index) => {
        const habitColor = getHabitColor(index);
        const today = new Date().toISOString().split('T')[0];
        const isCompletedToday = habit.dailyRecords?.[today] || false;
        const isFailedToday = habit.dailyRecords?.[today] === false;
        const isAvailableToday = isHabitAvailableToday(habit);

        return (
          <div 
            key={habit.id} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              !isAvailableToday ? 'opacity-50' : ''
            }`}
            style={{ borderLeft: `4px solid ${habitColor}` }}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleCompletion(habit, true)}
                    disabled={!isAvailableToday}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isCompletedToday
                        ? 'bg-green-500 border-green-500 text-white'
                        : isAvailableToday
                        ? 'border-gray-300 hover:border-green-500'
                        : 'border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleToggleCompletion(habit, false)}
                    disabled={!isAvailableToday}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isFailedToday
                        ? 'bg-red-500 border-red-500 text-white'
                        : isAvailableToday
                        ? 'border-gray-300 hover:border-red-500'
                        : 'border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:opacity-75"
                  onClick={() => setSelectedHabit(habit)}
                >
                  <span className="text-2xl">{habit.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{habit.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{habit.time}</span>
                      <span>•</span>
                      <span>{habit.duration}</span>
                      {!isAvailableToday && (
                        <>
                          <span>•</span>
                          <span className="text-gray-400">Not scheduled today</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedHabit(habit)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="View details"
                >
                  <Info size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={() => onDeleteHabit(habit.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Delete habit"
                >
                  <Trash2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="px-4 pb-4">
              <HabitTimeline 
                streakDays={habit.streakDays}
                successDays={Object.values(habit.dailyRecords || {}).filter(success => success).length}
                missedDays={Object.values(habit.dailyRecords || {}).filter(success => success === false).length}
                goalDays={habit.goalDays}
              />
            </div>
          </div>
        );
      })}

      {selectedHabit && (
        <HabitDetailsModal
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          color={getHabitColor(habits.indexOf(selectedHabit))}
        />
      )}
    </div>
  );
};

export default HabitList;