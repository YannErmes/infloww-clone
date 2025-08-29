import React, { useState } from 'react';
import { Search, MoreVertical, Send, Smile, Paperclip, Gift, MessageCircle } from 'lucide-react';
import type { User, Message } from '../types';

interface ChatAreaProps {
  selectedUser: User | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  isAutoReplying?: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedUser,
  messages,
  currentUserId,
  onSendMessage,
  isAutoReplying = false
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="mx-auto mb-4 text-zinc-600" size={48} />
          <h3 className="text-lg font-medium text-zinc-400 mb-2">Aucune conversation sélectionnée</h3>
          <p className="text-sm text-zinc-600">Choisissez une conversation pour commencer à discuter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 flex-1">
      {/* Chat Header */}
      <div className="p-4 border-b border-zinc-700 bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={selectedUser.profileImage}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-white text-base">{selectedUser.name}</h2>
              <p className="text-xs text-zinc-400">@{selectedUser.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
              <Search size={18} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative" id="chat-messages">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUserId;
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'} message-bubble-animation`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwn
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-zinc-800 text-white rounded-tl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isOwn ? 'text-blue-100' : 'text-zinc-500'
                }`}>
                  {formatMessageTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}

        {/* Auto-reply typing indicator */}
        {isAutoReplying && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 text-white px-4 py-2 rounded-lg rounded-tl-none max-w-xs">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-zinc-400 ml-2">typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-zinc-700 bg-zinc-900">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <Paperclip size={18} />
          </button>
          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <Gift size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <input
              id="message-input"
              type="text"
              placeholder="Tapez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
            <Smile size={18} />
          </button>
          <button
            onClick={handleSendMessage}
            className={`text-white p-2.5 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAnimating
                ? 'bg-blue-700 transform scale-95'
                : 'bg-blue-500 hover:bg-blue-600 transform scale-100'
            }`}
            disabled={!newMessage.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
