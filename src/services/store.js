import React, { useState, useEffect } from "react";

export const Context = React.createContext();

const Store = ({ children }) => {
  const [errorLogin, setErrorLogin] = useState("");
  const [userData, setUserData] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        errorState: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        userData: [userData, setUserData],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
