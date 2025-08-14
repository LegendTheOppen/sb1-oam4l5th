import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Sparkles, Zap, Users, Brain } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden pb-20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-float-delay-1" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400/35 rounded-full animate-float-delay-2" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300/40 rounded-full animate-float" />
      </div>
      
      <div className="relative z-10 text-center px-6 space-y-8">
        {/* Logo/Title - Mobile Optimized */}
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 leading-tight">
            Universe Mind
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light tracking-wide max-w-sm mx-auto leading-relaxed">
            Discover infinite knowledge, one story at a time
          </p>
        </div>

        {/* Main Explore Button - Large & Thumb-Friendly */}
        <div className="animate-fade-in-delay-1">
          <Link
            to="/explore"
            className="group inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 active:scale-95 transform min-w-[280px]"
          >
            <Search className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
            <span>Explore Books</span>
            <Sparkles className="h-6 w-6 group-hover:animate-pulse transition-all duration-300" />
          </Link>
        </div>

        {/* Features - Mobile Stacked */}
        <div className="space-y-4 animate-fade-in-delay-2 max-w-sm mx-auto">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 active:scale-95">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-1">Vast Library</h3>
                <p className="text-gray-400 text-sm">Thousands of books to explore</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 active:scale-95">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-1">Smart Reading</h3>
                <p className="text-gray-400 text-sm">AI-powered recommendations</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 transition-all duration-300 active:scale-95">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-1">Community</h3>
                <p className="text-gray-400 text-sm">Connect with fellow readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;