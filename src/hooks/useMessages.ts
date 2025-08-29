import { useState, useEffect, useRef } from 'react';
import type { Conversation, Message, User } from '../types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    username: 'sophiem_art',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Luna Rodriguez',
    username: 'luna_creative',
    profileImage: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Aria Thompson',
    username: 'aria_photos',
    profileImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    isVerified: false,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Maya Chen',
    username: 'maya_digital',
    profileImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '5',
    name: 'Zoe Williams',
    username: 'zoe_lifestyle',
    profileImage: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    isVerified: false,
    isOnline: false,
  }
];

const generateMockMessages = (userId: string): Message[] => [
  {
    id: `msg-${userId}-1`,
    senderId: userId,
    receiverId: 'current-user',
    content: 'Salut ! Comment ça va aujourd\'hui ?',
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    isRead: Math.random() > 0.5,
    type: 'text'
  },
  {
    id: `msg-${userId}-2`,
    senderId: 'current-user',
    receiverId: userId,
    content: 'Ça va très bien merci ! Et toi ?',
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    isRead: true,
    type: 'text'
  },
  {
    id: `msg-${userId}-3`,
    senderId: userId,
    receiverId: 'current-user',
    content: 'Parfait ! J\'ai hâte de partager mes nouvelles créations avec toi 😊',
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    isRead: Math.random() > 0.5,
    type: 'text'
  }
];

export const useMessages = () => {
  const [conversations] = useState<Conversation[]>(() =>
    mockUsers.map((user) => {
      const messages = generateMockMessages(user.id);
      const lastMessage = messages[messages.length - 1];
      
      return {
        id: `conv-${user.id}`,
        participant: user,
        lastMessage,
        unreadCount: Math.floor(Math.random() * 5),
        isPriority: Math.random() > 0.7,
        hasNewTip: Math.random() > 0.8,
      };
    })
  );

  const [allMessages] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(
      mockUsers.map(user => [user.id, generateMockMessages(user.id)])
    )
  );

  const [allMessagesState, setAllMessagesState] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(
      mockUsers.map(user => [user.id, generateMockMessages(user.id)])
    )
  );

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const getMessagesForUser = (userId: string): Message[] => {
    return allMessagesState[userId] || [];
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId: selectedConversation.participant.id,
      content,
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    // Ajouter le message à la liste des messages
    setAllMessagesState(prev => ({
      ...prev,
      [selectedConversation.participant.id]: [
        ...(prev[selectedConversation.participant.id] || []),
        newMessage
      ]
    }));

    // Faire défiler vers le bas
    scrollToBottom();
  };

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    getMessagesForUser,
    sendMessage,
    currentUserId: 'current-user'
  };
};