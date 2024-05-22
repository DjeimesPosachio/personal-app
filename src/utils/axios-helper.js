/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

import { KEY_TOKEN } from '../consts';

export function createAxios(options) {
    const instance = Axios.create({
        baseURL: 'http://localhost:8000/v1/app',
        headers: {
            'User-Agent': 'personal',
        },
        ...options,
    });

    instance.interceptors.request.use(async request => {
        const storageToken = await AsyncStorage.getItem(KEY_TOKEN);

        const parseToken = JSON.parse(storageToken);

        if (parseToken) {
            request.headers.Authorization = `Bearer ${parseToken}`;
        }

        if (__DEV__) {
            console.log('Request URL', request.baseURL + request.url);
        }

        return request;
    });
    return instance;
}
