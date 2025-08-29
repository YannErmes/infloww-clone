import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import type { Conversation } from '../types';

interface MessageListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('NEWEST FIRST');

  const filters = ['All', 'Priority', 'Unread', 'With Tips', 'Verified S'];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const truncateMessage = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-700">
      {/* Search Bar */}
      <div className="p-4 border-b border-zinc-700">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher des conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2.5 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="relative">
            <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2.5 rounded-full transition-colors">
              <Filter size={16} />
              <span className="text-xs font-medium">{sortOrder}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-zinc-700">
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedConversationId === conversation.id
                  ? 'bg-zinc-800 border-l-2 border-blue-500'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participant.profileImage}
                    alt={conversation.participant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {conversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white text-sm">
                        {conversation.participant.name}
                      </h4>
                      {conversation.participant.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-1">@{conversation.participant.username}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 truncate">
                      {truncateMessage(conversation.lastMessage.content)}
                    </p>
                    <div className="flex items-center space-x-2">
                      {conversation.hasNewTip && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                      {conversation.isPriority && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;