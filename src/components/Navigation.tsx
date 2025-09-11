
import { trackEvent } from '../utils/analytics';
import { Sun, Moon } from 'lucide-react';

export interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Navigation({ currentSection, onSectionChange, isDark, onToggleTheme }: NavigationProps) {
  
  const handleNavClick = (section: string, buttonName: string) => {
    // Track navigation button clicks
    trackEvent('navigation_click', {
      button_name: buttonName,
      target_section: section,
      current_section: currentSection,
    });
    onSectionChange(section);
  };

  return (
    <nav className="w-full border-b-2 border-foreground bg-background sticky top-0 z-50">
      <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo and version */}
          <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
            <h1 
              className="text-sm sm:text-heading cursor-pointer hover:text-muted-foreground transition-all duration-200 ease-in-out tracking-[0.05em] hover:animate-bounce hover:transform hover:scale-105 text-foreground"
              onClick={() => handleNavClick('home', 'MAYANK Logo')}
            >
              <span className="sm:hidden">► MAYANK</span>
              <span className="hidden sm:inline">► MAYANK.EXE</span>
            </h1>
            
            <span className="text-green-800 text-[7px] sm:text-tiny tracking-[0.04em]">v1.2.0</span>
          </div>
          
          {/* Right side - Navigation buttons + Theme Switch */}
          <div className="flex items-center space-x-0.5 sm:space-x-3 flex-shrink-0">
            <button
              className={`px-1.5 sm:px-4 py-1 sm:py-2 text-[7px] sm:text-tiny tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[36px] sm:min-w-[44px]
                         ${
                currentSection === 'home' 
                  ? 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5' 
                  : 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5'
              }`}
              onClick={() => handleNavClick('home', 'HOME Button')}
            >
              HOME
            </button>
            <button
              className={`px-1.5 sm:px-4 py-1 sm:py-2 text-[7px] sm:text-tiny tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[36px] sm:min-w-[44px]
                         ${
                currentSection === 'blogs' 
                  ? 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5' 
                  : 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5'
              }`}
              onClick={() => handleNavClick('blogs', 'BLOGS Button')}
            >
              BLOGS
            </button>
            <button
              className={`px-1 sm:px-4 py-1 sm:py-2 text-[6px] sm:text-[9px] tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[32px] sm:min-w-[44px]
                         ${
                currentSection === 'knowledge' 
                  ? 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5' 
                  : 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5'
              }`}
              onClick={() => handleNavClick('knowledge', 'KNOWLEDGE Button')}
            >
              <span className="hidden sm:inline">KNOWLEDGE</span>
              <span className="sm:hidden">KNOW</span>
            </button>
            <button
              className={`px-1 sm:px-4 py-1 sm:py-2 text-[6px] sm:text-[9px] tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[32px] sm:min-w-[44px]
                         ${
                currentSection === 'about' 
                  ? 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5' 
                  : 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5'
              }`}
              onClick={() => handleNavClick('about', 'ABOUT Button')}
            >
              <span className="hidden sm:inline">ABOUT ME</span>
              <span className="sm:hidden">ABOUT</span>
            </button>

            {/* Minimal separator (longer, darker, with horizontal padding) */}
            <span aria-hidden="true" className="mx-2 sm:mx-3 px-1.5 sm:px-2 h-5 sm:h-6 flex items-center">
              <span className="w-px h-full bg-foreground/70"></span>
            </span>

            {/* Theme Switch - moved to right end */}
            <button
              type="button"
              role="switch"
              aria-label="Toggle dark mode"
              aria-checked={!!isDark}
              className={`relative ml-4 sm:ml-8 w-16 sm:w-20 h-3 sm:h-4 rounded-full border-2 border-foreground bg-background overflow-hidden transition-all duration-150 ease-in-out
                         shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5`}
              onClick={() => {
                trackEvent('theme_toggle', { to: isDark ? 'light' : 'dark' });
                onToggleTheme && onToggleTheme();
              }}
            >
              {/* Fill/Knob that expands and carries the icon */}
              <span
                className={`absolute top-0 left-0 h-full rounded-full bg-foreground transition-all duration-200 flex items-center
                           ${isDark ? 'w-full justify-end pr-1.5' : 'w-1/2 justify-start pl-1.5'}`}
              >
                {isDark ? (
                  <Moon className="text-background w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <Sun className="text-background w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}