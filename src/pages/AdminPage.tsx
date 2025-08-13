import React, { useState } from 'react';
import { Upload, BookOpen, Trash2, Edit, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks, type Book } from '../contexts/BookContext';
import { Navigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { books, addBook, removeBook, comments } = useBooks();
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'comments'>('upload');
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    description: '',
    coverUrl: '',
    content: [''],
    tags: ['']
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setBookForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (index: number, value: string) => {
    setBookForm(prev => ({
      ...prev,
      content: prev.content.map((chapter, i) => i === index ? value : chapter)
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    setBookForm(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const addChapter = () => {
    setBookForm(prev => ({
      ...prev,
      content: [...prev.content, '']
    }));
  };

  const removeChapter = (index: number) => {
    setBookForm(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    setBookForm(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index: number) => {
    setBookForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real app, you would process the PDF here
      // For now, we'll just set the title to the filename
      setBookForm(prev => ({
        ...prev,
        title: file.name.replace('.pdf', '')
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredContent = bookForm.content.filter(chapter => chapter.trim());
    const filteredTags = bookForm.tags.filter(tag => tag.trim());
    
    if (filteredContent.length === 0) {
      alert('Please add at least one chapter');
      return;
    }

    const newBook: Omit<Book, 'id'> = {
      ...bookForm,
      content: filteredContent,
      tags: filteredTags,
      uploadedBy: user.username,
      uploadDate: new Date().toISOString()
    };

    addBook(newBook);
    
    // Reset form
    setBookForm({
      title: '',
      author: '',
      description: '',
      coverUrl: '',
      content: [''],
      tags: ['']
    });
    setUploadedFile(null);
    
    alert('Book uploaded successfully!');
  };

  const handleDeleteBook = (bookId: string) => {
    if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      removeBook(bookId);
    }
  };

  const tabs = [
    { id: 'upload', label: 'Upload Books', icon: Upload },
    { id: 'manage', label: 'Manage Books', icon: BookOpen },
    { id: 'comments', label: 'Comments', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-300">
            Manage books, upload content, and moderate discussions
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-4xl">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Upload New Book</h2>
              
              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  PDF Upload (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">
                      {uploadedFile ? uploadedFile.name : 'Click to upload PDF'}
                    </p>
                    <p className="text-gray-500 text-sm">
                      PDF files will be processed automatically
                    </p>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={bookForm.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Book title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={bookForm.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={bookForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Book description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={bookForm.coverUrl}
                    onChange={(e) => handleInputChange('coverUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="space-y-2">
                    {bookForm.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => handleTagChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Tag"
                        />
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTag}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chapters *
                  </label>
                  <div className="space-y-4">
                    {bookForm.content.map((chapter, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg">
                        <div className="flex items-center justify-between bg-gray-700/50 px-4 py-2 border-b border-gray-600">
                          <span className="text-white font-medium">Chapter {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeChapter(index)}
                            className="text-red-400 hover:bg-red-900/20 p-1 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <textarea
                          value={chapter}
                          onChange={(e) => handleContentChange(index, e.target.value)}
                          rows={8}
                          className="w-full px-4 py-3 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none resize-none"
                          placeholder={`Enter content for chapter ${index + 1}...`}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addChapter}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      + Add Chapter
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  Upload Book
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Manage Books ({books.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
                  <div className="relative h-32">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{book.author}</p>
                    <p className="text-gray-500 text-xs mb-3">
                      {book.content.length} chapters
                    </p>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Recent Comments ({comments.length})</h2>
            </div>

            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => {
                  const book = books.find(b => b.id === comment.bookId);
                  return (
                    <div key={comment.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{comment.username}</p>
                            <p className="text-sm text-gray-400">
                              on "{book?.title || 'Unknown Book'}"
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No comments yet</h3>
                  <p className="text-gray-500">Comments from readers will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;