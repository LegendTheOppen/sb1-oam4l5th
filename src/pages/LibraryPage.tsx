import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';

const LibraryPage: React.FC = () => {
  const { user } = useAuth();
  const { books } = useBooks();

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">Access Your Library</h2>
          <p className="text-gray-400 mb-6">
            Sign in to view your favorite books, reading progress, and personalized recommendations.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Explore Books
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
  const completedBooks = books.filter(book => 
    user.readingProgress[book.id] === book.content.length - 1
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            My Library
          </h1>
          <p className="text-xl text-gray-300">
            Welcome back, {user.username}! Continue your reading journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{booksInProgress.length}</p>
              </div>
              <Clock className="h-12 w-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Favorites</p>
                <p className="text-3xl font-bold text-white">{favoriteBooks.length}</p>
              </div>
              <Heart className="h-12 w-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{completedBooks.length}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-400" />
            </div>
          </div>
        </div>

        {/* Continue Reading */}
        {booksInProgress.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-blue-400" />
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {booksInProgress.map((book) => {
                const progress = user.readingProgress[book.id] || 0;
                const progressPercent = Math.round(((progress + 1) / book.content.length) * 100);
                
                return (
                  <div key={book.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group">
                    <div className="relative h-32">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">{book.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Progress</span>
                          <span className="text-xs text-gray-400">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      
                      <Link
                        to={`/reader/${book.id}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Continue Reading
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Favorite Books */}
        {favoriteBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-purple-400" />
              Favorite Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteBooks.map((book) => (
                <div key={book.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group">
                  <div className="relative h-48">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    
                    <Link
                      to={`/reader/${book.id}`}
                      className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {favoriteBooks.length === 0 && booksInProgress.length === 0 && completedBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Your library is empty</h3>
            <p className="text-gray-500 mb-6">
              Start exploring books to build your personal library
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;