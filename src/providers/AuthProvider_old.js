import React, { useContext, useState, useEffect } from "react";
import { Context } from "../services/store";
import { auth } from "../services/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { loadingIndicator } = useContext(Context);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = loadingIndicator;
  const auth = getAuth();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if (user) {
      //   const userRef = db.collection("users").doc(user.uid);
      //   userRef.get().then((doc) => {
      //     const user = doc.data();
      //     // check if user is admin
      //     if (!user.isAdmin) {
      //       logout();
      //       setLoginError("User has not admin rights");
      //       setCurrentUser(null);
      //     }
      //   });
      // }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    // add the functions to the context via the value parameter. Children can use this the functions if wrapped as parent.
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
