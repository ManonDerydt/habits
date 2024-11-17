import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HabitList from './HabitList';
import DaySchedule from './DaySchedule';
import NotificationSettings from './NotificationSettings';
import StatsOverview from './StatsOverview';
import ResourcesPage from '../resources/ResourcesPage';
import AccountPage from '../account/AccountPage';
import FoodJournal from '../food/FoodJournal';
import { Plus, Menu, LogOut, BookOpen, User, Settings, UtensilsCrossed } from 'lucide-react';
import AddHabitForm from '../habits/AddHabitForm';
import type { Habit } from '../../types';

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
  const [showFoodJournal, setShowFoodJournal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const closeMenu = () => setShowMenu(false);

  if (showResources) {
    return <ResourcesPage onClose={() => setShowResources(false)} />;
  }

  if (showAccount) {
    return <AccountPage onClose={() => setShowAccount(false)} />;
  }

  if (showFoodJournal) {
    return <FoodJournal onClose={() => setShowFoodJournal(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-safe-bottom">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="relative">
            <button 
              className="p-2 -ml-2 tap-highlight"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            
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
                      onClick={() => {
                        setShowFoodJournal(true);
                        closeMenu();
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <UtensilsCrossed size={18} />
                      <span>Carnet Alimentaire</span>
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
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        <StatsOverview 
          totalHabits={habits.length} 
          completedHabits={habits.filter(h => h.completed).length}
          remainingHabits={habits.filter(h => !h.completed).length}
          habits={habits}
        />

        <DaySchedule />

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

        <NotificationSettings />

        <button
          onClick={() => setShowFoodJournal(true)}
          className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center gap-2 text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <UtensilsCrossed size={24} className="text-[#f8f4b2]" />
          <span className="font-medium">Carnet Alimentaire</span>
        </button>
      </div>

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