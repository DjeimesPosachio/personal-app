/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

import { KEY_TOKEN } from '../consts';
import Config from 'react-native-config';

export function createAxios(options) {

    console.log('CONFIG.URL_API', Config.URL_API);
    const instance = Axios.create({
        baseURL: Config.URL_API,
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
