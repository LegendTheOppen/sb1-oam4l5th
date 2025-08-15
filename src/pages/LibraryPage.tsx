import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Download, MoreHorizontal, Grid3X3, List } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

const LibraryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('Recently added');
  const { user } = useAuth();
  const { books } = useBooks();

  const filters = ['Recently added', 'Recently played', 'A-Z', 'Creator'];

  if (!user) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in to access your library</h2>
          <p className="text-[#aaaaaa] mb-6">
            Keep track of your favorite books and reading progress
          </p>
          <Link
            to="/explore"
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Explore books
          </Link>
        </div>
      </div>
    );
  }

  const favoriteBooks = books.filter(book => user.favorites.includes(book.id));
  const booksInProgress = books.filter(book => 
    user.readingProgress[book.id] !== undefined && 
    user.readingProgress[book.id] < book.content.length - 1
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-[#272727] text-white' : 'text-[#aaaaaa] hover:text-white'
            }`}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-[#272727] text-white' : 'text-[#aaaaaa] hover:text-white'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-white text-black'
                : 'bg-[#272727] text-[#aaaaaa] hover:bg-[#3a3a3a] hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-r from-[#ff0000] to-[#cc0000] rounded-lg p-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Liked Books</h3>
            <p className="text-white/80 text-sm">{favoriteBooks.length} books</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#272727] rounded-lg p-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <Download className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Downloaded</h3>
            <p className="text-[#aaaaaa] text-sm">0 books</p>
          </div>
        </div>
      </div>

      {/* Continue Reading */}
      {booksInProgress.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Continue reading</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {booksInProgress.map((book) => {
              const progress = user.readingProgress[book.id] || 0;
              const progressPercent = Math.round(((progress + 1) / book.content.length) * 100);
              
              return (
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                      <div className="w-full bg-white/20 rounded-full h-1 mb-1">
                        <div 
                          className="bg-[#ff0000] rounded-full h-1 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-white text-xs">{progressPercent}%</span>
                    </div>
                    <button className="absolute top-2 right-2 w-10 h-10 bg-[#ff0000] hover:bg-[#cc0000] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1 line-clamp-2">{book.title}</p>
                    <p className="text-[#aaaaaa] text-xs line-clamp-1">{book.author}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Favorite Books */}
      {favoriteBooks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Made for you</h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favoriteBooks.map((book) => (
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
          ) : (
            <div className="space-y-2">
              {favoriteBooks.map((book, index) => (
                <div
                  key={book.id}
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
                    <Link
                      to={`/reader/${book.id}`}
                      className="text-white font-medium hover:underline truncate block"
                    >
                      {book.title}
                    </Link>
                    <p className="text-[#aaaaaa] text-sm truncate">{book.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#272727] rounded-full transition-all text-[#ff0000]">
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                    <span className="text-[#aaaaaa] text-sm">4:32</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#272727] rounded-full transition-all">
                      <MoreHorizontal className="h-4 w-4 text-[#aaaaaa]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Empty State */}
      {favoriteBooks.length === 0 && booksInProgress.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-white mb-2">Let's find some books for your library</h3>
          <p className="text-[#aaaaaa] mb-6">
            Books you like will appear here
          </p>
          <Link
            to="/explore"
            className="bg-[#ff0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Find books
          </Link>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;