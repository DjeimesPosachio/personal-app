/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import {displayName} from '../../app.json';

function onNotificationReceived(notification) {}

function handleMessage(message) {
  if (Platform.OS === 'ios') {
    Notifications.postLocalNotification(
      {
        identifier: displayName.notificationChannel,
        title: message.notification.title,
        body: message.notification.body,
        userInfo: message.data,
      },
      Number(displayName.notificationChannel),
    );
  } else {
    Notifications.postLocalNotification(
      {
        identifier: displayName.notificationChannel,
        title: message.notification.title,
        body: message.notification.body,
        userInfo: message.data,
      },
      Number(displayName.notificationChannel),
    );
  }
}

export default {
  init: () => {
    return messaging().onMessage(handleMessage);
  },
  onNotificationReceived,
};
