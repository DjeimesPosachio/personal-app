/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TreinoScreen from '../screens/TreinoScreen';
import DietaScreen from '../screens/DietaScreen';
import StackPerfil from './StackPerfil';

const Tab = createMaterialBottomTabNavigator();

const AppTabs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        shifting={true}
        labeled={false}

        barStyle={{
          backgroundColor: '#F7D100',
          height: 68,
        }}>
        <Tab.Screen
          name="Treino"
          component={TreinoScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="dumbbell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Dieta"
          component={DietaScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="food-apple" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={StackPerfil}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="account" color={color} size={26} />
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
});

export default AppTabs;
