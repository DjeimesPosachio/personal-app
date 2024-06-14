import messaging from '@react-native-firebase/messaging';
import {KEY_TOKEN} from '../consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAxios} from '../utils/axios-helper';

const ULTIMO_TOKEN_FIREBASE = 'ULTIMO_TOKEN_FIREBASE';

async function onTokenRefresh(token) {
  const lastFirebaseToken = await AsyncStorage.getItem(ULTIMO_TOKEN_FIREBASE);

  if (lastFirebaseToken && lastFirebaseToken === token) {
    return;
  }

  const axios = createAxios();

  const isAuth = await AsyncStorage.getItem(KEY_TOKEN);

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!isAuth) {
    await axios.put(
      '/notificacoes/token',
      {},
      {
        params: {
          token,
        },
      },
    );

    await AsyncStorage.setItem(ULTIMO_TOKEN_FIREBASE, token);
  }
}

async function getToken() {
  await messaging().registerDeviceForRemoteMessages();
  await messaging().requestPermission();

  return await messaging().getToken();
}

async function updateToken() {
  await onTokenRefresh(await getToken());
}

export default {
  init: () => {
    updateToken();

    return messaging().onTokenRefresh(onTokenRefresh);
  },
  updateToken,
};
