import { IChat } from './chat';
import { IMessage } from './message';

export interface IOnlineUser {
  user_id: string;
  socket_id: string;
}

export interface INewChat {
  receiver_id: string;
  chat: IChat;
}

export interface INewMessage {
  receiver_id: string;
  message: IMessage;
}
