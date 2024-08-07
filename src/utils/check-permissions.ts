import { Platform } from 'react-native';
import { requestNotifications } from 'react-native-permissions';

export const checkAndRequestNotificationPermission = async () => {
  if (Platform.OS !== 'android') {
    return;
  }
  requestNotifications(['alert', 'sound']);
  // .then(({ status, settings }) => {});
};
