import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
    navigate('/');
  };

  const handleLogoClick = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] flex items-center gap-4 px-4 h-14 border-b border-[#303030]">
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-1 shrink-0" 
        onClick={handleLogoClick}
      >
        <svg
          className="w-8 h-8 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
        <span className="text-white font-bold text-lg hidden sm:inline">SongTube</span>
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex flex-1 max-w-xl mx-auto">
        <div className="flex w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
            placeholder="Search songs, artists, albums…"
            className="flex-1 bg-[#121212] border border-[#303030] text-white placeholder-gray-500 rounded-l-full px-4 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-[#222222] border border-l-0 border-[#303030] text-white px-5 rounded-r-full hover:bg-[#3a3a3a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* User / Avatar */}
      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0 cursor-pointer">
        U
      </div>
    </header>
  );
}