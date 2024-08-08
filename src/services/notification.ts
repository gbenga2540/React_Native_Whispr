import PushNotification, {
  Importance,
  PushNotificationObject,
} from 'react-native-push-notification';
import PushNotificationIOS, {
  NotificationRequest,
} from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

class NotificationManager {
  configure = () => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    return PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: _token => {
        // console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: notification => {
        // console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: _notification => {
        // console.log('ACTION:', notification.action);
        // console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: _err => {
        // console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: Platform.OS === 'ios',
    });
  };

  createChannel = () => {
    return PushNotification.createChannel(
      {
        channelId: 'Whispr',
        channelName: 'Whispr Channel',
        channelDescription: 'A channel to categorize Whispr notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      _created => {},
    );
  };

  showNotification = ({
    title,
    message,
    android_setting,
    ios_setting,
  }: {
    title: string;
    message: string;
    android_setting?: PushNotificationObject;
    ios_setting?: NotificationRequest;
  }) => {
    if (Platform.OS === 'ios') {
      return PushNotificationIOS.addNotificationRequest({
        id: 'Whispr',
        title: title,
        body: message,
        ...ios_setting,
      });
    } else {
      return PushNotification.localNotification({
        title: title,
        message: message || '',
        channelId: 'Whispr',
        largeIcon: 'ic_launcher',
        bigLargeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        ...android_setting,
      });
    }
  };

  scheduleNotification = ({
    title,
    message,
    time,
    repeat,
  }: {
    title: string;
    message: string;
    time: Date;
    repeat: boolean;
  }) => {
    if (Platform.OS === 'ios') {
      return PushNotificationIOS.addNotificationRequest({
        title: title,
        body: message,
        id: 'Whispr',
        fireDate: time,
        repeats: repeat,
        repeatsComponent: {
          dayOfWeek: true,
        },
      });
    } else {
      return PushNotification.localNotificationSchedule({
        title: title,
        message: message,
        channelId: 'Whispr',
        date: time,
        largeIcon: 'ic_launcher',
        bigLargeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        repeatType: repeat ? 'week' : undefined,
      });
    }
  };

  cancelAll = () => {
    return PushNotification.cancelAllLocalNotifications();
  };

  cancelNotification = (id: string) => {
    return PushNotification.cancelLocalNotification(id);
  };
}

export const notificationManager = new NotificationManager();
