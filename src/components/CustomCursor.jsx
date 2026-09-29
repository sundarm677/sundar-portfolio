import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('.btn-white') ||
        e.target.closest('.btn-ghost') ||
        e.target.closest('.btn-filled') ||
        e.target.closest('.sage-card') ||
        e.target.closest('.surface-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderRadius: '50%',
          border: isHovered ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'none',
          transform: `translate(${pos.x - (isHovered ? 24 : 14)}px, ${pos.y - (isHovered ? 24 : 14)}px)`,
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.06s ease-out, background-color 0.2s ease, border-color 0.2s ease',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: isHovered ? '#F59E0B' : '#FFFFFF',
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'background-color 0.2s ease',
        }}
      />
    </>
  );
}
