import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const { books, searchBooks } = useBooks();
  const { user, updateFavorites } = useAuth();

  const filters = ['All', 'Books', 'Authors', 'Genres'];

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredBooks(searchBooks(searchQuery));
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books, searchBooks]);

  const handleFavorite = (bookId: string) => {
    if (user) {
      updateFavorites(bookId);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Explore</h1>
        
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
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Grid View */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">All results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {filteredBooks.slice(0, 12).map((book) => (
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

        {/* List View */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Books</h2>
          <div className="space-y-2">
            {filteredBooks.map((book, index) => (
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
                  {user && (
                    <button
                      onClick={() => handleFavorite(book.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-[#272727] rounded-full transition-all ${
                        user.favorites.includes(book.id) ? 'text-[#ff0000]' : 'text-[#aaaaaa]'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${user.favorites.includes(book.id) ? 'fill-current' : ''}`} />
                    </button>
                  )}
                  <span className="text-[#aaaaaa] text-sm">4:32</span>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#272727] rounded-full transition-all">
                    <MoreHorizontal className="h-4 w-4 text-[#aaaaaa]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExplorePage;