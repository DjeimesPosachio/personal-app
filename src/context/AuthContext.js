/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = async (telefone, password) => {
        try {
          const response = await axios.post('/auth/login', {
            email: telefone,
            password: password,
          });
          setUserToken(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    const logout = () => {
        setUserToken(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{login, logout, loading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
};
