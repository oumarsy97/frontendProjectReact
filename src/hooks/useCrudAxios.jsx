import { useState, useCallback } from 'react';
import axios from 'axios';

export const useCrudAxios = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Intercepteur pour ajouter le token d'authentification
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Récupérer tous les éléments
  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint);
      setData(response.data.data || response.data);
      return response.data.data || response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Récupérer un élément par ID
  const fetchById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data.data || response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Créer un nouvel élément
  const create = useCallback(async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(endpoint, newItem);
      setData(prev => [...prev, response.data.data || response.data]);
      return response.data.data || response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Mettre à jour un élément
  const update = useCallback(async (id, updatedItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`${endpoint}/${id}`, updatedItem);
      setData(prev => 
        prev.map(item => 
          item.id === id ? (response.data.data || response.data) : item
        )
      );
      return response.data.data || response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Supprimer un élément
  const remove = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`${endpoint}/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    fetch,
    fetchById,
    create,
    update,
    remove,
    setData
  };
};

export default useCrudAxios;
