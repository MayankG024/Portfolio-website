import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export function RetroCursor() {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);


  useEffect(() => {
  let moveTimeout: number;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
  setIsMoving(true);
  // Clear existing timeout
      clearTimeout(moveTimeout);
      
      // Set new timeout to detect when mouse stops moving
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);

      // No trail dots (removed per request)
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // No trail animation

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(moveTimeout);
      // no interval to clear
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`retro-cursor ${isClicking ? 'clicking' : ''} ${isMoving ? 'moving' : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      >
        {/* Main cursor body - Windows-like arrow using SVG for fidelity */}
        <div className="retro-cursor-body">
          <svg
            className="retro-cursor-svg"
            width="16"
            height="24"
            viewBox="0 0 16 24"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* Windows-like arrow: tip at (0,0), standard proportions */}
            <polygon
              className="cursor-shape"
              points="0,0 0,19 5,14 8,24 11,23 8,13 16,13"
              fill="transparent"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Click effect: circular glow at tip */}
        {isClicking && (
          <div className="retro-cursor-click-effect">
            <div className="click-glow" />
          </div>
        )}
      </div>
    </>
  );
}