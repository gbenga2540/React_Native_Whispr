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
  profile_picture?: File;
}

// Response
export interface AuthResponse
  extends ServerResponse<{
    user_id: string;
    token: string;
  }> {}
