import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../services/firebase';

// Create or update user profile
export const upsertUserProfile = async (userId: string, data: any) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } else {
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
};

// Update user settings
export const updateUserSettings = async (userId: string, settings: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    settings,
    updatedAt: new Date().toISOString()
  });
};