import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration with fallback values to prevent crashes
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX'
};

// Check if we have valid Firebase configuration
const hasValidConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
                      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'demo-api-key';

let app = null;
let auth = null;
let storage = null;
let analytics = null;

// Only initialize Firebase if we have valid configuration
if (hasValidConfig) {
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
        console.warn('Firebase initialization failed:', error);
    }
} else {
    console.warn('Firebase configuration is missing or invalid. Please check your environment variables.');
}

export { app, auth, storage, analytics };