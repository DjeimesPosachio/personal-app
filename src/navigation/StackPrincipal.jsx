/* eslint-disable prettier/prettier */
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import InitialScreen from '../screens/InitialScreen';
import AppTabs from './AppTabs';

const Stack = createStackNavigator();

const StackPrincipal = () => {
  return (
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Principal"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackPrincipal;
