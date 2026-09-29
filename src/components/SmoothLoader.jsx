import React, { useEffect, useState } from 'react';

export default function SmoothLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing runtime...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      'Initializing runtime environment...',
      'Loading Core Java & OOP modules...',
      'Compiling Python NLP engine...',
      'Optimizing MySQL queries...',
      'Rendering Amber UI & Canvas...',
      'System Ready — Welcome'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Increments dynamically with acceleration
      const increment = Math.floor(Math.random() * 8) + 4;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      const statusIdx = Math.min(
        Math.floor((currentProgress / 100) * (statuses.length - 1)),
        statuses.length - 1
      );
      setStatusText(statuses[statusIdx]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 700);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '24px',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.04) translateY(-10px)' : 'scale(1) translateY(0)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
        userSelect: 'none',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'pulse-dot 3s ease-in-out infinite',
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: '420px', width: '100%', position: 'relative', zIndex: 2 }}>
        {/* Animated Brand Logo Badge */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1E1E1E 0%, #151515 100%)',
            border: '1px solid #F59E0B',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontFamily: 'Sora',
            fontWeight: '800',
            fontSize: '24px',
            color: '#F59E0B',
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          S
        </div>

        {/* Section Label */}
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#F59E0B',
            marginBottom: '8px',
          }}
        >
          SUNDAR M · DEVELOPER PORTFOLIO
        </p>

        <h2
          style={{
            fontFamily: 'Sora',
            fontWeight: '800',
            fontSize: '22px',
            color: '#FFFFFF',
            marginBottom: '28px',
            letterSpacing: '-0.02em',
          }}
        >
          Initializing Portfolio System
        </h2>

        {/* Big Counter Percentage */}
        <div
          style={{
            fontFamily: 'Sora',
            fontWeight: '800',
            fontSize: 'clamp(48px, 8vw, 72px)',
            lineHeight: 1,
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span className="shimmer-text">{progress}</span>
          <span style={{ fontSize: '24px', color: '#F59E0B' }}>%</span>
        </div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '100%',
            height: '6px',
            background: '#151515',
            border: '1px solid #2A2A2A',
            borderRadius: '999px',
            overflow: 'hidden',
            marginBottom: '14px',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #D97706, #F59E0B, #FBBF24)',
              borderRadius: '999px',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.8)',
            }}
          />
        </div>

        {/* Dynamic Status Text */}
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: '12px',
            color: '#999999',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}
        >
          {statusText}
        </p>
      </div>
    </div>
  );
}
