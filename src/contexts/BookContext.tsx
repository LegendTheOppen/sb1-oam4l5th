import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  content: string[];
  tags: string[];
  uploadedBy?: string;
  uploadDate?: string;
}

export interface Comment {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  content: string;
  lineNumber?: number;
  timestamp: string;
  replies?: Comment[];
}

interface BookContextType {
  books: Book[];
  comments: Comment[];
  searchBooks: (query: string) => Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  removeBook: (bookId: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  getBookComments: (bookId: string) => Comment[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Initialize with sample books
    const sampleBooks: Book[] = [
      {
        id: '1',
        title: 'The Quantum Mind',
        author: 'Dr. Sarah Chen',
        description: 'Exploring the intersection of quantum physics and consciousness in modern science.',
        coverUrl: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg',
        content: [
          'Chapter 1: The Nature of Reality\n\nIn the depths of quantum mechanics, we find ourselves confronting the very nature of reality itself. The observer effect suggests that consciousness plays a fundamental role in the collapse of wave functions, leading us to question whether mind and matter are truly separate entities.\n\nThis chapter explores the foundational principles of quantum physics and their implications for our understanding of consciousness. We begin with the double-slit experiment and its mysterious results that have puzzled scientists for decades.',
          'Chapter 2: Consciousness and Measurement\n\nThe measurement problem in quantum mechanics has long been one of the most perplexing aspects of the theory. When does a quantum system transition from a superposition of states to a definite outcome? Some interpretations suggest that consciousness itself plays a crucial role in this process.\n\nWe examine various interpretations including the Copenhagen interpretation, Many-worlds theory, and the consciousness-based interpretations proposed by physicists like Henry Stapp and Stuart Hameroff.'
        ],
        tags: ['quantum', 'physics', 'consciousness', 'science']
      },
      {
        id: '2',
        title: 'Digital Renaissance',
        author: 'Marcus Thompson',
        description: 'How technology is reshaping human creativity and artistic expression in the 21st century.',
        coverUrl: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
        content: [
          'Chapter 1: The New Canvas\n\nIn an age where pixels replace paintbrushes and algorithms compose symphonies, we stand at the threshold of a digital renaissance. This transformation isn\'t merely about new tools—it\'s about fundamentally reimagining what it means to create, to express, and to connect with audiences across the globe.\n\nThe democratization of creative tools has enabled millions to become artists, writers, and musicians who might never have had access to traditional mediums.',
          'Chapter 2: AI and Human Creativity\n\nArtificial intelligence is not replacing human creativity—it\'s amplifying it. From GPT models that assist writers to neural networks that generate visual art, we\'re witnessing a collaboration between human imagination and machine learning that produces results neither could achieve alone.\n\nThis chapter explores how creative professionals are integrating AI tools into their workflows while maintaining their unique human perspective and emotional depth.'
        ],
        tags: ['technology', 'creativity', 'art', 'AI', 'digital']
      },
      {
        id: '3',
        title: 'Mindful Leadership',
        author: 'Elena Rodriguez',
        description: 'Ancient wisdom meets modern management in this guide to conscious leadership.',
        coverUrl: 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg',
        content: [
          'Chapter 1: The Conscious Leader\n\nTrue leadership begins with self-awareness. In a world of constant change and uncertainty, the most effective leaders are those who can remain centered, present, and responsive rather than reactive. This chapter introduces the core principles of mindful leadership.\n\nWe explore how ancient contemplative practices can inform modern leadership approaches, creating more resilient, empathetic, and effective leaders who inspire rather than merely manage.',
          'Chapter 2: Building Authentic Connections\n\nAuthentic leadership is about creating genuine connections with team members, stakeholders, and communities. This goes beyond traditional networking or relationship management—it requires vulnerability, empathy, and a deep commitment to serving others.\n\nWe examine case studies of leaders who have transformed organizations through authentic, mindful approaches to leadership and decision-making.'
        ],
        tags: ['leadership', 'mindfulness', 'management', 'personal growth']
      }
    ];

    setBooks(sampleBooks);
  }, []);

  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books;
    
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString()
    };
    setBooks(prev => [...prev, newBook]);
  };

  const removeBook = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
    setComments(prev => prev.filter(comment => comment.bookId !== bookId));
  };

  const addComment = (commentData: Omit<Comment, 'id' | 'timestamp'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
  };

  const getBookComments = (bookId: string): Comment[] => {
    return comments.filter(comment => comment.bookId === bookId)
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  return (
    <BookContext.Provider value={{
      books,
      comments,
      searchBooks,
      addBook,
      removeBook,
      addComment,
      getBookComments
    }}>
      {children}
    </BookContext.Provider>
  );
};