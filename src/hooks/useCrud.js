import axios from 'axios';
import { useState } from 'react';

// Assurez-vous que cette URL correspond à votre backend
const BASE_URL = 'http://localhost:3000/users';

export const useCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Intercepteur pour ajouter le token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Gestion des erreurs améliorée
  const handleError = (error) => {
    console.error('API Error:', error);
    const message = error.response?.data?.message 
      || error.message 
      || 'Une erreur est survenue';
    setError(message);
    throw error;
  };

  // LOGIN modifié pour correspondre à votre endpoint
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/login', credentials);
      console.log('Login response:', response); // Pour le débogage
      
      if (response.data.data?.access_token) {
        localStorage.setItem('token', response.data.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('universite', response.data.data.universite);
      }
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const create = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, data);
      setData(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // READ
  const read = async (endpoint) => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const update = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await api.put(endpoint, data);
      setData(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const remove = async (endpoint) => {
    setLoading(true);
    try {
      const response = await api.delete(endpoint);
      setData(null);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('universite');
    setData(null);
  };

  return {
    create,
    read,
    update,
    remove,
    login,
    logout,
    loading,
    error,
    data,
  };
}; 