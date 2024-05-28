/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { getBundleId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_URL_PADRAO } from '../consts';
import Config from 'react-native-config';

const AppNav = () => {
    const { loading, userToken } = useContext(AuthContext);

    const bundleId = getBundleId();

    if (bundleId === 'com.personalapp.dev') {
         AsyncStorage.getItem(KEY_URL_PADRAO).then((res) => {
            console.log('UUUUUR', JSON.parse(res).url);
            Config.URL_API = JSON.parse(res).url || Config.URL_API;
        });
    }

    if (loading) {
        <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} />
        </View>;
    }
    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppNav;
