export enum IMessageType {
  Image = 'Image',
  Text = 'Text',
  Audio = 'Audio',
  Doc = 'Doc',
}

// U is unread, D is delivered, R is read
export enum IMessageStatus {
  U = 'U',
  D = 'D',
  R = 'R',
}

export interface IMessage {
  _id?: string;
  chat_id?: string;
  sender_id?: string;
  type?: `${IMessageType}`;
  data?: string;
  status?: `${IMessageStatus}`;
  createdAt?: string;
  updatedAt?: string;
}
