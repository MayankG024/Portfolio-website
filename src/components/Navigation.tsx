
import { NavLink, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { Sun, Moon } from 'lucide-react';

export interface NavigationProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Navigation({ isDark, onToggleTheme }: NavigationProps) {
  const location = useLocation();
  
  const handleNavClick = (buttonName: string) => {
    // Track navigation button clicks
    trackEvent('navigation_click', {
      button_name: buttonName,
      current_path: location.pathname,
    });
  };

  // Helper to determine if a path is active (handles /blogs/:slug case)
  const isActiveRoute = (path: string) => {
    if (path === '/blogs') {
      return location.pathname === '/blogs' || location.pathname.startsWith('/blogs/');
    }
    return location.pathname === path;
  };

  const navLinkBaseStyles = `px-1.5 sm:px-4 py-1 sm:py-2 text-[7px] sm:text-tiny tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[36px] sm:min-w-[44px]`;
  
  const navLinkActiveStyles = 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5 translate-y-0.5';
  
  const navLinkInactiveStyles = 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] hover:bg-muted hover:shadow-[3px_3px_0px_0px_hsl(var(--border))] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5 active:translate-y-0.5';

  const smallNavLinkBaseStyles = `px-1 sm:px-4 py-1 sm:py-2 text-[6px] sm:text-[9px] tracking-[0.03em] transition-all duration-150 ease-in-out rounded-sm font-bold
                         border-2 border-foreground min-h-[28px] sm:min-h-[32px] min-w-[32px] sm:min-w-[44px]`;

  return (
    <nav className="w-full border-b-2 border-foreground bg-background sticky top-0 z-50">
      <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo and version */}
          <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
            <NavLink 
              to="/"
              className="text-sm sm:text-heading cursor-pointer hover:text-muted-foreground transition-all duration-200 ease-in-out tracking-[0.05em] hover:animate-bounce hover:transform hover:scale-105 text-foreground"
              onClick={() => handleNavClick('MAYANK Logo')}
            >
              <span className="sm:hidden">► MAYANK</span>
              <span className="hidden sm:inline">► MAYANK.EXE</span>
            </NavLink>
            
            <span className="text-green-800 text-[7px] sm:text-tiny tracking-[0.04em]">v1.2.0</span>
          </div>
          
          {/* Right side - Navigation buttons + Theme Switch */}
          <div className="flex items-center space-x-0.5 sm:space-x-3 flex-shrink-0">
            <NavLink
              to="/"
              className={`${navLinkBaseStyles} ${isActiveRoute('/') && !location.pathname.startsWith('/blogs') && !location.pathname.startsWith('/knowledge') && !location.pathname.startsWith('/about') ? navLinkActiveStyles : navLinkInactiveStyles}`}
              onClick={() => handleNavClick('HOME Button')}
            >
              HOME
            </NavLink>
            <NavLink
              to="/blogs"
              className={`${navLinkBaseStyles} ${isActiveRoute('/blogs') ? navLinkActiveStyles : navLinkInactiveStyles}`}
              onClick={() => handleNavClick('BLOGS Button')}
            >
              BLOGS
            </NavLink>
            <NavLink
              to="/knowledge"
              className={`${smallNavLinkBaseStyles} ${isActiveRoute('/knowledge') ? navLinkActiveStyles : navLinkInactiveStyles}`}
              onClick={() => handleNavClick('KNOWLEDGE Button')}
            >
              <span className="hidden sm:inline">KNOWLEDGE</span>
              <span className="sm:hidden">KNOW</span>
            </NavLink>
            <NavLink
              to="/about"
              className={`${smallNavLinkBaseStyles} ${isActiveRoute('/about') ? navLinkActiveStyles : navLinkInactiveStyles}`}
              onClick={() => handleNavClick('ABOUT Button')}
            >
              <span className="hidden sm:inline">ABOUT ME</span>
              <span className="sm:hidden">ABOUT</span>
            </NavLink>

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