import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock, Utensils, Dumbbell } from 'lucide-react';

interface Meal {
  id: string;
  time: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'other';
}

interface Exercise {
  id: string;
  time: string;
  type: string;
  duration: string;
}

interface DayEntry {
  meals: Meal[];
  exercises: Exercise[];
}

type WeekLog = {
  [key: string]: DayEntry;
};

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Petit-déjeuner', defaultTime: '08:00' },
  { id: 'lunch', label: 'Déjeuner', defaultTime: '12:00' },
  { id: 'dinner', label: 'Dîner', defaultTime: '19:00' },
  { id: 'snack', label: 'Collation', defaultTime: '' },
  { id: 'other', label: 'Autre', defaultTime: '' }
];

const FoodJournal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekLog, setWeekLog] = useState<WeekLog>({});
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newMeal, setNewMeal] = useState({
    time: '',
    description: '',
    type: 'other'
  });
  const [newExercise, setNewExercise] = useState({
    time: '',
    type: '',
    duration: ''
  });

  const handleAddMeal = () => {
    if (!selectedDay || !newMeal.time || !newMeal.description) return;

    const meal = {
      id: Date.now().toString(),
      ...newMeal
    };

    setWeekLog(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        meals: [...(prev[selectedDay]?.meals || []), meal]
      }
    }));

    setNewMeal({ time: '', description: '', type: 'other' });
    setShowAddMeal(false);
  };

  const handleAddExercise = () => {
    if (!selectedDay || !newExercise.time || !newExercise.type || !newExercise.duration) return;

    const exercise = {
      id: Date.now().toString(),
      ...newExercise
    };

    setWeekLog(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        exercises: [...(prev[selectedDay]?.exercises || []), exercise]
      }
    }));

    setNewExercise({ time: '', type: '', duration: '' });
    setShowAddExercise(false);
  };

  const getDayEntries = (day: string) => {
    return weekLog[day] || { meals: [], exercises: [] };
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <header className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold">Carnet Alimentaire</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {!selectedDay ? (
          <div className="space-y-4">
            {DAYS.map(day => {
              const entries = getDayEntries(day);
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="w-full bg-white rounded-lg shadow-sm border p-4 hover:border-[#f8f4b2] transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Utensils size={16} />
                        <span>{entries.meals.length} repas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell size={16} />
                        <span>{entries.exercises.length} exercices</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{selectedDay}</h2>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-[#f8f4b2] hover:text-[#e8e4a2]"
              >
                Retour à la semaine
              </button>
            </div>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Utensils size={20} />
                  <span>Repas</span>
                </h3>
                <button
                  onClick={() => setShowAddMeal(true)}
                  className="text-[#f8f4b2] hover:text-[#e8e4a2] flex items-center gap-1"
                >
                  <Plus size={20} />
                  <span>Ajouter un repas</span>
                </button>
              </div>

              {showAddMeal && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure</label>
                      <input
                        type="time"
                        value={newMeal.time}
                        onChange={e => setNewMeal({ ...newMeal, time: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        value={newMeal.type}
                        onChange={e => setNewMeal({ ...newMeal, type: e.target.value as any })}
                        className="w-full p-2 border rounded-lg"
                      >
                        {MEAL_TYPES.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                      type="text"
                      value={newMeal.description}
                      onChange={e => setNewMeal({ ...newMeal, description: e.target.value })}
                      placeholder="Qu'avez-vous mangé ?"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddMeal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleAddMeal}
                      className="px-4 py-2 bg-[#f8f4b2] text-gray-900 rounded-lg hover:bg-[#e8e4a2]"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {getDayEntries(selectedDay).meals.map(meal => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{meal.time}</span>
                      <span className="font-medium">{meal.description}</span>
                    </div>
                    <span className="text-sm text-gray-500 capitalize">
                      {MEAL_TYPES.find(t => t.id === meal.type)?.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Dumbbell size={20} />
                  <span>Exercice</span>
                </h3>
                <button
                  onClick={() => setShowAddExercise(true)}
                  className="text-[#f8f4b2] hover:text-[#e8e4a2] flex items-center gap-1"
                >
                  <Plus size={20} />
                  <span>Ajouter un exercice</span>
                </button>
              </div>

              {showAddExercise && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Heure</label>
                      <input
                        type="time"
                        value={newExercise.time}
                        onChange={e => setNewExercise({ ...newExercise, time: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Durée</label>
                      <input
                        type="text"
                        value={newExercise.duration}
                        onChange={e => setNewExercise({ ...newExercise, duration: e.target.value })}
                        placeholder="ex: 30 minutes"
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <input
                      type="text"
                      value={newExercise.type}
                      onChange={e => setNewExercise({ ...newExercise, type: e.target.value })}
                      placeholder="ex: Course, Yoga, etc."
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddExercise(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleAddExercise}
                      className="px-4 py-2 bg-[#f8f4b2] text-gray-900 rounded-lg hover:bg-[#e8e4a2]"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {getDayEntries(selectedDay).exercises.map(exercise => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{exercise.time}</span>
                      <span className="font-medium">{exercise.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">{exercise.duration}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default FoodJournal;