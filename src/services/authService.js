// src/services/authService.js
import { useCallback } from 'react';
import useCrud from '../hooks/useCrudAxios';
import { useToken } from '../context/TokenContext';

export const useAuthService = () => {
  const { setNewToken, setNewUser, setNewUniversity } = useToken();
  const { create, loading, error } = useCrud('auth'); // Utilisation de useCrud avec le endpoint 'auth'

  const login = useCallback(async (email, password) => {
    try {
      const userData = await create({ email, password }); // Utilise la méthode create du hook useCrud
      
      if (userData && userData.token) {
        setNewToken(userData.token);
        setNewUser(userData.user || userData);
        setNewUniversity(userData.university || userData);
      } 
      
      return userData;
    } catch (err) {
      console.error('Erreur de connexion:', err);
      throw err;
    }
  }, [create, setNewToken, setNewUniversity, setNewUser]);

  const logout = useCallback(() => {
    setNewToken(null);
    setNewUser(null);
    setNewUniversity(null);
  }, [setNewToken, setNewUser, setNewUniversity]);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token');

  }, []);

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error
  };
};