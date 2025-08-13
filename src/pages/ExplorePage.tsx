import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, BookOpen, User, Tag, TrendingUp } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const { books, searchBooks } = useBooks();
  const { user, updateFavorites } = useAuth();

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredBooks(searchBooks(searchQuery));
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books, searchBooks]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFavorite = (bookId: string) => {
    if (user) {
      updateFavorites(bookId);
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="px-4">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            Discover Books
          </h1>
          <p className="text-gray-300 text-base max-w-sm mx-auto">
            Find your next favorite read
          </p>
        </div>

        {/* Search Bar - Full Width Mobile */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base shadow-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 text-center">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Books List - Mobile Vertical Stack */}
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden transition-all duration-300 active:scale-95 shadow-lg"
            >
              <div className="flex p-4 space-x-4">
                {/* Book Cover - Smaller for mobile */}
                <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 mb-2">
                    <User className="h-3 w-3 mr-1" />
                    <span className="text-sm">{book.author}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Tags - Mobile Optimized */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {book.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full"
                      >
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/reader/${book.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-95 text-center text-sm"
                    >
                      Read Now
                    </Link>

                    {user && (
                      <button
                        onClick={() => handleFavorite(book.id)}
                        className={`p-2 rounded-xl transition-all duration-200 active:scale-95 ${
                          user.favorites.includes(book.id)
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${user.favorites.includes(book.id) ? 'fill-current' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No books found</h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search terms or explore different categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;