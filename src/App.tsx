import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ReaderPage from './pages/ReaderPage';
import LibraryPage from './pages/LibraryPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/reader/:bookId" element={<ReaderPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            
            <BottomNavigation />
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;