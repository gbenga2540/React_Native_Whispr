import { IChat } from 'src/interface/chat';

// Requests
export interface CreateChatRequest {
  sender_id: string;
  receiver_id: string;
}
export interface GetUserChatsRequest extends ServerPaginationRequest {
  user_id: string;
}

// Response
export interface CreateChatResponse {
  members?: string[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetUserChatsResponse
  extends ServerResponse<ServerPaginationResponse<IChat>> {}
