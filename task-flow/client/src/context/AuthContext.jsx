import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    }

    checkSession();
  }, []);

  const contextValue = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    isChecking
  }), [isAuthenticated, isChecking]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
