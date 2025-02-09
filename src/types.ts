export interface Contact {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  senderId: number; // 0 表示自己，其他表示联系人
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  [contactId: number]: Message[];
}