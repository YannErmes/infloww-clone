import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatArea from './components/ChatArea';
import FanInsights from './components/FanInsights';
import MobileHeader from './components/MobileHeader';
import { useMessages } from './hooks/useMessages';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    getMessagesForUser,
    sendMessage,
    currentUserId,
    getFanInsights,
    isAutoReplying
  } = useMessages();

  const handleSelectConversation = (conversation: typeof conversations[0]) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };
  return (
    <div className="h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} />
      
      <div className="flex h-full lg:h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Message List */}
        <div className={`
          flex-1 lg:max-w-md
          ${showChat ? 'hidden lg:flex' : 'flex'}
        `}>
          <MessageList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id || null}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        {/* Chat Area */}
        <div className={`
          flex lg:min-w-0 lg:flex-1
          ${showChat ? 'flex' : 'hidden lg:flex'}
        `}>
          <ChatArea
            selectedUser={selectedConversation?.participant || null}
            messages={selectedConversation ? getMessagesForUser(selectedConversation.participant.id) : []}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
            isAutoReplying={isAutoReplying}
          />
          
          {/* Fan Insights - Hidden on mobile */}
          <div className="hidden lg:block">
            <FanInsights
              selectedUser={selectedConversation?.participant || null}
              insights={selectedConversation ? getFanInsights(selectedConversation.participant.id) : null}
            />
          </div>
        </div>
        
        {/* Back button for mobile */}
        {showChat && (
          <button
            onClick={() => setShowChat(false)}
            className="lg:hidden fixed top-4 left-4 z-50 bg-zinc-800 text-white p-2 rounded-full"
          >
            ←
          </button>
        )}
      </div>
    </div>
  );
}

export default App;