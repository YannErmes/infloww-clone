import React from 'react';
import { 
  Home, 
  Bell, 
  MessageCircle, 
  Bookmark, 
  Lock, 
  Clock, 
  FileText, 
  User, 
  MoreHorizontal,
  Plus
} from 'lucide-react';
import type { NavItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Accueil', icon: 'Home' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', badge: 3 },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle', badge: 12 },
    { id: 'collections', label: 'Collections', icon: 'Bookmark' },
    { id: 'vault', label: 'Vault', icon: 'Lock' },
    { id: 'queue', label: 'Queue', icon: 'Clock' },
    { id: 'statements', label: 'Statements', icon: 'FileText' },
    { id: 'profile', label: 'Mon profil', icon: 'User' },
    { id: 'more', label: 'Plus', icon: 'MoreHorizontal' },
  ];

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const icons = {
      Home,
      Bell,
      MessageCircle,
      Bookmark,
      Lock,
      Clock,
      FileText,
      User,
      MoreHorizontal,
    };
    const Icon = icons[iconName as keyof typeof icons];
    return Icon ? <Icon size={20} /> : <Home size={20} />;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-700 z-50
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b border-zinc-700">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              </div>
              <h3 className="mt-3 font-semibold text-white text-sm">Emma Wilson</h3>
              <p className="text-xs text-zinc-400">@emmaw_creator</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center px-3 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-5 h-5 mr-3">
                    <IconComponent iconName={item.icon} />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* New Post Button */}
          <div className="p-4 border-t border-zinc-700">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center">
              <Plus size={18} className="mr-2" />
              Nouveau Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;