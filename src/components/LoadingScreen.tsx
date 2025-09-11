import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...');

  const loadingSteps = [
    'INITIALIZING SYSTEM...',
    'LOADING ASSETS...',
    'COMPILING SHADERS...',
    'ESTABLISHING CONNECTION...',
    'SYSTEM READY!'
  ];

  useEffect(() => {
    const duration = 1700; // 1.7 seconds total loading (much slower for full visibility)
    const steps = 100;
    const stepDuration = duration / steps;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        
        // Update loading text based on progress
        if (next <= 20) setLoadingText(loadingSteps[0]);
        else if (next <= 40) setLoadingText(loadingSteps[1]);
        else if (next <= 60) setLoadingText(loadingSteps[2]);
        else if (next <= 80) setLoadingText(loadingSteps[3]);
        else if (next <= 100) setLoadingText(loadingSteps[4]);

        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(onLoadingComplete, 200); // Extended delay to showcase completion
        }

        return next;
      });
    }, stepDuration);

    return () => clearInterval(progressTimer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md w-full px-6">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-['Press_Start_2P'] text-foreground tracking-wider">
            MAYANK.EXE
          </h1>
          <p className="text-sm text-green-600 font-['Jersey_25'] tracking-wide">
            v1.2.0 - Design Engineer Edition
          </p>
        </div>

        {/* Loading Bar */}
        <div className="space-y-4">
          <div className="retro-border p-1 bg-card">
            <div className="h-4 bg-background relative overflow-hidden">
              <div 
                className="h-full bg-green-600 transition-all duration-100 ease-out retro-border"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-['Press_Start_2P'] text-foreground tracking-wide">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <p className="font-['Jersey_25'] text-base text-foreground tracking-wide min-h-[1.5rem]">
            {loadingText}
          </p>
        </div>

        {/* Spinning Loader */}
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
