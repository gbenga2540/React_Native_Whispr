// Requests
export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

// Response
export interface AuthResponse
  extends ServerResponse<{
    user_id: string;
    token: string;
  }> {}
