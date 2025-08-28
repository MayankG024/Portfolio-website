// Google Analytics 4 (GA4) configuration and utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Replace with your actual GA4 Measurement ID
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  // Only initialize in production and in browser
  if (typeof window === 'undefined' || import.meta.env.DEV) {
    console.log('📊 Analytics disabled in development mode');
    return;
  }

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('📊 Google Analytics ID not configured');
    return;
  }

  try {
    // Create script tag for GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      // Privacy-friendly settings
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      // Performance settings
      send_page_view: true,
    });

    console.log('📊 Google Analytics initialized');
  } catch (error) {
    console.error('📊 Analytics initialization failed:', error);
  }
};

// Track page views
export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  try {
    window.gtag('event', 'page_view', {
      page_title: pageTitle || pageName,
      page_location: window.location.href,
      page_path: `/${pageName.toLowerCase()}`,
    });
  } catch (error) {
    console.error('📊 Track page view failed:', error);
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  try {
    window.gtag('event', eventName, {
      event_category: 'portfolio_interaction',
      event_label: eventName,
      ...parameters,
    });
  } catch (error) {
    console.error('📊 Track event failed:', error);
  }
};

// Track navigation between sections
export const trackNavigation = (fromSection: string, toSection: string) => {
  trackEvent('navigation', {
    from_section: fromSection,
    to_section: toSection,
    event_category: 'navigation',
  });
};

// Track contact form interactions
export const trackContactForm = (action: 'start' | 'submit' | 'success' | 'error') => {
  trackEvent('contact_form', {
    form_action: action,
    event_category: 'form_interaction',
  });
};

// Track project/resource clicks
export const trackResourceClick = (resourceName: string, resourceType: 'project' | 'knowledge' | 'blog') => {
  trackEvent('resource_click', {
    resource_name: resourceName,
    resource_type: resourceType,
    event_category: 'content_engagement',
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    event_category: 'user_engagement',
  });
};

// Track time spent on page
export const trackTimeOnPage = (section: string, timeSpent: number) => {
  trackEvent('time_on_page', {
    section: section,
    time_spent_seconds: timeSpent,
    event_category: 'user_engagement',
  });
};

// Ensure this file is treated as a module
export {};
