import instance from '../../configs/axios';
import { AuthResponse, LoginUserRequest, RegisterUserRequest } from './types';

export async function registerUser(
  payload: RegisterUserRequest,
): Promise<AuthResponse> {
  const response = await instance.post('/auth/register', payload);
  return response.data;
}

export async function loginUser(
  payload: LoginUserRequest,
): Promise<AuthResponse> {
  const response = await instance.post('/auth/login', payload);
  return response.data;
}
