import React, { useState } from 'react';

const DayRating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-4">
        {[...Array(11)].map((_, index) => (
          <button
            key={index}
            onClick={() => setRating(index)}
            className={`w-10 h-10 rounded-full ${
              rating === index
                ? 'bg-[#f8f4b2] text-gray-900'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            } flex items-center justify-center font-semibold transition-colors`}
          >
            {index}
          </button>
        ))}
      </div>
      {rating !== null && (
        <p className="text-gray-600">
          You rated your day: <span className="font-semibold">{rating}/10</span>
        </p>
      )}
    </div>
  );
};

export default DayRating;