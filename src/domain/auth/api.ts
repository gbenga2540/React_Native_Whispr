import instance from '../../configs/axios';
import { AuthResponse, LoginUserRequest, RegisterRequest } from './types';

export async function registerUser(
  payload: RegisterRequest,
): Promise<AuthResponse> {
  const response = await instance.post('/register', payload);
  return response.data;
}

export async function loginUser(
  payload: LoginUserRequest,
): Promise<AuthResponse> {
  const response = await instance.post('/login', payload);
  return response.data;
}
