import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  startDelay?: number;
  onComplete?: () => void;
}

export function TypewriterText({ 
  text, 
  speed = 100, 
  className = "", 
  showCursor = true,
  startDelay = 0,
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Start typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentIndex === 0 ? startDelay : speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, startDelay, isComplete, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (showCursor) {
      const cursorTimer = setInterval(() => {
        setShowBlinkingCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [showCursor]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowBlinkingCursor(true);
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && showBlinkingCursor && (
        <span className="typewriter-cursor">█</span>
      )}
    </span>
  );
}
