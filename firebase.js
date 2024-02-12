import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "campus-cards.firebaseapp.com",
  projectId: "campus-cards",
  storageBucket: "campus-cards.appspot.com",
  messagingSenderId: "213140793765",
  appId: "1:213140793765:web:ba4cf046637f265cbf204c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };