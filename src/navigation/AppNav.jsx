/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNav = () => {
    const { loading, userToken } = useContext(AuthContext);

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
