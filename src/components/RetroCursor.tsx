import { useEffect, useState, useRef } from 'react';

export function RetroCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation for instant cursor movement (no React re-render)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

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
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`retro-cursor ${isClicking ? 'clicking' : ''}`}
        style={{ transform: 'translate(0px, 0px)' }}
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