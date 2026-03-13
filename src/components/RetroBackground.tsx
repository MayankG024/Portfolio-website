import { useEffect, useState, useMemo } from 'react';

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
  duration: number; // CSS animation duration
  opacity: number;
  hasLightning: boolean;
  animationDelay: number;
}

interface CelestialBody {
  id: number;
  type: 'sun' | 'moon';
  x: number;
  y: number;
  animationDelay: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  opacity: number;
  animationDelay: number;
  size: number;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  animationDelay: number;
  opacity: number;
}

export function RetroBackground() {
  const [gameElements, setGameElements] = useState<GameElement[]>([]);
  const [lightningCloudId, setLightningCloudId] = useState<number | null>(null);

  // Generate celestial bodies once with useMemo (no state updates needed)
  const celestialBodies = useMemo<CelestialBody[]>(() => {
    const bodies: CelestialBody[] = [];
    
    // 9 moons total
    for (let i = 0; i < 4; i++) {
      bodies.push({
        id: i,
        type: 'moon',
        x: 15 + i * 20,
        y: 15 + Math.random() * 70,
        animationDelay: Math.random() * 8,
      });
    }
    
    for (let j = 0; j < 5; j++) {
      bodies.push({
        id: 4 + j,
        type: 'moon',
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 85,
        animationDelay: Math.random() * 8,
      });
    }
    
    return bodies;
  }, []);

  // Generate stars once with useMemo (CSS handles twinkling)
  const stars = useMemo<Star[]>(() => {
    const starData: Star[] = [];
    
    for (let i = 0; i < 15; i++) {
      starData.push({
        id: i,
        x: Math.random() * 95 + 2.5,
        y: Math.random() * 60 + 5,
        opacity: 0.4 + Math.random() * 0.3,
        animationDelay: Math.random() * 4,
        size: 0.8 + Math.random() * 0.4,
      });
    }
    
    return starData;
  }, []);

  // Generate clouds once with useMemo (CSS handles movement)
  const clouds = useMemo<Cloud[]>(() => {
    const cloudData: Cloud[] = [];
    const cloudSizes = [
      ...Array(8).fill('small'),
      ...Array(18).fill('medium'),
      ...Array(4).fill('large')
    ];
    
    for (let i = 0; i < 30; i++) {
      const speed = 0.15 + Math.random() * 0.25;
      cloudData.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 85 + 5,
        size: cloudSizes[i % cloudSizes.length] as 'small' | 'medium' | 'large',
        duration: 80 + (1 / speed) * 20,
        opacity: 0.08 + Math.random() * 0.1,
        hasLightning: Math.random() < 0.12,
        animationDelay: Math.random() * -80,
      });
    }
    return cloudData;
  }, []);

  // Generate emojis once
  const emojis = useMemo<FloatingEmoji[]>(() => {
    const list = ['🎮', '🕹️', '👾', '🎮', '🕹️', '👾'];
    return list.map((emoji, i) => {
      // Keep emojis near left and right edges (5-20% and 80-95%)
      const isLeft = i % 2 === 0;
      const x = isLeft ? 5 + Math.random() * 15 : 80 + Math.random() * 15;
      
      return {
        id: i,
        emoji,
        x,
        y: 10 + Math.random() * 80,
        animationDelay: Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.2, // Increased transparency
      };
    });
  }, []);

  // Lightning effect - simple interval, no RAF
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      const lightningClouds = clouds.filter(c => c.hasLightning);
      if (lightningClouds.length > 0 && Math.random() < 0.08) {
        const randomCloud = lightningClouds[Math.floor(Math.random() * lightningClouds.length)];
        setLightningCloudId(randomCloud.id);
        setTimeout(() => setLightningCloudId(null), 200);
      }
    }, 4000);

    return () => clearInterval(lightningInterval);
  }, [clouds]);

  // Initialize game elements once
  useEffect(() => {
    const elements: GameElement[] = [];
    
    const positions = [
      { x: 10, y: 5 }, { x: 25, y: 8 }, { x: 75, y: 5 }, { x: 90, y: 10 },
      { x: 5, y: 30 }, { x: 8, y: 50 }, { x: 3, y: 70 },
      { x: 92, y: 25 }, { x: 95, y: 45 }, { x: 88, y: 65 }, { x: 97, y: 85 },
      { x: 15, y: 95 }, { x: 40, y: 98 }, { x: 65, y: 95 }, { x: 85, y: 97 }
    ];
    
    positions.slice(0, 10).forEach((pos, i) => {
      elements.push({
        id: i,
        type: 'block',
        x: pos.x,
        y: pos.y,
        delay: Math.random() * 10,
        active: Math.random() > 0.6,
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
      });
    });
    
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

  // Block activation - runs infrequently
  useEffect(() => {
    const interval = setInterval(() => {
      setGameElements(prev => 
        prev.map(element => ({
          ...element,
          active: element.type === 'block' ? Math.random() > 0.7 : element.active
        }))
      );
    }, 5000); // Increased from 4s to 5s

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
      {/* Bouncing Celestial Bodies - CSS animated */}
      {celestialBodies.map((body) => (
        <div
          key={`celestial-${body.id}`}
          className="absolute pointer-events-none z-0 will-change-transform"
          style={{
            left: `${body.x}%`,
            top: `${body.y}%`,
            width: '24px',
            height: '24px',
            animation: 'celestial-gentle-bounce 8s ease-in-out infinite',
            animationDelay: `${body.animationDelay}s`,
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

      {/* Golden Twinkling Stars - CSS animated */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute pointer-events-none z-0 will-change-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${16 * star.size}px`,
            height: `${16 * star.size}px`,
            animation: `star-twinkle 3s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
            opacity: star.opacity,
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

      {/* Floating Emojis - CSS animated */}
      {emojis.map((emoji) => (
        <div
          key={`emoji-${emoji.id}`}
          className="absolute pointer-events-none z-0 select-none will-change-transform"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: '1.5rem',
            opacity: emoji.opacity,
            animation: 'celestial-gentle-bounce 8s ease-in-out infinite',
            animationDelay: `${emoji.animationDelay}s`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* Floating Clouds - CSS animated */}
      {clouds.map((cloud) => {
        const isLightning = lightningCloudId === cloud.id;
        return (
          <div
            key={`cloud-${cloud.id}`}
            className={`absolute pointer-events-none z-0 will-change-transform ${getCloudSize(cloud.size)}`}
            style={{
              top: `${cloud.y}%`,
              opacity: isLightning ? cloud.opacity + 0.5 : cloud.opacity,
              filter: isLightning ? 'brightness(1.5) drop-shadow(0 0 8px rgba(255, 255, 0, 0.6))' : 'none',
              animation: `cloud-drift ${cloud.duration}s linear infinite`,
              animationDelay: `${cloud.animationDelay}s`,
            }}
          >
            <svg viewBox="0 0 100 50" className={`w-full h-full ${isLightning ? 'fill-yellow-200' : 'fill-sky-300'}`}>
              <ellipse cx="25" cy="35" rx="20" ry="12" />
              <ellipse cx="50" cy="25" rx="25" ry="15" />
              <ellipse cx="75" cy="35" rx="20" ry="12" />
              <ellipse cx="40" cy="15" rx="15" ry="10" />
              <ellipse cx="60" cy="15" rx="15" ry="10" />
            </svg>
            
            {/* Lightning bolt */}
            {isLightning && (
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
        );
      })}

      {gameElements.map((element) => (
        <div
          key={element.id}
          className={`
            ${element.type === 'block' ? 'mario-block opacity-40' : 'mario-coin'}
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
