import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import HomePage from './components/HomePage';
import type { Habit } from './types';

const App: React.FC = () => {
  const { currentUser } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 'test-habit-90days',
      title: 'Daily Meditation',
      emoji: '🧘',
      description: 'Morning meditation for mental clarity',
      timeSlots: ['06:30', '19:00'],
      completed: false,
      streakDays: 78,
      dailyRecords: {
        // Simulating 78 days with realistic progress (some misses at the start)
        ...Array.from({ length: 78 }).reduce((acc, _, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (78 - index));
          // First 15 days: sporadic success (building the habit)
          if (index < 15) {
            return {
              ...acc,
              [date.toISOString().split('T')[0]]: Math.random() > 0.4
            };
          }
          // Days 15-30: getting better but still some misses
          if (index < 30) {
            return {
              ...acc,
              [date.toISOString().split('T')[0]]: Math.random() > 0.2
            };
          }
          // After day 30: strong consistency
          return {
            ...acc,
            [date.toISOString().split('T')[0]]: true
          };
        }, {}),
        // Today's record
        [new Date().toISOString().split('T')[0]]: false
      },
      selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      category: 'wellness',
      benefit: 'Mental clarity and stress reduction',
      frequency: 'daily',
      goalDays: 90,
      startDate: new Date(Date.now() - (78 * 24 * 60 * 60 * 1000)).toISOString()
    }
  ]);
  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleAddHabit = (habit: Habit) => {
    setHabits(prevHabits => [...prevHabits, habit]);
    setShowAddHabit(false);
  };

  const handleEditHabit = (updatedHabit: Habit) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
  };

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HomePage
        habits={habits}
        onAddHabit={() => setShowAddHabit(true)}
        onEditHabit={handleEditHabit}
        onDeleteHabit={handleDeleteHabit}
        showAddHabit={showAddHabit}
        setShowAddHabit={setShowAddHabit}
        onSubmitHabit={handleAddHabit}
      />
    </div>
  );
};

export default App;