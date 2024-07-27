import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { screenHeight } from 'src/design-system';

interface ToastProps {
  title?: string;
  message?: string;
  hideMsg?: boolean;
}

export const errorToast = ({ title, message, hideMsg }: ToastProps) => {
  Toast.show({
    type: 'error',
    text1: title ?? 'An Error Occurred!',
    text2: hideMsg ? undefined : message ?? 'Something went wrong',
    autoHide: true,
    visibilityTime: 4000,
    topOffset: Platform.OS === 'ios' ? (screenHeight > 850 ? 55 : 35) : 25,
  });
};

export const successToast = ({ title, message, hideMsg }: ToastProps) => {
  Toast.show({
    type: 'success',
    text1: title ?? 'Action Completed!',
    text2: hideMsg ? undefined : message ?? 'Operation Successful!',
    autoHide: true,
    visibilityTime: 4000,
    topOffset: Platform.OS === 'ios' ? (screenHeight > 850 ? 55 : 35) : 25,
  });
};

export const infoToast = ({ title, message }: ToastProps) => {
  Toast.show({
    type: 'info',
    text1: title ?? 'Information!',
    text2: message ?? '',
    autoHide: true,
    visibilityTime: 4000,
    topOffset: Platform.OS === 'ios' ? (screenHeight > 850 ? 55 : 35) : 25,
  });
};
