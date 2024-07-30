import { ImageOrVideo } from 'react-native-image-crop-picker';

// Register / Login
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
  profile_picture?: ImageOrVideo | null;
}
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

// Get OTP
export interface GetOTPRequest {
  email: string;
  phone_number: string;
  user_name: string;
}
export interface GetOTPResponse extends ServerResponse<string> {}

// Verify OTP
export interface VerifyOTPRequest {
  email: string;
  token: string;
}
export interface VerifyOTPResponse extends ServerResponse<boolean> {}
