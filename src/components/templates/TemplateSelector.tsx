import React, { useState } from 'react';
import { ArrowLeft, Clock, Plus, Layout, Pencil } from 'lucide-react';
import type { Habit } from '../../types';

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  habits: Omit<Habit, 'id' | 'startDate' | 'streakDays' | 'dailyRecords'>[];
}

const templates: Template[] = [
  {
    id: 'weekly-planning',
    title: 'Weekly Planning & Goals',
    description: 'Structure your week with clear objectives and review sessions',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=500&q=80',
    habits: [
      {
        emoji: '📋',
        title: 'Weekly Priorities Review',
        description: 'Gather and organize weekly priorities',
        timeSlots: ['09:00'],
        selectedDays: ['Monday'],
        category: 'planning',
        benefit: 'Better organization and focus',
        frequency: 'weekly',
        completed: false
      },
      {
        emoji: '🎯',
        title: 'Set Three Main Goals',
        description: 'Define three key objectives for the week',
        timeSlots: ['09:30'],
        selectedDays: ['Monday'],
        category: 'planning',
        benefit: 'Clear direction and purpose',
        frequency: 'weekly',
        completed: false
      },
      {
        emoji: '⏱️',
        title: 'Time Allocation Review',
        description: 'Allocate time for each objective',
        timeSlots: ['10:00'],
        selectedDays: ['Monday'],
        category: 'planning',
        benefit: 'Effective time management',
        frequency: 'weekly',
        completed: false
      }
    ]
  },
  {
    id: 'personal-development',
    title: 'Daily Personal Growth',
    description: 'Invest in your personal development every day',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=500&q=80',
    habits: [
      {
        emoji: '📚',
        title: 'Read 20 Pages',
        description: 'Read personal development book',
        timeSlots: ['18:00'],
        selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        category: 'learning',
        benefit: 'Knowledge and growth',
        frequency: 'daily',
        completed: false
      },
      {
        emoji: '🎥',
        title: 'Educational Content',
        description: 'Watch educational video (30 mins)',
        timeSlots: ['19:00'],
        selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        category: 'learning',
        benefit: 'New perspectives and skills',
        frequency: 'daily',
        completed: false
      }
    ]
  },
  {
    id: 'wellness-relaxation',
    title: 'Wellness & Relaxation',
    description: 'Take care of your body and mind',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80',
    habits: [
      {
        emoji: '🧘',
        title: 'Meditation',
        description: '15-minute meditation session',
        timeSlots: ['07:00'],
        selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        category: 'wellness',
        benefit: 'Mental clarity and peace',
        frequency: 'daily',
        completed: false
      },
      {
        emoji: '🌳',
        title: 'Nature Walk',
        description: 'One hour walk in nature',
        timeSlots: ['17:00'],
        selectedDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
        category: 'wellness',
        benefit: 'Physical and mental refresh',
        frequency: 'weekly',
        completed: false
      },
      {
        emoji: '🛁',
        title: 'Relaxation Time',
        description: 'Relaxing bath with calming music',
        timeSlots: ['20:00'],
        selectedDays: ['Sunday'],
        category: 'wellness',
        benefit: 'Stress relief and relaxation',
        frequency: 'weekly',
        completed: false
      }
    ]
  }
];

interface TemplateSelectorProps {
  onClose: () => void;
  onSelectTemplate: (habits: Omit<Habit, 'id' | 'startDate' | 'streakDays' | 'dailyRecords'>[]) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onClose, onSelectTemplate }) => {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <header className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold">Choose a Template</h1>
            </div>
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f8f4b2] text-gray-900 rounded-lg hover:bg-[#e8e4a2] transition-colors"
            >
              {showCustom ? <Layout size={20} /> : <Pencil size={20} />}
              <span>{showCustom ? 'Preset Templates' : 'Custom Template'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {showCustom ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Create Your Own Template</h2>
              <p className="text-gray-600">Build a personalized template with your preferred habits and schedules</p>
            </div>

            <div className="grid gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Morning Routine</h3>
                <div className="space-y-2">
                  <input
                    type="time"
                    className="w-full p-2 border rounded-lg"
                    defaultValue="07:00"
                  />
                  <button className="w-full py-2 text-[#f8f4b2] hover:text-[#e8e4a2] transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Morning Habit
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Afternoon Routine</h3>
                <div className="space-y-2">
                  <input
                    type="time"
                    className="w-full p-2 border rounded-lg"
                    defaultValue="14:00"
                  />
                  <button className="w-full py-2 text-[#f8f4b2] hover:text-[#e8e4a2] transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Afternoon Habit
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Evening Routine</h3>
                <div className="space-y-2">
                  <input
                    type="time"
                    className="w-full p-2 border rounded-lg"
                    defaultValue="20:00"
                  />
                  <button className="w-full py-2 text-[#f8f4b2] hover:text-[#e8e4a2] transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Evening Habit
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#f8f4b2] text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e8e4a2] transition-colors">
              <Plus size={20} />
              <span>Create Custom Template</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {templates.map(template => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border hover:border-[#f8f4b2] transition-colors cursor-pointer"
                onClick={() => onSelectTemplate(template.habits)}
              >
                <div className="aspect-[2/1] relative">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h2 className="text-xl font-semibold mb-1">{template.title}</h2>
                      <p className="text-sm text-white/80">{template.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{template.habits.length} habits included</span>
                  </div>
                  
                  <div className="space-y-2">
                    {template.habits.map((habit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span>{habit.emoji}</span>
                        <span>{habit.title}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 bg-[#f8f4b2] text-gray-900 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e8e4a2] transition-colors">
                    <Plus size={20} />
                    <span>Use This Template</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplateSelector;