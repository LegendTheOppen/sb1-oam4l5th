import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const BottomNavigation: React.FC = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();
  const location = useLocation();

  const isReaderPage = location.pathname.startsWith('/reader/');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsOptionsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOptionsOpen(false);
  };

  if (isReaderPage) return null;

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50">
        <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
          {/* Options */}
          <button
            onClick={() => setIsOptionsOpen(true)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <div className={`p-2 rounded-xl transition-all duration-200 ${
              isOptionsOpen ? 'bg-purple-500/20 shadow-lg shadow-purple-500/25' : 'hover:bg-gray-800/50'
            }`}>
              <Menu className={`h-6 w-6 transition-colors ${
                isOptionsOpen ? 'text-purple-400' : 'text-gray-400'
              }`} />
            </div>
            <span className={`text-xs mt-1 transition-colors ${
              isOptionsOpen ? 'text-purple-400' : 'text-gray-500'
            }`}>Options</span>
          </button>

          {/* Explore */}
          <Link
            to="/explore"
            className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <div className={`p-2 rounded-xl transition-all duration-200 ${
              location.pathname === '/explore' 
                ? 'bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                : 'hover:bg-gray-800/50'
            }`}>
              <Search className={`h-6 w-6 transition-colors ${
                location.pathname === '/explore' ? 'text-blue-400' : 'text-gray-400'
              }`} />
            </div>
            <span className={`text-xs mt-1 transition-colors ${
              location.pathname === '/explore' ? 'text-blue-400' : 'text-gray-500'
            }`}>Explore</span>
          </Link>

          {/* Library */}
          <Link
            to="/library"
            className="flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <div className={`p-2 rounded-xl transition-all duration-200 ${
              location.pathname === '/library' 
                ? 'bg-pink-500/20 shadow-lg shadow-pink-500/25' 
                : 'hover:bg-gray-800/50'
            }`}>
              <Heart className={`h-6 w-6 transition-colors ${
                location.pathname === '/library' ? 'text-pink-400' : 'text-gray-400'
              }`} />
            </div>
            <span className={`text-xs mt-1 transition-colors ${
              location.pathname === '/library' ? 'text-pink-400' : 'text-gray-500'
            }`}>Library</span>
          </Link>
        </div>
      </nav>

      {/* Options Slide Menu */}
      {isOptionsOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOptionsOpen(false)}
          />
          
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 transform transition-transform duration-300 ease-out slide-in-left">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <h2 className="text-2xl font-bold text-white">Options</h2>
              <button
                onClick={() => setIsOptionsOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 active:scale-95"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* User Section */}
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user.username}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOptionsOpen(false)}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 transition-all duration-200 active:scale-95"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-white">Admin Panel</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-200 active:scale-95"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <LogOut className="h-5 w-5" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full border border-gray-600 hover:bg-gray-800/50 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 active:scale-95"
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Settings Sections */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
                
                <button className="w-full flex items-center space-x-4 p-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Bell className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">Notifications</span>
                    <p className="text-sm text-gray-500">Manage alerts & updates</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-4 p-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl transition-all duration-200 active:scale-95">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Settings className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">Personalization</span>
                    <p className="text-sm text-gray-500">Themes, fonts & reading</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </>
  );
};

export default BottomNavigation;