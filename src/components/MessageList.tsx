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

  const truncateMessage = (text: string, maxLength: number = 40) => { // Reduced maxLength
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-700 w-[280px]"> {/* Reduced width */}
      {/* Search Bar */}
      <div className="p-3 border-b border-zinc-700"> {/* Reduced padding */}
        <div className="flex items-center space-x-2"> {/* Reduced space */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} /> {/* Adjusted position and size */}
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white pl-8 pr-3 py-2 rounded-full border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs" /* Reduced padding and text size */
            />
          </div>
          <div className="relative">
            <button className="flex items-center space-x-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-2 rounded-full transition-colors text-xs"> {/* Reduced padding and text size */}
              <Filter size={14} />
              <span className="text-xs font-medium">{sortOrder}</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 py-2 border-b border-zinc-700"> {/* Reduced padding */}
        <div className="flex space-x-1.5 overflow-x-auto"> {/* Reduced space */}
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
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
        <div className="space-y-0.5 p-1.5"> {/* Reduced space and padding */}
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedConversationId === conversation.id
                  ? 'bg-zinc-800 border-l-2 border-blue-500'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-start space-x-2.5"> {/* Reduced space */}
                <div className="relative">
                  <img
                    src={conversation.participant.profileImage}
                    alt={conversation.participant.name}
                    className="w-9 h-9 rounded-full object-cover" /* Reduced size */
                  />
                  {conversation.participant.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-zinc-900"></div> /* Reduced size */
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5"> {/* Reduced margin */}
                    <div className="flex items-center space-x-1.5"> {/* Reduced space */}
                      <h4 className="font-semibold text-white text-xs"> {/* Reduced text size */}
                        {conversation.participant.name}
                      </h4>
                      {conversation.participant.isVerified && (
                        <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[10px]"> {/* Reduced size and text */}
                          ✓
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500"> {/* Reduced text size */}
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 mb-0.5">@{conversation.participant.username}</p> {/* Reduced text size and margin */}
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-zinc-500 truncate"> {/* Reduced text size */}
                      {truncateMessage(conversation.lastMessage.content)}
                    </p>
                    <div className="flex items-center space-x-1.5"> {/* Reduced space */}
                      {conversation.hasNewTip && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-[10px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center"> {/* Reduced text size and padding */}
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
