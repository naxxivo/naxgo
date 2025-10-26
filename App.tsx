
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AppCard from './components/AppCard';
import VideoCard from './components/VideoCard';
import CourseCard from './components/CourseCard';
import WebCard from './components/WebCard';
import Loader from './components/Loader';
import SourceLink from './components/SourceLink';
import { Page, ContentItem, Source, WebInfo } from './types';
import { searchContent } from './services/geminiService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Apps);
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (storedPrefs === 'dark' || storedPrefs === 'light') {
        return storedPrefs;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, [theme]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    setCurrentQuery(query);
    try {
      const { results, sources, summary } = await searchContent(query, activePage);
      setSearchResults(results);
      setSources(sources);
      setSummary(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSearchResults([]);
      setSources([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (currentQuery) {
      handleSearch(currentQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const renderResults = () => {
    if (activePage === Page.Web) {
      return (
        <div className="space-y-4">
          {searchResults.map((item, index) => (
            <WebCard key={`${(item as WebInfo).uri}-${index}`} item={item as WebInfo} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map((item, index) => {
          switch (item.type) {
            case Page.Apps:
              return <AppCard key={`${item.name}-${index}`} app={item} />;
            case Page.Videos:
              return <VideoCard key={`${item.title}-${index}`} video={item} />;
            case Page.Learn:
              return <CourseCard key={`${item.title}-${index}`} course={item} />;
            default:
              return null;
          }
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <div className="text-center text-red-500 py-10">{error}</div>;
    }
    if (searchResults.length === 0 && !summary) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-20">
          <h2 className="text-2xl font-semibold">Welcome to Naxxivo X Google</h2>
          <p className="mt-2">Search for apps, videos, courses, or on the web to get started.</p>
        </div>
      );
    }

    return (
      <>
        {summary && (
          <div className="mb-8 p-5 bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">AI Summary</h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{summary}</p>
          </div>
        )}
        {searchResults.length > 0 && renderResults()}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onSearch={handleSearch}
        isLoading={isLoading}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
        {activePage !== Page.Web && <SourceLink sources={sources} />}
      </main>
      <footer className="text-center p-4 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 mt-8">
        <p>&copy; {new Date().getFullYear()} Naxxivo. All rights reserved. Content provided by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
