// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useAuthService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useAuthService();
  
  // Vous pouvez ajouter d'autres logiques ici si nécessaire
  useEffect(() => {
    // Initialisation ou vérification du token au démarrage
    // Cette logique est déjà gérée dans useAuthService via useState
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};