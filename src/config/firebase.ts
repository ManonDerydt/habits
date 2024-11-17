import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For local development, we'll use a test configuration
const firebaseConfig = {
  apiKey: "test-key",
  authDomain: "test-project.firebaseapp.com",
  projectId: "test-project",
  storageBucket: "test-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);