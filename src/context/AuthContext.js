/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { KEY_TOKEN, KEY_USUARIO } from '../consts';
import { createAxios } from '../utils/axios-helper';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [loaggedUser, setLoggedUser] = useState(null);

    const axios = createAxios();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', {
                email: email,
                password: password,
            });
            setUserToken(response?.data?.token);
            setLoggedUser(response?.data?.usuario);
            AsyncStorage.setItem(KEY_TOKEN, JSON.stringify(response?.data?.token));
            AsyncStorage.setItem(KEY_USUARIO, JSON.stringify(response?.data?.usuario));

            return response;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        setUserToken(null);
        setLoggedUser(null);
        setLoading(false);
        AsyncStorage.clear();
    };

    const getters = {
        loading,
        userToken,
        loaggedUser,
    };

    const setters = {
        setUserToken,
        setLoggedUser,
    };

    return (
        <AuthContext.Provider value={{ login, logout, ...getters, ...setters }}>
            {children}
        </AuthContext.Provider>
    );
};
