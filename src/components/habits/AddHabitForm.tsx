import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Habit } from '../../types';

interface AddHabitFormProps {
  onClose: () => void;
  onSubmit: (habit: Habit) => void;
  existingHabit?: Habit;
  habitCount?: number;
}

const EMOJI_LIST = ['😊', '🌟', '💪', '🏃', '🧘', '📚', '💧', '🍎', '😴', '🎯', '🌱', '🎨', '✍️', '🎵', '🧠', '❤️', '🌅', '✨', '🔋', '📝'];

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const AddHabitForm = ({ 
  onClose, 
  onSubmit, 
  existingHabit
}: AddHabitFormProps) => {
  const [formData, setFormData] = useState({
    emoji: existingHabit?.emoji || '😊',
    title: existingHabit?.title || '',
    description: existingHabit?.description || '',
    timeSlots: existingHabit?.timeSlots || ['09:00'],
    selectedDays: existingHabit?.selectedDays || [],
    goalDays: existingHabit?.goalDays,
    hasDuration: existingHabit?.goalDays !== undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newHabit: Habit = {
      ...formData,
      id: existingHabit?.id || uuidv4(),
      completed: existingHabit?.completed || false,
      startDate: existingHabit?.startDate || new Date().toISOString(),
      streakDays: existingHabit?.streakDays || 0,
      dailyRecords: existingHabit?.dailyRecords || {},
      category: existingHabit?.category || '',
      benefit: existingHabit?.benefit || '',
      frequency: existingHabit?.frequency || ''
    };

    onSubmit(newHabit);
    onClose();
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const handleDurationToggle = (hasDuration: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasDuration,
      goalDays: hasDuration ? prev.goalDays : undefined
    }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, '']
    }));
  };

  const updateTimeSlot = (index: number, time: string) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) => i === index ? time : slot)
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {existingHabit ? 'Edit Habit' : 'Add New Habit'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emoji Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose an emoji
            </label>
            <div className="grid grid-cols-10 gap-2">
              {EMOJI_LIST.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, emoji })}
                  className={`p-2 text-xl rounded hover:bg-gray-100 ${
                    formData.emoji === emoji ? 'bg-[#f8f4b2]' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-[#f8f4b2] focus:border-[#f8f4b2]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-[#f8f4b2] focus:border-[#f8f4b2]"
              rows={3}
              required
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Slots
            </label>
            <div className="space-y-2">
              {formData.timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="time"
                    value={slot}
                    onChange={e => updateTimeSlot(index, e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:ring-[#f8f4b2] focus:border-[#f8f4b2]"
                    required
                  />
                  {formData.timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeSlot}
                className="flex items-center gap-2 text-[#f8f4b2] hover:text-[#e8e4a2] mt-2"
              >
                <Plus size={20} />
                <span>Add another time slot</span>
              </button>
            </div>
          </div>

          {/* Days Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Days
            </label>
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`p-2 text-sm rounded-lg ${
                    formData.selectedDays.includes(day)
                      ? 'bg-[#f8f4b2] text-gray-900'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!formData.hasDuration}
                  onChange={() => handleDurationToggle(false)}
                  className="mr-2"
                />
                No specific duration
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.hasDuration}
                  onChange={() => handleDurationToggle(true)}
                  className="mr-2"
                />
                Set duration goal
              </label>
            </div>
          </div>

          {/* Goal Days */}
          {formData.hasDuration && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Duration (days)
              </label>
              <input
                type="number"
                min="1"
                value={formData.goalDays || ''}
                onChange={e => setFormData({ ...formData, goalDays: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full p-2 border rounded-lg focus:ring-[#f8f4b2] focus:border-[#f8f4b2]"
                required={formData.hasDuration}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#f8f4b2] text-gray-900 py-2 rounded-lg hover:bg-[#f5f0a0] transition-colors"
          >
            {existingHabit ? 'Update Habit' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitForm;