import React, { useState } from 'react';
import { Search, Menu, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  return (
    <header className="bg-[#0f0f0f] border-b border-[#272727] px-4 py-3 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 hover:bg-[#272727] rounded-full transition-colors">
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#aaaaaa]" />
          <input
            type="text"
            placeholder="Search songs, albums, artists, podcasts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-[#1a1a1a] border border-[#272727] rounded-full text-white placeholder-[#aaaaaa] focus:outline-none focus:border-[#ff0000] transition-colors"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-[#272727] rounded-full transition-colors">
          <Settings className="h-5 w-5 text-[#aaaaaa]" />
        </button>
        
        {user && (
          <div className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;