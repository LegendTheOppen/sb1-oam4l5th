import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BottomPlayer from './components/BottomPlayer';
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
          <div className="min-h-screen bg-[#0f0f0f] text-white flex">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <TopBar />
              
              {/* Page Content */}
              <main className="flex-1 overflow-y-auto pb-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/reader/:bookId" element={<ReaderPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
            </div>
            
            {/* Bottom Player */}
            <BottomPlayer />
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;