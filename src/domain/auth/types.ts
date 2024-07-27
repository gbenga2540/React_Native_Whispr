import { Asset } from 'react-native-image-picker';

// Requests
export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface RegisterUserRequest {
  email: string;
  password: string;
  user_name: string;
  full_name: string;
  phone_number: string;
  bio: string;
  profile_picture?: Asset | null;
}
export interface GetOTPRequest {
  email: string;
  phone_number: string;
  user_name: string;
}
export interface VerifyOTPRequest {
  email: string;
  token: string;
}

// Response
export interface AuthResponse
  extends ServerResponse<{
    token?: string;
    user?: {
      email?: string;
      user_id?: string;
      user_name?: string;
      full_name?: string;
      phone_number?: string;
      bio?: string;
      joined?: string;
      profile_picture?: string;
    };
  }> {}
export interface GetOTPResponse extends ServerResponse<string> {}
export interface VerifyOTPResponse extends ServerResponse<boolean> {}
