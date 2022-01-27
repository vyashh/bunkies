import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// get config keys from .env file
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);

export const db = getFirestore(app);
export const auth = getAuth();
// export const auth = app.auth(); // firebase auth instance
// export const db = app.firestore(); // firebase firestore instance
// export const base = app; // firebase storage instance

export default app;
