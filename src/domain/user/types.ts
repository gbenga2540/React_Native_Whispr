// Requests
export interface GetUserRequest {
  user_id: string;
}

// Response
export interface GetUserResponse extends ServerResponse<{ user_id: string }> {}
