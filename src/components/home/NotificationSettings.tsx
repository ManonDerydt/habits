import React, { useState } from 'react';
import { Bell, BellOff } from 'lucide-react';

const NotificationSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('09:00');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationTime(e.target.value);
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isEnabled ? (
            <Bell className="w-5 h-5 text-[#f8f4b2]" />
          ) : (
            <BellOff className="w-5 h-5 text-[#B0BEC5]" />
          )}
          <h2 className="text-xl font-semibold text-[#424242]">Notifications</h2>
        </div>
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-[#f8f4b2]' : 'bg-[#B0BEC5]'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className={`space-y-4 ${!isEnabled && 'opacity-50 pointer-events-none'}`}>
        <div>
          <label htmlFor="notificationTime" className="block text-sm text-[#424242] mb-2">
            Daily reminder time
          </label>
          <input
            type="time"
            id="notificationTime"
            value={notificationTime}
            onChange={handleTimeChange}
            className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2] transition-colors"
          />
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;