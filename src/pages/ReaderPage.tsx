import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Share2, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Send,
  User
} from 'lucide-react';
import { useBooks, type Comment } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const ReaderPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { books, addComment, getBookComments } = useBooks();
  const { user, updateFavorites, updateProgress } = useAuth();
  
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const book = books.find(b => b.id === bookId);
  const comments = book ? getBookComments(book.id) : [];

  useEffect(() => {
    if (book && user) {
      // Load saved progress
      const savedProgress = user.readingProgress[book.id];
      if (savedProgress !== undefined) {
        setCurrentChapter(savedProgress);
      }
    }
  }, [book, user]);

  useEffect(() => {
    // Save reading progress
    if (book && user) {
      updateProgress(book.id, currentChapter);
    }
  }, [currentChapter, book, user, updateProgress]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <Link to="/" className="text-[#ff0000] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleFavorite = () => {
    if (user) {
      updateFavorites(book.id);
    }
  };

  const handleAddComment = () => {
    if (!user || !newComment.trim()) return;

    addComment({
      bookId: book.id,
      userId: user.id,
      username: user.username,
      content: newComment.trim(),
      lineNumber: selectedLine || undefined
    });

    setNewComment('');
    setSelectedLine(null);
  };

  const nextChapter = () => {
    if (currentChapter < book.content.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const progressPercent = Math.round(((currentChapter + 1) / book.content.length) * 100);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-[#272727] z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[#272727] rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="font-semibold text-white">{book.title}</h1>
                <p className="text-sm text-[#aaaaaa]">{book.author}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {user && (
              <button
                onClick={handleFavorite}
                className={`p-2 hover:bg-[#272727] rounded-full transition-colors ${
                  user.favorites.includes(book.id) ? 'text-[#ff0000]' : 'text-[#aaaaaa]'
                }`}
              >
                <Heart className={`h-5 w-5 ${user.favorites.includes(book.id) ? 'fill-current' : ''}`} />
              </button>
            )}
            <button className="p-2 hover:bg-[#272727] rounded-full transition-colors text-[#aaaaaa]">
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-2 hover:bg-[#272727] rounded-full transition-colors text-[#aaaaaa]"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-[#272727] rounded-full transition-colors text-[#aaaaaa]">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-sm text-[#aaaaaa] mb-2">
            <span>Chapter {currentChapter + 1} of {book.content.length}</span>
            <span>{progressPercent}% complete</span>
          </div>
          <div className="w-full bg-[#272727] rounded-full h-1">
            <div 
              className="bg-[#ff0000] rounded-full h-1 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${showComments ? 'mr-80' : ''} transition-all duration-300`}>
          <div className="max-w-4xl mx-auto p-6">
            {/* Reading Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevChapter}
                  disabled={currentChapter === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#272727] hover:bg-[#3a3a3a] disabled:bg-[#1a1a1a] disabled:text-[#666666] rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={nextChapter}
                  disabled={currentChapter === book.content.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#272727] hover:bg-[#3a3a3a] disabled:bg-[#1a1a1a] disabled:text-[#666666] rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm text-[#aaaaaa]">Font Size:</label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-[#aaaaaa]">{fontSize}px</span>
              </div>
            </div>

            {/* Chapter Content */}
            <div className="bg-[#181818] rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Chapter {currentChapter + 1}
              </h2>
              <div 
                className="prose prose-invert max-w-none leading-relaxed"
                style={{ fontSize: `${fontSize}px` }}
              >
                {book.content[currentChapter].split('\n').map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="mb-4 text-[#e0e0e0] cursor-pointer hover:bg-[#272727]/30 p-2 rounded transition-colors"
                    onClick={() => setSelectedLine(index)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-[#666666] text-white rounded-full font-medium transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous Chapter</span>
              </button>

              <div className="text-center">
                <p className="text-[#aaaaaa] text-sm">
                  {currentChapter + 1} / {book.content.length}
                </p>
              </div>

              <button
                onClick={nextChapter}
                disabled={currentChapter === book.content.length - 1}
                className="flex items-center space-x-2 px-6 py-3 bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-[#666666] text-white rounded-full font-medium transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Comments Sidebar */}
        {showComments && (
          <div className="fixed right-0 top-0 h-full w-80 bg-[#181818] border-l border-[#272727] z-30 overflow-y-auto">
            <div className="p-4 border-b border-[#272727]">
              <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
              
              {user && (
                <div className="space-y-3">
                  {selectedLine !== null && (
                    <div className="text-sm text-[#aaaaaa] bg-[#272727] p-2 rounded">
                      Commenting on line {selectedLine + 1}
                      <button
                        onClick={() => setSelectedLine(null)}
                        className="ml-2 text-[#ff0000] hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 bg-[#272727] border border-[#3a3a3a] rounded-lg text-white placeholder-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="w-full bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-[#666666] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Post Comment</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-[#272727] rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-white text-sm">{comment.username}</span>
                          {comment.lineNumber !== undefined && (
                            <span className="text-xs text-[#aaaaaa] bg-[#3a3a3a] px-2 py-1 rounded">
                              Line {comment.lineNumber + 1}
                            </span>
                          )}
                        </div>
                        <p className="text-[#e0e0e0] text-sm leading-relaxed">{comment.content}</p>
                        <span className="text-xs text-[#aaaaaa] mt-2 block">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-[#666666] mx-auto mb-3" />
                  <p className="text-[#aaaaaa]">No comments yet</p>
                  <p className="text-[#666666] text-sm">Be the first to share your thoughts</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReaderPage;