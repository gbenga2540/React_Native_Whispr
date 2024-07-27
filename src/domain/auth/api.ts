import instance from '../../configs/axios';
import {
  AuthResponse,
  GetOTPRequest,
  GetOTPResponse,
  LoginUserRequest,
  RegisterUserRequest,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from './types';

export async function registerUser(
  payload: RegisterUserRequest,
): Promise<AuthResponse> {
  const data = new FormData();
  data.append('user_name', payload.user_name);
  data.append('full_name', payload.full_name);
  data.append('bio', payload.bio);
  data.append('phone_number', payload.phone_number);
  data.append('email', payload.email);
  data.append('password', payload.password);
  if (payload.profile_picture) {
    data.append('profile_picture', {
      uri: payload.profile_picture.uri,
      type: payload.profile_picture.type,
      name: payload.profile_picture.fileName,
      height: payload.profile_picture.height,
      width: payload.profile_picture.width,
    });
  }

  const response = await instance.post('/auth/register', data);
  return response.data;
}

export async function loginUser(
  payload: LoginUserRequest,
): Promise<AuthResponse> {
  const response = await instance.post('/auth/login', payload);
  return response.data;
}

export async function getOTP(payload: GetOTPRequest): Promise<GetOTPResponse> {
  const response = await instance.post('/auth/get_code', payload);
  return response.data;
}

export async function verifyOTP(
  payload: VerifyOTPRequest,
): Promise<VerifyOTPResponse> {
  const response = await instance.post('/auth/verify_code', payload);
  return response.data;
}
