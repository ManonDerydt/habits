import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AccountPageProps {
  onClose: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 tap-highlight"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold ml-2">Mon Compte</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#f8f4b2] rounded-full flex items-center justify-center">
                <User size={32} className="text-gray-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentUser?.email}</h2>
                <p className="text-sm text-gray-500">Membre depuis le 1 mars 2024</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <button className="text-[#f8f4b2] font-medium">
              Modifier le profil
            </button>
          </div>
        </section>

        {/* Settings Sections */}
        <section className="bg-white rounded-lg shadow-sm divide-y">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-600" />
              <span>Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-[#f8f4b2]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Shield size={20} className="text-gray-600" />
            <span>Confidentialité</span>
          </div>
          <div className="p-4 flex items-center gap-3">
            <HelpCircle size={20} className="text-gray-600" />
            <span>Aide et Support</span>
          </div>
        </section>

        {/* App Info */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Version 1.0.0</p>
            <p className="text-xs text-gray-400 mt-1">© 2024 Habit Tracker. Tous droits réservés.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;