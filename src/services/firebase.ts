import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Context } from "./store";

import { useContext, useEffect, useState } from "react";

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
const auth = getAuth();

export const db = getFirestore(app);

export let loading = true;

export const register = async (email: string, password: string) => {
  // return createUserWithEmailAndPassword(auth, email, password);
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(db, "users", user!.uid);
    const docData = {
      displayName: null,
      uid: user.uid,
      houseId: null,
      isAdmin: null,
      email: user.email,
    };

    const userProfile = await setDoc(docRef, docData);
    return userProfile;
  } catch (e) {
    console.log(e);
  }
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

// Custom Hook for user
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      loading = false;
    });
    return unsub;
  }, []);

  return currentUser;
};

export default app;
