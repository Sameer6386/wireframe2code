import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBLkgazmIxBL7tDWe-ePaZNj-MWYxmJPw0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'rising-cable-395702.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'rising-cable-395702',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'rising-cable-395702.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '9950752496',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:9950752496:web:8916a59a0f8fc5c5419c35',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-X4RFX1P8VS'
};

let app = null;
let auth = null;
let storage = null;
let analytics = null;

try {
  // Initialize Firebase only if it hasn't been initialized
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

  // Initialize services
  auth = getAuth(app);
  storage = getStorage(app);

  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    isSupported().then(yes => {
      if (yes) {
        analytics = getAnalytics(app);
      }
    });
  }

  // Configure auth settings
  if (auth) {
    auth.useDeviceLanguage();
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { app, auth, storage, analytics };