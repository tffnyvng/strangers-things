import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setToken(localStorage.st_token || "");
  }, [shouldUpdate]);

  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage.st_token;
    updateAuthStatus();
  };

  const providerValue = {
    token,
    isLogginIn: !!token,
    updateAuthStatus,
    logout,
  };

  return (
    <AuthContext.Provide value={providerValue}>{children}</AuthContext.Provide>
  );
}
