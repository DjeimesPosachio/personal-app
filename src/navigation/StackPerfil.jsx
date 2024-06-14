/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PerfilScreen from '../screens/PerfilScreen';
import AlterarSenhaScreen from '../screens/AlterarSenhaScreen';

const Stack = createStackNavigator();

const StackPerfil = () => {
    return (
        <Stack.Navigator initialRouteName="InitialScreen">
            <Stack.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AlterarSenha"
                component={AlterarSenhaScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default StackPerfil;
