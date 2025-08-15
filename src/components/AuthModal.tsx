import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.username, formData.email, formData.password);
      }

      if (success) {
        onClose();
        setFormData({ username: '', email: '', password: '' });
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#181818] rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-[#272727]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join Universe Mind'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#aaaaaa] hover:text-white hover:bg-[#272727] rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#aaaaaa] mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#272727] rounded-lg text-white placeholder-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all duration-200"
                placeholder="Choose a username"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#aaaaaa] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#272727] rounded-lg text-white placeholder-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#aaaaaa] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#272727] rounded-lg text-white placeholder-[#aaaaaa] focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="p-3 bg-[#ff0000]/20 border border-[#ff0000]/20 rounded-lg">
              <p className="text-[#ff0000] text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-[#666666] text-white py-3 px-4 rounded-full font-medium transition-all duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#aaaaaa]">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="text-[#ff0000] hover:text-[#cc0000] font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {mode === 'login' && (
          <div className="mt-4 p-3 bg-[#ff0000]/20 border border-[#ff0000]/20 rounded-lg">
            <p className="text-[#ff0000] text-sm">
              <strong>Demo:</strong> Use admin@universe.com for admin access
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;