/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';

import crashlytics from '@react-native-firebase/crashlytics';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_TOKEN, KEY_URL_PADRAO, KEY_USUARIO} from '../../consts';
import {getBundleId} from 'react-native-device-info';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthContext} from '../../context/AuthContext';

const dimensions = Dimensions.get('window');

const initApp = async ({navigation, setUserToken, setLoggedUser}) => {
  try {
    const token = await AsyncStorage.getItem(KEY_TOKEN);
    // # Ver como recuperar
    // const user = await AsyncStorage.getItem(JSON.parse(KEY_USUARIO));

    setUserToken(token);
    // setLoggedUser(user);

    const bundleId = getBundleId();

    if (bundleId === 'com.personalapp.dev') {
      const url = await AsyncStorage.getItem(KEY_URL_PADRAO);
      Config.URL_API = url || Config.URL_API;
    }
    if (token && token !== 'DISCONNECTED') {
      setTimeout(() => {
        return navigation.replace('Principal');
      }, 2 * 1000);
    } else {
      setTimeout(() => {
        navigation.replace('Login');
      }, 2 * 1000);
    }
  } catch (err) {
    crashlytics().recordError(err);
    if (__DEV__) {
      console.err('err', err);
    }
  } finally {
    SplashScreen.hide();
  }
};

const StartScreen = ({navigation}) => {
  const {setUserToken, setLoggedUser} = useContext(AuthContext);

  useEffect(() => {
    initApp({
      navigation,
      setUserToken,
      setLoggedUser,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../../assets/splash-personal.png')}
        style={styles.backgroundImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: dimensions.height,
  },
});

export default StartScreen;
