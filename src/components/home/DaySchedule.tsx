import React from 'react';
import { Calendar } from 'lucide-react';

const DaySchedule = () => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = new Date().getDay();

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-[#f8f4b2]" />
        <h2 className="text-xl font-semibold text-[#424242]">Weekly Schedule</h2>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, index) => (
          <div
            key={day}
            className={`text-center p-2 rounded-lg ${
              index === currentDay
                ? 'bg-[#f8f4b2] text-[#424242]'
                : 'bg-[#F5F5F5] text-[#424242]'
            }`}
          >
            <p className="text-sm font-medium">{day.slice(0, 3)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DaySchedule;