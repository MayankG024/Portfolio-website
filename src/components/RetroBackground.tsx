import { useEffect, useState } from 'react';

interface GameElement {
  id: number;
  type: 'block' | 'coin';
  x: number;
  y: number;
  delay: number;
  active: boolean;
  size: 'small' | 'medium' | 'large';
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  speed: number;
  opacity: number;
  hasLightning: boolean;
  lightningActive: boolean;
}

interface CelestialBody {
  id: number;
  type: 'sun' | 'moon';
  x: number;
  y: number;
  bouncePhase: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  opacity: number;
  twinklePhase: number;
  size: number;
}

export function RetroBackground() {
  const [gameElements, setGameElements] = useState<GameElement[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [celestialBodies, setCelestialBodies] = useState<CelestialBody[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  // Initialize celestial bodies (base 4 moons + add 5 random moons)
  useEffect(() => {
    const bodies: CelestialBody[] = [];
    
    // Add 4 moons for better performance
    for (let i = 0; i < 4; i++) {
      bodies.push({
        id: i,
        type: 'moon',
        x: 15 + i * 20, // Better spacing
        y: 15 + Math.random() * 70,
        bouncePhase: Math.random() * Math.PI * 2,
      });
    }
    
    // Add 5 more moons at random locations
    for (let j = 0; j < 5; j++) {
      bodies.push({
        id: 4 + j,
        type: 'moon',
        x: 5 + Math.random() * 90, // Random x within viewport with margin
        y: 5 + Math.random() * 85, // Random y within viewport with margin
        bouncePhase: Math.random() * Math.PI * 2,
      });
    }
    
    setCelestialBodies(bodies);
  }, []);

  // Initialize golden twinkling stars
  useEffect(() => {
    const starData: Star[] = [];
    
  // Create 15 golden stars scattered across the sky
  for (let i = 0; i < 15; i++) {
      starData.push({
        id: i,
        x: Math.random() * 95 + 2.5, // Random position across screen with margin
        y: Math.random() * 60 + 5, // Mostly in upper portion of screen
        opacity: 0.3 + Math.random() * 0.4, // Base opacity between 0.3-0.7
        twinklePhase: Math.random() * Math.PI * 2, // Random starting phase
        size: 0.8 + Math.random() * 0.4, // Size variation (0.8-1.2, same as coins)
      });
    }
    
    setStars(starData);
  }, []);

  // Optimize celestial body animation with RAF
  useEffect(() => {
    let animationId: number;
    
    const updateCelestialBodies = () => {
      setCelestialBodies(prevBodies => 
        prevBodies.map(body => ({
          ...body,
          bouncePhase: body.bouncePhase + 0.02, // Reduced frequency for performance
        }))
      );
      animationId = requestAnimationFrame(updateCelestialBodies);
    };
    
    animationId = requestAnimationFrame(updateCelestialBodies);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Animate star twinkling with gentle pulsing
  useEffect(() => {
    let animationId: number;
    
    const updateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          twinklePhase: star.twinklePhase + 0.03, // Gentle twinkling speed
        }))
      );
      animationId = requestAnimationFrame(updateStars);
    };
    
    animationId = requestAnimationFrame(updateStars);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Increase cloud count with significantly slower movement
  useEffect(() => {
    const cloudData: Cloud[] = [];
    
    // Enhanced cloud distribution: even more clouds for richer atmospheric effect
    const cloudSizes = [
      ...Array(8).fill('small'),    // 8 small clouds
      ...Array(18).fill('medium'),  // 18 medium clouds (increased from 10)
      ...Array(4).fill('large')     // 4 large clouds
    ];
    
    for (let i = 0; i < 30; i++) { // Increased from 22 to 30 clouds
      cloudData.push({
        id: i,
        x: Math.random() * -30, // Spread starting positions more
        y: Math.random() * 85 + 5,
        size: cloudSizes[i % cloudSizes.length] as 'small' | 'medium' | 'large',
        speed: (0.15 + Math.random() * 0.25) * 0.4, // Middle speed: balanced between fast and slow
        opacity: 0.08 + Math.random() * 0.12, // Slightly more subtle
        hasLightning: Math.random() < 0.12, // Slightly reduced lightning frequency
        lightningActive: false,
      });
    }
    setClouds(cloudData);
  }, []);

  // Optimize cloud movement with moderately paced RAF updates
  useEffect(() => {
    let animationId: number;
    let lastUpdate = 0;
    const updateInterval = 60; // Update every 60ms for balanced movement speed
    
    const updateClouds = (timestamp: number) => {
      if (timestamp - lastUpdate >= updateInterval) {
        setClouds(prevClouds => 
          prevClouds.map(cloud => ({
            ...cloud,
            x: cloud.x > 130 ? -30 : cloud.x + cloud.speed, // Wider reset range
          }))
        );
        lastUpdate = timestamp;
      }
      animationId = requestAnimationFrame(updateClouds);
    };
    
    animationId = requestAnimationFrame(updateClouds);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Lightning animation system with longer intervals
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setClouds(prevClouds => {
        const lightningClouds = prevClouds.filter(cloud => cloud.hasLightning && cloud.x > 0 && cloud.x < 100);
        
        if (lightningClouds.length > 0 && Math.random() < 0.08) { // Reduced chance for more atmospheric effect
          const randomCloud = lightningClouds[Math.floor(Math.random() * lightningClouds.length)];
          
          return prevClouds.map(cloud => ({
            ...cloud,
            lightningActive: cloud.id === randomCloud.id ? true : cloud.lightningActive,
          }));
        }
        return prevClouds;
      });
    }, 4000); // Longer intervals between lightning

    return () => clearInterval(lightningInterval);
  }, []);

  // Turn off lightning after brief flash
  useEffect(() => {
    const lightningOffInterval = setInterval(() => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => ({
          ...cloud,
          lightningActive: false,
        }))
      );
    }, 200); // Lightning lasts 200ms

    return () => clearInterval(lightningOffInterval);
  }, []);

  useEffect(() => {
    // Generate strategic background elements that don't interfere with content
    const elements: GameElement[] = [];
    
    // Create blocks in corners and edges, avoiding center content area
    const positions = [
      // Top area (above main content)
      { x: 10, y: 5 }, { x: 25, y: 8 }, { x: 75, y: 5 }, { x: 90, y: 10 },
      // Left side
      { x: 5, y: 30 }, { x: 8, y: 50 }, { x: 3, y: 70 },
      // Right side  
      { x: 92, y: 25 }, { x: 95, y: 45 }, { x: 88, y: 65 }, { x: 97, y: 85 },
      // Bottom area (below main content)
      { x: 15, y: 95 }, { x: 40, y: 98 }, { x: 65, y: 95 }, { x: 85, y: 97 }
    ];
    
    // Create blocks at strategic positions
    positions.forEach((pos, i) => {
      if (i < 10) { // First 10 are blocks
        elements.push({
          id: i,
          type: 'block',
          x: pos.x,
          y: pos.y,
          delay: Math.random() * 10,
          active: Math.random() > 0.6,
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
        });
      }
    });
    
    // Create coins in safe areas
    const coinPositions = [
      { x: 20, y: 15 }, { x: 80, y: 20 }, { x: 10, y: 80 }, 
      { x: 90, y: 75 }, { x: 5, y: 40 }, { x: 95, y: 55 }
    ];
    
    coinPositions.forEach((pos, i) => {
      elements.push({
        id: i + 20,
        type: 'coin',
        x: pos.x,
        y: pos.y,
        delay: Math.random() * 8,
        active: false,
        size: 'medium',
      });
    });
    
    setGameElements(elements);
  }, []);

  useEffect(() => {
    // Randomly activate blocks every few seconds for subtle animation
    const interval = setInterval(() => {
      setGameElements(prev => 
        prev.map(element => ({
          ...element,
          active: element.type === 'block' ? Math.random() > 0.7 : element.active
        }))
      );
    }, 4000); // Back to 4 seconds for block activation

    return () => clearInterval(interval);
  }, []);

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'scale-75';
      case 'large': return 'scale-125';
      default: return 'scale-100';
    }
  };

  const getCloudSize = (size: string) => {
    switch (size) {
      case 'small': return 'w-8 h-4';
      case 'large': return 'w-16 h-8';
      default: return 'w-12 h-6';
    }
  };

  return (
    <div className="retro-background">
      {/* Bouncing Celestial Bodies */}
      {celestialBodies.map((body) => (
        <div
          key={`celestial-${body.id}`}
          className="absolute pointer-events-none z-0"
          style={{
            left: `${body.x}%`,
            top: `${body.y}%`,
            width: '24px', // 50% larger than coins (16px -> 24px)
            height: '24px',
            animation: 'celestial-gentle-bounce 8s ease-in-out infinite',
            animationDelay: `${Math.random() * 8}s`, // Random delay up to 8 seconds
          }}
        >
          {body.type === 'sun' ? (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-400 opacity-40">
              <circle cx="12" cy="12" r="5" />
              {/* Sun rays */}
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-full h-full fill-slate-300 opacity-70">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              {/* Moon craters */}
              <circle cx="14" cy="8" r="1" className="fill-slate-400" />
              <circle cx="16" cy="12" r="0.5" className="fill-slate-400" />
              <circle cx="13" cy="14" r="0.8" className="fill-slate-400" />
            </svg>
          )}
        </div>
      ))}

      {/* Golden Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute pointer-events-none z-0 star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${16 * star.size}px`, // Same base size as coins (16px) with variation
            height: `${16 * star.size}px`,
            opacity: star.opacity + Math.sin(star.twinklePhase) * 0.2, // Gentle twinkling
            transform: `scale(${0.9 + Math.sin(star.twinklePhase * 0.5) * 0.1})`, // Subtle pulsing
            animationDelay: `${star.id * 0.3}s`, // Stagger the animations
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-400">
            <path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              className="drop-shadow-md"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.4))',
              }}
            />
          </svg>
        </div>
      ))}

      {/* Floating Clouds */}
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className={`absolute pointer-events-none z-0 ${getCloudSize(cloud.size)}`}
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            opacity: cloud.lightningActive ? cloud.opacity + 0.5 : cloud.opacity, // More prominent lightning
            filter: cloud.lightningActive ? 'brightness(1.5) drop-shadow(0 0 8px rgba(255, 255, 0, 0.6))' : 'none', // Glow effect
          }}
        >
          <svg viewBox="0 0 100 50" className={`w-full h-full ${cloud.lightningActive ? 'fill-yellow-200' : 'fill-sky-300'}`}>
            <ellipse cx="25" cy="35" rx="20" ry="12" />
            <ellipse cx="50" cy="25" rx="25" ry="15" />
            <ellipse cx="75" cy="35" rx="20" ry="12" />
            <ellipse cx="40" cy="15" rx="15" ry="10" />
            <ellipse cx="60" cy="15" rx="15" ry="10" />
          </svg>
          
          {/* Lightning bolt */}
          {cloud.lightningActive && (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '45%',
                top: '100%',
                transform: 'translateX(-50%)',
              }}
            >
              <svg 
                width="16" 
                height="32" 
                viewBox="0 0 16 32" 
                className="fill-yellow-300 opacity-95 drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(255, 255, 0, 0.8))',
                }}
              >
                <path d="M10 0L3 14h6l-3 18L13 18H7l3-18z" />
              </svg>
            </div>
          )}
        </div>
      ))}

      {gameElements.map((element) => (
        <div
          key={element.id}
          className={`
            ${element.type === 'block' ? 'mario-block' : 'mario-coin'}
            ${element.active ? 'active' : ''}
            ${Math.random() > 0.85 ? 'spinning' : ''}
            ${getSizeClass(element.size)}
          `}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
          }}
        />
      ))}
      
      {/* Add some subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
