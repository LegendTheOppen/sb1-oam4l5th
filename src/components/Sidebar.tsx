import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Library, 
  Settings, 
  Menu,
  X,
  User,
  Shield,
  LogOut,
  Music
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  return (
    <>
      <div className={`bg-[#0f0f0f] border-r border-[#272727] transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden md:flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#272727]">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-[#ff0000]" />
              <span className="text-xl font-semibold">Universe Music</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-[#272727] rounded-full transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-4 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#272727] text-white' 
                      : 'text-[#aaaaaa] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-[#272727] my-4" />

          {/* User Section */}
          <div className="px-2">
            {user ? (
              <div className="space-y-1">
                <div className={`flex items-center space-x-3 px-3 py-2 ${
                  isCollapsed ? 'justify-center' : ''
                }`}>
                  <div className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  {!isCollapsed && (
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.username}</p>
                      <p className="text-xs text-[#aaaaaa] truncate">{user.email}</p>
                    </div>
                  )}
                </div>
                
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-4 px-3 py-2 rounded-lg transition-colors text-[#aaaaaa] hover:bg-[#1a1a1a] hover:text-white ${
                      location.pathname === '/admin' ? 'bg-[#272727] text-white' : ''
                    }`}
                  >
                    <Shield className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">Admin</span>}
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-4 px-3 py-2 rounded-lg transition-colors text-[#aaaaaa] hover:bg-[#1a1a1a] hover:text-white"
                >
                  <LogOut className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">Sign out</span>}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                >
                  {isCollapsed ? 'In' : 'Sign in'}
                </button>
                {!isCollapsed && (
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full border border-[#272727] hover:bg-[#1a1a1a] text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                  >
                    Sign up
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default Sidebar;