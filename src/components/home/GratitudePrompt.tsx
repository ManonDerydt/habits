import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface GratitudePromptProps {
  onClose: () => void;
}

const GratitudePrompt = ({ onClose }: GratitudePromptProps) => {
  const [gratitude, setGratitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#f8f4b2]" />
            <h2 className="text-xl font-semibold text-[#424242]">Daily Gratitude</h2>
          </div>
          <button onClick={onClose} className="text-[#B0BEC5] hover:text-[#424242]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#B0BEC5] rounded-lg focus:outline-none focus:border-[#f8f4b2] mb-4"
            rows={4}
            placeholder="Write three things you're grateful for..."
          />

          <button
            type="submit"
            className="w-full bg-[#f8f4b2] text-[#424242] font-medium py-2 px-4 rounded-lg hover:bg-[#e8e4a2]"
          >
            Save Gratitude
          </button>
        </form>
      </div>
    </div>
  );
};

export default GratitudePrompt;