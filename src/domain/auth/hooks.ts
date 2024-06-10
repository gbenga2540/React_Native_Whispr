import { useMutation } from 'react-query';
import { loginUser, registerUser } from './api';

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
