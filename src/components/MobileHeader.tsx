import React from 'react';
import { Menu, Search, MoreVertical } from 'lucide-react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle }) => {
  return (
    <div className="lg:hidden bg-zinc-900 border-b border-zinc-700 p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuToggle}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="text-lg font-semibold text-white">Messages</h1>
        
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
  );
};

export default MobileHeader;