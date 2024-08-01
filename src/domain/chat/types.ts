import { IChat } from 'src/interface/chat';

// Create Chat
export interface CreateChatRequest {
  sender_id: string;
  receiver_id: string;
}
export interface CreateChatResponse extends ServerResponse<IChat> {}

// Get User Chats
export interface GetUserChatsRequest extends ServerPaginationRequest {
  user_id: string;
}
export interface GetUserChatsResponse
  extends ServerResponse<ServerPaginationResponse<IChat>> {}
