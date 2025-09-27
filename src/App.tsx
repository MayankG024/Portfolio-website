import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogsPage } from './components/BlogsPage';
import { KnowledgeStash } from './components/KnowledgeStash';
import { AboutPage } from './components/AboutPage';
import { SocialFooter } from './components/SocialFooter';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { RetroCursor } from './components/RetroCursor';
import { initGA, trackPageView, trackNavigation } from './utils/analytics';
import { useScrollTracking } from './hooks/useScrollTracking';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Handle section changes with analytics tracking
  const handleSectionChange = (newSection: string) => {
    const previousSection = currentSection;
    setCurrentSection(newSection);
    
    // Track navigation between sections
    if (previousSection !== newSection) {
      trackNavigation(previousSection, newSection);
    }
  };

  // Initialize Google Analytics on app start
  useEffect(() => {
    initGA();
    trackPageView('home', 'Mayank Gupta - Portfolio');
  }, []);

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

  // Track section changes and scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track page view for each section
    const sectionTitles = {
      home: 'Home - Mayank Gupta',
      about: 'About - Mayank Gupta', 
      knowledge: 'Knowledge Stash - Mayank Gupta',
      blogs: 'Blogs - Mayank Gupta'
    };
    
    trackPageView(currentSection, sectionTitles[currentSection as keyof typeof sectionTitles]);
  }, [currentSection]);

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
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show welcome screen after loading
  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnterSite} />;
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onSectionChange={handleSectionChange} />;
      case 'blogs':
        return <BlogsPage />;
      case 'knowledge':
        return <KnowledgeStash />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-in-out opacity-100">
      <RetroCursor />
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange}
  isDark={isDark}
  onToggleTheme={() => setIsDark((d: boolean) => !d)}
      />
      <main>
        {renderCurrentSection()}
      </main>
      <SocialFooter />
    </div>
  );
}