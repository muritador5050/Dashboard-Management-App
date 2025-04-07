import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDjiRZgMS6D-Z15VP_1Gsjkff3EnVdIiIU',
  authDomain: 'admin-dashboard-e514c.firebaseapp.com',
  projectId: 'admin-dashboard-e514c',
  storageBucket: 'admin-dashboard-e514c.firebasestorage.app',
  messagingSenderId: '858435310238',
  appId: '1:858435310238:web:370c5d91a494860692218f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
