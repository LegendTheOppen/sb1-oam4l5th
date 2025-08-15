import React from 'react';
import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from 'lucide-react';

const BottomPlayer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#272727] px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-[#272727] rounded-lg flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg"
              alt="Current book"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">The Quantum Mind</p>
            <p className="text-xs text-[#aaaaaa] truncate">Dr. Sarah Chen</p>
          </div>
          <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
            <Heart className="h-4 w-4 text-[#aaaaaa] hover:text-white" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
              <Shuffle className="h-4 w-4 text-[#aaaaaa] hover:text-white" />
            </button>
            <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
              <SkipBack className="h-5 w-5 text-[#aaaaaa] hover:text-white" />
            </button>
            <button className="w-8 h-8 bg-white hover:bg-[#e0e0e0] rounded-full flex items-center justify-center transition-colors">
              <Play className="h-4 w-4 text-black ml-0.5" />
            </button>
            <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
              <SkipForward className="h-5 w-5 text-[#aaaaaa] hover:text-white" />
            </button>
            <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
              <Repeat className="h-4 w-4 text-[#aaaaaa] hover:text-white" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-[#aaaaaa]">1:23</span>
            <div className="flex-1 bg-[#272727] rounded-full h-1">
              <div className="bg-white rounded-full h-1 w-1/3"></div>
            </div>
            <span className="text-xs text-[#aaaaaa]">4:56</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button className="p-1 hover:bg-[#272727] rounded-full transition-colors">
            <Volume2 className="h-4 w-4 text-[#aaaaaa] hover:text-white" />
          </button>
          <div className="w-20 bg-[#272727] rounded-full h-1">
            <div className="bg-white rounded-full h-1 w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;