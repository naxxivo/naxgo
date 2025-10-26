
import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25C22.56 11.42 22.49 10.62 22.36 9.84H12V14.48H18.15C17.82 16.14 16.88 17.55 15.3 18.52V21.1H19.2C21.43 19.02 22.56 15.9 22.56 12.25Z" fill="#4285F4"/>
        <path d="M12 23C14.97 23 17.45 22.02 19.2 20.47L15.3 17.87C14.34 18.52 13.25 18.92 12 18.92C9.42 18.92 7.22 17.21 6.36 14.93H2.29V17.61C4.09 20.92 7.72 23 12 23Z" fill="#34A853"/>
        <path d="M6.36 14.29C6.11 13.57 5.98 12.79 5.98 12C5.98 11.21 6.11 10.43 6.36 9.71V7.03H2.29C1.5 8.54 1 10.2 1 12C1 13.8 1.5 15.46 2.29 16.97L6.36 14.29Z" fill="#FBBC05"/>
        <path d="M12 5.08C13.44 5.08 14.73 5.59 15.68 6.48L19.27 3.06C17.45 1.34 14.97 0.2 12 0.2C7.72 0.2 4.09 2.28 2.29 5.59L6.36 8.37C7.22 6.09 9.42 4.48 12 4.48Z" fill="#EA4335"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onSearch, isLoading, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const navPages = Object.values(Page).filter(page => page !== Page.Showcase);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActivePage(Page.Showcase)}>
            <GoogleIcon />
            <span className="text-gray-400 dark:text-gray-500 font-light text-xl">x</span>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Naxxivo</h1>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {Object.values(Page).map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activePage === page
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex justify-center items-center px-2 lg:ml-6 lg:justify-end">
             <div className="max-w-lg w-full lg:max-w-xs">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search Apps, Videos..."
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </form>
             </div>
             <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500"
                aria-label="Toggle dark mode"
              >
                {theme === 'light' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
          </div>
        </div>
      </div>
      <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around p-2">
            {Object.values(Page).map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activePage === page
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 dark:text-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
