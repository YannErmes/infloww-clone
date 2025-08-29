import { useState, useEffect, useRef } from 'react';
import type { Conversation, Message, User, FanInsight } from '../types';

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

const mockFanInsights: Record<string, FanInsight> = {
  '1': {
    subscription: 0,
    tips: 0,
    messages: 0,
    spent: 0,
    lastPaid: '--',
    highestPurchase: 0,
    subscriptionStatus: 'Free',
    localTime: 'Unknown',
    source: 'Unknown',
    nickname: 'baby',
    birthday: ''
  },
  '2': {
    subscription: 25,
    tips: 150,
    messages: 45,
    spent: 220,
    lastPaid: '2024-12-15',
    highestPurchase: 75,
    subscriptionStatus: 'Premium',
    localTime: 'UTC-5 (New York)',
    source: 'Social Media',
    nickname: 'luna_fan',
    birthday: '1995-08-22'
  },
  '3': {
    subscription: 0,
    tips: 25,
    messages: 12,
    spent: 37,
    lastPaid: '2024-11-28',
    highestPurchase: 25,
    subscriptionStatus: 'Free',
    localTime: 'UTC+1 (Paris)',
    source: 'Direct',
    nickname: 'aria_supporter',
    birthday: ''
  },
  '4': {
    subscription: 50,
    tips: 300,
    messages: 89,
    spent: 439,
    lastPaid: '2024-12-20',
    highestPurchase: 100,
    subscriptionStatus: 'VIP',
    localTime: 'UTC+8 (Beijing)',
    source: 'Referral',
    nickname: 'maya_vip',
    birthday: '1992-03-15'
  },
  '5': {
    subscription: 0,
    tips: 0,
    messages: 0,
    spent: 0,
    lastPaid: '--',
    highestPurchase: 0,
    subscriptionStatus: 'Free',
    localTime: 'Unknown',
    source: 'Unknown',
    nickname: 'zoe_new',
    birthday: ''
  }
};

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
  const [isAutoReplying, setIsAutoReplying] = useState(false);

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

    // Simuler une réponse automatique après 1.5 secondes
    if (!isAutoReplying) {
      setIsAutoReplying(true);
      setTimeout(() => {
        const autoReply: Message = {
          id: `auto-reply-${Date.now()}`,
          senderId: selectedConversation.participant.id,
          receiverId: 'current-user',
          content: 'Thanks for your message! I\'ll reply soon. 😊',
          timestamp: new Date(),
          isRead: false,
          type: 'text'
        };

        setAllMessagesState(prev => ({
          ...prev,
          [selectedConversation.participant.id]: [
            ...(prev[selectedConversation.participant.id] || []),
            autoReply
          ]
        }));

        scrollToBottom();
        setIsAutoReplying(false);
      }, 1500);
    }
  };

  const getFanInsights = (userId: string): FanInsight | null => {
    return mockFanInsights[userId] || null;
  };

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    getMessagesForUser,
    sendMessage,
    currentUserId: 'current-user',
    getFanInsights,
    isAutoReplying
  };
};