/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TreinoScreen from '../screens/TreinoScreen';
import DietaScreen from '../screens/DietaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createMaterialBottomTabNavigator();

const AppStack = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator
                shifting={true}
                barStyle={{
                    backgroundColor: '#F7D100',
                    height: 68,
                }}>
                <Tab.Screen
                    name="Treino"
                    component={TreinoScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="dumbbell" color={color} size={24} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dieta"
                    component={DietaScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="food" color={color} size={24} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Perfil"
                    component={PerfilScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="account" color={color} size={24} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppStack;
