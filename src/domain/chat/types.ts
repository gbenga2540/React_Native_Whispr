import { IChat } from 'src/interface/chat';

// Create Chat
export interface CreateChatRequest {
  sender_id: string;
  receiver_id: string;
}
export interface CreateChatResponse
  extends ServerResponse<{
    members?: string[];
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  }> {}

// Get User Chats
export interface GetUserChatsRequest extends ServerPaginationRequest {
  user_id: string;
}
export interface GetUserChatsResponse
  extends ServerResponse<ServerPaginationResponse<IChat>> {}
