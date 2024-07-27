import { useMutation } from 'react-query';
import { getOTP, loginUser, registerUser, verifyOTP } from './api';

export function useRegisterUser() {
  return useMutation(registerUser, {
    mutationKey: 'registerUser',
  });
}

export function useLoginUser() {
  return useMutation(loginUser, {
    mutationKey: 'loginUser',
  });
}

export function useGetOTP() {
  return useMutation(getOTP, {
    mutationKey: 'getOTP',
  });
}

export function useVerifyOTP() {
  return useMutation(verifyOTP, {
    mutationKey: 'verifyOTP',
  });
}
