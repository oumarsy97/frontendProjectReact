// src/services/authService.js
import { useState, useCallback } from 'react';
import useCrud from '../hooks/useCrudAxios';

export const useAuthService = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const { create, loading, error } = useCrud('auth'); // Utilisation de useCrud avec le endpoint 'auth'

  const login = useCallback(async (email, password) => {
    try {
      const userData = await create({ email, password }); // Utilise la méthode create du hook useCrud
      
      if (userData && userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user || userData));
        setUser(userData.user || userData);
      }
      
      return userData;
    } catch (err) {
      console.error('Erreur de connexion:', err);
      throw err;
    }
  }, [create]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token');
  }, []);

  return {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
    error
  };
};