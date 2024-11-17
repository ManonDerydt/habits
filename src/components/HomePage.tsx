import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HabitList from './home/HabitList';
import DaySchedule from './home/DaySchedule';
import NotificationSettings from './home/NotificationSettings';
import StatsOverview from './home/StatsOverview';
import ResourcesPage from './resources/ResourcesPage';
import AccountPage from './account/AccountPage';
import { Plus, Menu, LogOut, BookOpen, User, Settings } from 'lucide-react';
import AddHabitForm from './habits/AddHabitForm';
import type { Habit } from '../types';

interface HomePageProps {
  habits: Habit[];
  onAddHabit: () => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
  showAddHabit: boolean;
  setShowAddHabit: (show: boolean) => void;
  onSubmitHabit: (habit: Habit) => void;
}

const HomePage = ({
  habits,
  onAddHabit,
  onEditHabit,
  onDeleteHabit,
  showAddHabit,
  setShowAddHabit,
  onSubmitHabit
}: HomePageProps) => {
  const { currentUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (showResources) {
    return <ResourcesPage onClose={() => setShowResources(false)} />;
  }

  if (showAccount) {
    return <AccountPage onClose={() => setShowAccount(false)} />;
  }

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-bottom">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="relative">
            <button 
              className="p-2 -ml-2 tap-highlight"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            
            {/* Menu Dropdown */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 bg-black bg-opacity-25"
                  onClick={closeMenu}
                />
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-1 animate-fadeIn divide-y divide-gray-100 z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{currentUser?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowAccount(true);
                        closeMenu();
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User size={18} />
                      <span>Mon Compte</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowResources(true);
                        closeMenu();
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <BookOpen size={18} />
                      <span>Ressources</span>
                    </button>
                    <button
                      onClick={closeMenu}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Settings size={18} />
                      <span>Paramètres</span>
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <h1 className="text-lg font-semibold">Habit Tracker</h1>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Stats Cards */}
        <StatsOverview 
          totalHabits={habits.length} 
          completedHabits={habits.filter(h => h.completed).length}
          remainingHabits={habits.filter(h => !h.completed).length}
          habits={habits}
        />

        {/* Weekly Schedule */}
        <DaySchedule />

        {/* Habits Section */}
        <section className="mobile-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Habits</h2>
            <button
              onClick={onAddHabit}
              className="mobile-button bg-[#f8f4b2] text-gray-900"
            >
              <Plus size={20} className="inline-block mr-1" />
              Add Habit
            </button>
          </div>
          <HabitList 
            habits={habits}
            onEditHabit={onEditHabit}
            onDeleteHabit={onDeleteHabit}
          />
        </section>

        {/* Notification Settings */}
        <NotificationSettings />
      </div>

      {/* Add Habit Modal */}
      {showAddHabit && (
        <AddHabitForm
          onClose={() => setShowAddHabit(false)}
          onSubmit={onSubmitHabit}
          habitCount={habits.length}
        />
      )}
    </div>
  );
};

export default HomePage;