import { memo, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { Sun, Moon } from 'lucide-react';

export interface NavigationProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const Navigation = memo(function Navigation({ isDark, onToggleTheme }: NavigationProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (buttonName: string) => {
    trackEvent('navigation_click', {
      button_name: buttonName,
      current_path: location.pathname,
    });
    setMenuOpen(false);
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

  // Mobile drawer nav link styles — full-width, larger touch targets
  const mobileNavBase = `w-full px-4 py-3 text-[9px] tracking-[0.05em] transition-all duration-150 ease-in-out font-bold
                         border-2 border-foreground flex items-center`;
  const mobileNavActive = 'bg-muted text-foreground shadow-[1px_1px_0px_0px_hsl(var(--border))] translate-x-0.5';
  const mobileNavInactive = 'bg-background text-foreground shadow-[2px_2px_0px_0px_hsl(var(--border))] active:shadow-[1px_1px_0px_0px_hsl(var(--border))] active:translate-x-0.5';

  return (
    <>
      <nav className="w-full border-b-2 border-foreground bg-background sticky top-0 z-50">
        <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full">

            {/* ── MOBILE LEFT: [hamburger] ► MAYANK v1.2.0 ── */}
            <div className="flex sm:hidden items-center space-x-2 flex-shrink-0">
              {/* Hamburger button */}
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="flex flex-col justify-center items-center w-8 h-8 border-2 border-foreground bg-background
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] active:shadow-[1px_1px_0px_0px_hsl(var(--border))]
                           active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 gap-[4px] p-1.5"
                onClick={() => setMenuOpen(o => !o)}
              >
                <span className={`block w-full h-[2px] bg-foreground transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block w-full h-[2px] bg-foreground transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-full h-[2px] bg-foreground transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </button>

              {/* Logo + version */}
              <NavLink
                to="/"
                className="text-sm cursor-pointer hover:text-muted-foreground transition-all duration-200 ease-in-out tracking-[0.05em] text-foreground"
                onClick={() => handleNavClick('MAYANK Logo')}
              >
                ► MAYANK
              </NavLink>
              <span className="text-green-800 text-[7px] tracking-[0.04em]">v1.2.0</span>
            </div>

            {/* ── MOBILE RIGHT: theme toggle ── */}
            <div className="flex sm:hidden items-center flex-shrink-0">
              <button
                type="button"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={!!isDark}
                className="flex flex-col justify-center items-center w-8 h-8 border-2 border-foreground bg-background
                           shadow-[2px_2px_0px_0px_hsl(var(--border))] active:shadow-[1px_1px_0px_0px_hsl(var(--border))]
                           active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 select-none"
                onClick={() => {
                  trackEvent('theme_toggle', { to: isDark ? 'light' : 'dark' });
                  onToggleTheme && onToggleTheme();
                }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-foreground pointer-events-none" />
                ) : (
                  <Sun className="w-4 h-4 text-foreground pointer-events-none" />
                )}
              </button>
            </div>

            {/* ── DESKTOP LEFT: Logo and version ── */}
            <div className="hidden sm:flex items-center space-x-4 flex-shrink-0">
              <NavLink
                to="/"
                className="text-heading cursor-pointer hover:text-muted-foreground transition-all duration-200 ease-in-out tracking-[0.05em] hover:animate-bounce hover:transform hover:scale-105 text-foreground"
                onClick={() => handleNavClick('MAYANK Logo')}
              >
                ► MAYANK.EXE
              </NavLink>
              <span className="text-green-800 text-tiny tracking-[0.04em]">v1.2.0</span>
            </div>

            {/* ── DESKTOP RIGHT: Navigation buttons + Theme Switch ── */}
            <div className="hidden sm:flex items-center space-x-0.5 sm:space-x-3 flex-shrink-0">
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
                KNOWLEDGE
              </NavLink>
              <NavLink
                to="/about"
                className={`${smallNavLinkBaseStyles} ${isActiveRoute('/about') ? navLinkActiveStyles : navLinkInactiveStyles}`}
                onClick={() => handleNavClick('ABOUT Button')}
              >
                ABOUT ME
              </NavLink>

              <a
                href="https://maynk.me"
                target="_blank"
                rel="noopener noreferrer"
                className={`${smallNavLinkBaseStyles} ${navLinkInactiveStyles} relative group inline-flex items-center justify-center`}
                aria-label="professional site"
                onClick={() => handleNavClick('PROFESSIONAL SITE Button')}
              >
                <span className="text-xl leading-none">🌐</span>
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none
                                 bg-background border-2 border-foreground text-foreground font-bold px-2 py-1 text-[10px] whitespace-nowrap
                                 shadow-[2px_2px_0px_0px_hsl(var(--border))] z-[100] tracking-widest uppercase">
                  PROFESSIONAL SITE
                </span>
              </a>

              {/* Minimal separator */}
              <span aria-hidden="true" className="mx-2 sm:mx-3 px-1.5 sm:px-2 h-5 sm:h-6 flex items-center">
                <span className="w-px h-full bg-foreground/70"></span>
              </span>

              {/* Desktop Theme Switch slider */}
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

      {/* Mobile side drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile side drawer — slides in from LEFT */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r-2 border-foreground z-50 sm:hidden
                    flex flex-col pt-16 shadow-[4px_0_0_0_hsl(var(--border))]
                    transition-transform duration-300 ease-in-out
                    ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Mobile navigation menu"
      >
        {/* Close button — top-left corner of drawer */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute top-3 left-3 w-8 h-8 border-2 border-foreground bg-background flex items-center justify-center text-foreground font-bold text-xs shadow-[2px_2px_0px_0px_hsl(var(--border))] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <div className="px-4 mb-6">
          <span className="text-[8px] tracking-[0.1em] text-foreground/60 uppercase font-bold">Navigation</span>
        </div>

        <nav className="flex flex-col gap-3 px-4">
          <NavLink
            to="/"
            className={`${mobileNavBase} ${isActiveRoute('/') && !location.pathname.startsWith('/blogs') && !location.pathname.startsWith('/knowledge') && !location.pathname.startsWith('/about') ? mobileNavActive : mobileNavInactive}`}
            onClick={() => handleNavClick('HOME Button')}
          >
            <span className="mr-2">►</span> HOME
          </NavLink>
          <NavLink
            to="/blogs"
            className={`${mobileNavBase} ${isActiveRoute('/blogs') ? mobileNavActive : mobileNavInactive}`}
            onClick={() => handleNavClick('BLOGS Button')}
          >
            <span className="mr-2">►</span> BLOGS
          </NavLink>
          <NavLink
            to="/knowledge"
            className={`${mobileNavBase} ${isActiveRoute('/knowledge') ? mobileNavActive : mobileNavInactive}`}
            onClick={() => handleNavClick('KNOWLEDGE Button')}
          >
            <span className="mr-2">►</span> KNOWLEDGE
          </NavLink>
          <NavLink
            to="/about"
            className={`${mobileNavBase} ${isActiveRoute('/about') ? mobileNavActive : mobileNavInactive}`}
            onClick={() => handleNavClick('ABOUT Button')}
          >
            <span className="mr-2">►</span> ABOUT ME
          </NavLink>
          <a
            href="https://maynk.me"
            target="_blank"
            rel="noopener noreferrer"
            className={`${mobileNavBase} ${mobileNavInactive}`}
            onClick={() => handleNavClick('PROFESSIONAL SITE Button')}
          >
            <span className="mr-2">🌐</span> PROFESSIONAL SITE
          </a>
        </nav>

        {/* Decorative version tag at bottom */}
        <div className="mt-auto px-4 pb-8">
          <span className="text-green-800 text-[7px] tracking-[0.04em]">v1.2.0</span>
        </div>
      </aside>
    </>
  );
});