import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogsPage } from './components/BlogsPage';
import { BlogDetail } from './components/BlogDetail';
import { KnowledgeStash } from './components/KnowledgeStash';
import { AboutPage } from './components/AboutPage';
import { SocialFooter } from './components/SocialFooter';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { RetroCursor } from './components/RetroCursor';
import { initGA, trackPageView } from './utils/analytics';
import { useScrollTracking } from './hooks/useScrollTracking';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize Google Analytics on app start
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const pathTitles: Record<string, string> = {
      '/': 'Home - Mayank Gupta',
      '/blogs': 'Blogs - Mayank Gupta',
      '/knowledge': 'Knowledge Stash - Mayank Gupta',
      '/about': 'About - Mayank Gupta',
    };
    
    // Handle blog detail pages
    const title = location.pathname.startsWith('/blogs/') 
      ? 'Blog Post - Mayank Gupta'
      : pathTitles[location.pathname] || 'Mayank Gupta';
    
    trackPageView(location.pathname, title);
  }, [location.pathname]);

  // Initialize theme from localStorage or default to light mode
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        // Default to light mode (removed system preference check)
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Default to light mode on error
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Apply theme changes and persist
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch {}
    }
  }, [isDark]);

  // Enable scroll depth tracking
  useScrollTracking();

  // Detect scrolling for enhanced scrollbar effects
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleEnterSite = () => {
    setShowWelcome(false);
    // Navigate to home after welcome screen
    navigate('/');
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show welcome screen after loading
  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnterSite} />;
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-in-out opacity-100">
      <RetroCursor />
      <Navigation 
        isDark={isDark}
        onToggleTheme={() => setIsDark((d: boolean) => !d)}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/knowledge" element={<KnowledgeStash />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <SocialFooter />
    </div>
  );
}