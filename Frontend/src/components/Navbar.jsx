
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../App';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg group-hover:shadow-glow transition-smooth">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="gradient-text font-bold text-xl hidden sm:block">
                EV Knowledge Bot
              </h1>
              {/* <p className="text-xs text-gray-500 dark:text-slate-400">Powered by Gemini AI</p> */}
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-linkedin-blue transition-smooth hover:scale-110 dark:text-slate-300 dark:hover:text-sky-400"
            >
              💬 Chat
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-linkedin-blue transition-smooth hover:scale-110 dark:text-slate-300 dark:hover:text-sky-400"
            >
              📁 Upload
            </Link>
            <Link
              to="/history"
              className="text-gray-700 hover:text-linkedin-blue transition-smooth hover:scale-110 dark:text-slate-300 dark:hover:text-sky-400"
            >
              📚 History
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-smooth"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-smooth"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2 animate-fadeIn">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-smooth dark:hover:bg-white/10"
            >
              💬 Chat
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-smooth dark:hover:bg-white/10"
            >
              📁 Upload
            </Link>
            <Link
              to="/history"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition-smooth dark:hover:bg-white/10"
            >
              📚 History
            </Link>
            <button
              onClick={() => { toggleTheme(); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition-smooth dark:hover:bg-white/10"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}