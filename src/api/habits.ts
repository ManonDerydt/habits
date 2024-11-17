import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Habit } from '../types';

// Get all habits for a user
export const getUserHabits = async (userId: string) => {
  const habitsRef = collection(db, 'habits');
  const q = query(habitsRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a new habit
export const createHabit = async (userId: string, habit: Omit<Habit, 'id'>) => {
  const habitsRef = collection(db, 'habits');
  const docRef = await addDoc(habitsRef, {
    ...habit,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
};

// Update a habit
export const updateHabit = async (habitId: string, updates: Partial<Habit>) => {
  const habitRef = doc(db, 'habits', habitId);
  await updateDoc(habitRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
};

// Delete a habit
export const deleteHabit = async (habitId: string) => {
  const habitRef = doc(db, 'habits', habitId);
  await deleteDoc(habitRef);
};

// Update habit completion status
export const updateHabitCompletion = async (
  habitId: string, 
  completed: boolean,
  date: string
) => {
  const habitRef = doc(db, 'habits', habitId);
  await updateDoc(habitRef, {
    [`dailyRecords.${date}`]: completed,
    updatedAt: new Date().toISOString()
  });
};