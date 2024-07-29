import { IMessage } from './message';

export interface IChat {
  chat_id?: string;
  created_at?: string;
  recipient_info?: {
    user_id?: string;
    user_name?: string;
    profile_picture?: string;
  };

  //new info
  last_message_info?: {
    text?: string;
    at?: string;
    unread?: number;
    status?: IMessage['status'];
  };
  online?: boolean;
}
