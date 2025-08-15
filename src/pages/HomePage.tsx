import React from 'react';
import { Link } from 'react-router-dom';
import { Play, MoreHorizontal } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';

const HomePage: React.FC = () => {
  const { books } = useBooks();

  const quickPicks = books.slice(0, 6);
  const recentlyPlayed = books.slice(0, 4);
  const madeForYou = books.slice(1, 5);

  return (
    <div className="p-6 space-y-8">
      {/* Quick Picks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Quick picks</h2>
          <button className="text-[#aaaaaa] hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickPicks.map((book) => (
            <Link
              key={book.id}
              to={`/reader/${book.id}`}
              className="group bg-[#1a1a1a] hover:bg-[#272727] rounded-lg p-3 flex items-center space-x-4 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{book.title}</p>
                <p className="text-[#aaaaaa] text-sm truncate">{book.author}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-[#ff0000] hover:bg-[#cc0000] rounded-full flex items-center justify-center transition-all">
                <Play className="h-4 w-4 text-white ml-0.5" />
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <button className="text-[#aaaaaa] hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((book) => (
            <Link
              key={book.id}
              to={`/reader/${book.id}`}
              className="group"
            >
              <div className="relative mb-3">
                <div className="aspect-square rounded-lg overflow-hidden bg-[#272727]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#ff0000] hover:bg-[#cc0000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Play className="h-5 w-5 text-white ml-0.5" />
                </button>
              </div>
              <div>
                <p className="text-white font-medium text-sm mb-1 line-clamp-2">{book.title}</p>
                <p className="text-[#aaaaaa] text-xs line-clamp-1">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-[#aaaaaa] hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {madeForYou.map((book) => (
            <Link
              key={book.id}
              to={`/reader/${book.id}`}
              className="group"
            >
              <div className="relative mb-3">
                <div className="aspect-square rounded-lg overflow-hidden bg-[#272727]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#ff0000] hover:bg-[#cc0000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Play className="h-5 w-5 text-white ml-0.5" />
                </button>
              </div>
              <div>
                <p className="text-white font-medium text-sm mb-1 line-clamp-2">{book.title}</p>
                <p className="text-[#aaaaaa] text-xs line-clamp-1">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Trending</h2>
          <button className="text-[#aaaaaa] hover:text-white text-sm font-medium">
            Show all
          </button>
        </div>
        
        <div className="space-y-2">
          {books.slice(0, 5).map((book, index) => (
            <Link
              key={book.id}
              to={`/reader/${book.id}`}
              className="group flex items-center space-x-4 p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              <div className="w-6 text-center">
                <span className="text-[#aaaaaa] text-sm font-medium">{index + 1}</span>
              </div>
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{book.title}</p>
                <p className="text-[#aaaaaa] text-sm truncate">{book.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[#aaaaaa] text-sm">4:32</span>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#272727] rounded-full transition-all">
                  <MoreHorizontal className="h-4 w-4 text-[#aaaaaa]" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;