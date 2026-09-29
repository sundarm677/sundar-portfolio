import React, { useEffect, useState } from 'react';

export default function ScrollParallaxMarquee({ text = 'FULL STACK DEVELOPER · AI HEALTHCARE · REACT.JS · NODE.JS · MYSQL · OPENCV ·', direction = 1 }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      setOffset((prev) => prev + delta * direction * 0.4);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction]);

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '16px 0', background: '#151515', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', userSelect: 'none' }}>
      <div
        style={{
          display: 'inline-block',
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.1s linear',
          fontFamily: 'Sora, sans-serif',
          fontWeight: '800',
          fontSize: 'clamp(20px, 3vw, 36px)',
          color: '#2A2A2A',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span>{text} {text} {text} {text}</span>
      </div>
    </div>
  );
}
