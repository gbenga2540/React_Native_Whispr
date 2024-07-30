import { IMessage } from 'src/interface/message';

// Create Message
export interface CreateMessageRequest
  extends Pick<IMessage, 'chat_id' | 'sender_id' | 'type' | 'data'> {}
export interface CreateMessageResponse extends ServerResponse<string> {}

// Get Chat Messages
export interface GetUserMessagesRequest {
  chat_id: string;
  from: string;
}
export interface GetUserMessagesResponse extends ServerResponse<IMessage[]> {}
