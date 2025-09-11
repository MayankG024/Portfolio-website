import { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  const fullText = "press any key to enter";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Handle any key press, mouse click, or touch
  useEffect(() => {
    const handleInteraction = () => {
      if (typingComplete) {
        onEnter();
      }
    };

    if (typingComplete) {
      document.addEventListener('keydown', handleInteraction);
      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);
    }

    return () => {
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [typingComplete, onEnter]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg md:text-xl lg:text-2xl text-foreground tracking-wider font-['Press_Start_2P']">
          {displayText}
          {showCursor && <span className="typewriter-cursor">█</span>}
        </div>
      </div>
    </div>
  );
}