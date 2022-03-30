import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, useAuth } from "./firebase";

export const Context = React.createContext();

const Store = ({ children }) => {
  const currentUser = useAuth();
  const [errorLogin, setErrorLogin] = useState("");
  const [userData, setUserData] = useState(null);
  const [houseData, setHouseData] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  const getHouseData = async (houseId) => {
    const docRef = doc(db, "houses", houseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHouseData(docSnap.data());
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser && !userData) {
        setLoadingIndicator(true);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);

          getHouseData(data.houseId);

          !data.houseId && setShowIntroduction(true);
        }
        setLoadingIndicator(false);
      }
    };
    getUserData();
    console.log("useEffect();");
  }, [currentUser, setUserData, userData]);

  return (
    <Context.Provider
      value={{
        errorState: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        userData: [userData, setUserData],
        houseData: [houseData, setHouseData],
        showIntroduction: [showIntroduction, setShowIntroduction],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
