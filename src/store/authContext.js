import React from "react";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}