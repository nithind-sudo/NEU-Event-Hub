// AlertContext.js
import React, { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const showAlertFunction = () => {
    setShowAlert(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
  };

  const value = {
    error,
    setError,
    showAlert,
    showAlertFunction,
    hideAlertFunction,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
