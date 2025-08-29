import React, { useState } from 'react';
import { 
  Info, 
  Edit3, 
  Calendar, 
  ChevronDown,
  DollarSign,
  MessageSquare,
  Gift,
  CreditCard
} from 'lucide-react';
import type { User, FanInsight } from '../types';

interface FanInsightsProps {
  selectedUser: User | null;
  insights: FanInsight | null;
}

const FanInsights: React.FC<FanInsightsProps> = ({ selectedUser, insights }) => {
  const [activeTab, setActiveTab] = useState('Insights');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(insights?.nickname || 'baby');

  const tabs = ['Insights', 'PPVs', 'Notes'];

  if (!selectedUser || !insights) {
    return (
      <div className="w-80 bg-zinc-900 border-l border-zinc-700 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Info className="text-zinc-600" size={24} />
          </div>
          <h3 className="text-lg font-medium text-zinc-400 mb-2">Fan Insights</h3>
          <p className="text-sm text-zinc-600">Sélectionnez une conversation pour voir les insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-zinc-700">
        <h2 className="text-lg font-bold text-white mb-4">Fan Insights</h2>
        
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={selectedUser.profileImage}
            alt={selectedUser.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-white text-sm">{selectedUser.name}</h3>
            <p className="text-xs text-zinc-400">@{selectedUser.username}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign size={16} className="text-zinc-400 mr-1" />
                  <span className="text-xs text-zinc-400">Subscription</span>
                </div>
                <p className="text-lg font-bold text-white">${insights.subscription}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Gift size={16} className="text-zinc-400 mr-1" />
                  <span className="text-xs text-zinc-400">Tips ($)</span>
                </div>
                <p className="text-lg font-bold text-white">{insights.tips}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <MessageSquare size={16} className="text-zinc-400 mr-1" />
                  <span className="text-xs text-zinc-400">Messages ($)</span>
                </div>
                <p className="text-lg font-bold text-white">{insights.messages}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <CreditCard size={16} className="text-zinc-400 mr-1" />
                  <span className="text-xs text-zinc-400">Spent ($)</span>
                  <Info size={12} className="text-zinc-500 ml-1" />
                </div>
                <p className="text-lg font-bold text-white">{insights.spent}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400">Last paid</span>
              <span className="text-sm text-white">{insights.lastPaid}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400">Highest purchase</span>
              <span className="text-sm text-white">${insights.highestPurchase}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400">Subscription status</span>
              <span className="text-sm text-green-400 font-medium">{insights.subscriptionStatus}</span>
            </div>
            <button className="w-full mt-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
              Renew
            </button>
          </div>
        </div>
      </div>

      {/* Fan Info */}
      <div className="p-6 border-b border-zinc-700">
        <h3 className="text-sm font-semibold text-white mb-4">Fan Info</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-2">Local time</label>
            <div className="relative">
              <select className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Unknown</option>
                <option>UTC+1 (Paris)</option>
                <option>UTC-5 (New York)</option>
                <option>UTC+9 (Tokyo)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-zinc-400 mb-2">Source</label>
            <div className="relative">
              <select className="w-full bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option>Unknown</option>
                <option>Direct</option>
                <option>Social Media</option>
                <option>Referral</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2">Nickname</label>
            <div className="flex items-center space-x-2">
              {isEditingNickname ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={() => setIsEditingNickname(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingNickname(false);
                    }
                  }}
                  className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <div className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm">
                  {nickname}
                </div>
              )}
              <button
                onClick={() => setIsEditingNickname(!isEditingNickname)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              >
                <Edit3 size={14} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-2">Birthday</label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                <Calendar size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fan Lists Tabs */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-zinc-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-green-500 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeTab === 'Insights' && (
            <div className="text-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Info className="text-zinc-600" size={20} />
              </div>
              <p className="text-sm text-zinc-500">No insights yet</p>
              <p className="text-xs text-zinc-600 mt-1">Les données apparaîtront ici</p>
            </div>
          )}
          {activeTab === 'PPVs' && (
            <div className="text-center">
              <p className="text-sm text-zinc-500">No PPVs</p>
            </div>
          )}
          {activeTab === 'Notes' && (
            <div className="text-center">
              <p className="text-sm text-zinc-500">No notes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FanInsights;