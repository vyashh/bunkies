import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, useAuth } from "./firebase";

export const Context = React.createContext();

const Store = ({ children }) => {
  const currentUser = useAuth();
  const [errorLogin, setErrorLogin] = useState("");
  const [userData, setUserData] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  const getUserData = async () => {
    if (currentUser && !userData) {
      setLoadingIndicator(true);
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        !data.houseId && setShowIntroduction(true);
      }
      setLoadingIndicator(false);
    }
  };

  useEffect(() => {
    getUserData();
  });

  return (
    <Context.Provider
      value={{
        errorState: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        userData: [userData, setUserData],
        showIntroduction: [showIntroduction, setShowIntroduction],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
