import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { BlogsPage } from './components/BlogsPage';
import { KnowledgeStash } from './components/KnowledgeStash';
import { AboutPage } from './components/AboutPage';
import { SocialFooter } from './components/SocialFooter';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top whenever section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <HomePage key="home" onSectionChange={setCurrentSection} />;
      case 'blogs':
        return <BlogsPage key="blogs" />;
      case 'knowledge':
        return <KnowledgeStash key="knowledge" />;
      case 'about':
        return <AboutPage key="about" />;
      default:
        return <HomePage key="home-default" onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-500 ease-in-out opacity-100">
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      <main>
        {renderCurrentSection()}
      </main>
      <SocialFooter />
    </div>
  );
}