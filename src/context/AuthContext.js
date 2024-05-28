/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { KEY_TOKEN, KEY_USUARIO } from '../consts';
import { createAxios } from '../utils/axios-helper';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const axios = createAxios();

    const login = async (telefone, password) => {
        try {
            const response = await axios.post('/auth/login', {
                email: telefone,
                password: password,
            });
            setUserToken(response?.data?.token);
            AsyncStorage.setItem(KEY_TOKEN, JSON.stringify(response?.data?.token));
            AsyncStorage.setItem(KEY_USUARIO, JSON.stringify(response?.data?.usuario));
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUserToken(null);
        setLoading(false);
        AsyncStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ login, logout, loading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};
