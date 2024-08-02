import { AxiosError } from 'axios';
import { QueryClient } from 'react-query';
import { errorToast, successToast } from 'src/helpers';
import { remove } from './storage';
import { strings } from './strings';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // extend stale time to one minute
      // if this time set here hasn't gone by it shouldn't hit the server again
      // the default is 20 seconds
      staleTime: 1000 * 60,
      onError: error => {
        handleErrors(error as AxiosError);
      },
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: error => {
        handleErrors(error as AxiosError);
      },
    },
  },
});

export async function handleErrors(error: AxiosError) {
  const message = extractErrorMessage(error);

  if (error.status === 401) {
    //TODO: Logout
    await remove(strings.userToken);
  }

  errorToast({
    title: 'Error',
    message: message,
  });
}

export function handleSuccess(msg: string) {
  successToast({
    title: 'Successful',
    message: msg,
  });
}

export function extractErrorMessage(error: AxiosError) {
  const errorResponse = error?.response?.data as any;
  return errorResponse?.message ?? 'Something went wrong';
}
