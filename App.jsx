import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackPrincipal from './src/navigation/StackPrincipal';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <NavigationContainer>
          <StackPrincipal />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
