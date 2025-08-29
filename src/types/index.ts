export interface User {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  isVerified?: boolean;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'video';
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  isPriority: boolean;
  hasNewTip: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}