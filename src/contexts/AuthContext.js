import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('isAdmin', isAdmin);
    }, [isAdmin]);

    const login = async (usuario, senha) => {
        try {
            const response = await axios.post('https://backend-completo.vercel.app/app/login', {
                usuario,
                senha
            });

            const token = response.data.token;
            if (token) {
                setToken(token);

                const ehAdmin = usuario === '010623023';
                setIsAdmin(ehAdmin);
                localStorage.setItem('isAdmin', ehAdmin.toString());

                return true;
            } else {
                throw new Error('Token não retornado');
            }
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            return false;
        }
    };

    const logout = () => {
        setToken('');
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
