/* eslint-disable react-refresh/only-export-components */
// src/context/TokenContext.js
import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [university, setUniversity] = useState(() => localStorage.getItem('university'));

    const getToken = () => token;

    const setNewToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(newToken);
    };

    const setNewUser = (newUser) => {
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
        setUser(newUser);
    };

    const setNewUniversity = (newUniversity) => {
        if (newUniversity) {
            localStorage.setItem('university', newUniversity);
        } else {
            localStorage.removeItem('university');
        }
        setUniversity(newUniversity);
    };

    const logout = () => {
        setNewToken(null);
        setNewUser(null);
        setNewUniversity(null);
    };

    const value = {
        token,
        user,
        university,
        getToken,
        setNewToken,
        setNewUser,
        setNewUniversity,
        logout
    };

    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
