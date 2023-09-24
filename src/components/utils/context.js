import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState({
    isAuth: false,
    role: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const role = localStorage.getItem('role'); // Получаем роль из localStorage

    if (accessToken) {
      setAuthData({
        isAuth: true,
        role: role,
      });
    }
  }, []);

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
