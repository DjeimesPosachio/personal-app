/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebaseNotificationHelper from './src/utils/firebase-notification-helper';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  firebaseNotificationHelper.onNotificationReceived(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
