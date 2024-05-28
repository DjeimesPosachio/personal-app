/* eslint-disable prettier/prettier */
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import ChangeUrlScreen from '../screens/ChangeUrlScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ChangeUrl" component={ChangeUrlScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
