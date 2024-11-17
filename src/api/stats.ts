import { 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';

// Get user stats for a specific date range
export const getUserStats = async (userId: string, startDate: Date, endDate: Date) => {
  const statsRef = collection(db, 'stats');
  const q = query(
    statsRef,
    where('userId', '==', userId),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Record daily stats
export const recordDailyStats = async (userId: string, stats: any) => {
  const statsRef = collection(db, 'stats');
  await addDoc(statsRef, {
    userId,
    ...stats,
    date: Timestamp.now(),
    createdAt: new Date().toISOString()
  });
};