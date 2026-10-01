import React, { useState, useEffect } from 'react';

const techBadges = [
  { name: 'Java', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', class: 'tech-float-1', style: { top: '8%', left: '-18%' } },
  { name: 'Python', color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.12)', class: 'tech-float-2', style: { top: '24%', right: '-20%' } },
  { name: 'SQL', color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', class: 'tech-float-3', style: { top: '56%', left: '-22%' } },
  { name: 'HTML5', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', class: 'tech-float-4', style: { top: '68%', right: '-18%' } },
  { name: 'CSS3', color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)', class: 'tech-float-5', style: { bottom: '-4%', left: '8%' } },
  { name: 'JavaScript', color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.12)', class: 'tech-float-6', style: { bottom: '-6%', right: '12%' } },
];

export default function MascotAvatar3D() {
  const [bubbleText, setBubbleText] = useState(null);
  const [isWaving, setIsWaving] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  // Entrance & Initial Greeting Sequence
  useEffect(() => {
    // 1. Entrance animation
    const enterTimer = setTimeout(() => {
      setIsEntered(true);
    }, 150);

    // 2. Initial greeting after entrance
    const greetTimer = setTimeout(() => {
      setIsWaving(true);
      setBubbleText("Hi! I'm Sundar 👋");

      // Stop wave animation
      setTimeout(() => setIsWaving(false), 1400);

      // Hide initial bubble after 2.5s
      setTimeout(() => {
        setBubbleText(prev => prev === "Hi! I'm Sundar 👋" ? null : prev);
      }, 2500);
    }, 850);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(greetTimer);
    };
  }, []);

  // Hover Interaction
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!bubbleText) {
      setBubbleText("Hi there! 👋");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (bubbleText === "Hi there! 👋") {
      setBubbleText(null);
    }
  };

  // Click Interaction Sequence
  const handleClick = () => {
    setIsBouncing(true);
    setIsWaving(true);
    setBubbleText("Nice to meet you! I'm Sundar.");

    // Reset bounce
    setTimeout(() => setIsBouncing(false), 650);
    setTimeout(() => setIsWaving(false), 1400);

    // Step 2 sequence
    setTimeout(() => {
      setBubbleText("Explore my portfolio ↓");
    }, 1800);

    // Fade out speech bubble
    setTimeout(() => {
      setBubbleText(null);
    }, 3800);
  };

  return (
    <div
      className="mascot-container"
      style={{
        position: 'relative',
        width: 'clamp(260px, 22vw, 310px)',
        height: 'clamp(280px, 24vw, 340px)',
        opacity: isEntered ? 1 : 0,
        transform: isEntered
          ? `translate(0, 0)`
          : `translate(60px, 20px)`,
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >

      {/* Dynamic Interactive Speech Bubble */}
      {bubbleText && (
        <div
          className="speech-bubble"
          style={{
            top: '-32px',
            right: '-10px',
          }}
        >
          {bubbleText}
          <div className="speech-bubble-tail speech-bubble-tail-top-right" />
        </div>
      )}

      {/* Floating Tech Stack Badges around Mascot */}
      {techBadges.map((badge, index) => (
        <div
          key={index}
          className={`tech-floating-badge ${badge.class}`}
          style={{
            ...badge.style,
            borderColor: badge.color,
            backgroundColor: badge.bg,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badge.color, boxShadow: `0 0 8px ${badge.color}` }} />
          <span style={{ color: badge.color }}>{badge.name}</span>
        </div>
      ))}

      {/* Aura Ring Spotlight behind Mascot */}
      <div
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 75%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0.6,
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      />

      {/* Mascot Avatar Image Layer */}
      <div
        className={`
          ${isBouncing ? 'mascot-bounce' : ''}
          ${isWaving ? 'mascot-waving' : ''}
          ${!isBouncing && !isWaving ? 'mascot-idle-float' : ''}
        `}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
          filter: isHovered ? 'drop-shadow(0 14px 30px rgba(245, 158, 11, 0.25))' : 'drop-shadow(0 10px 24px rgba(0,0,0,0.5))',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
        }}
      >
        <img
          src="/mascot_avatar.png"
          alt="3D Sundar M Mascot Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            pointerEvents: 'none',
            imageRendering: '-webkit-optimize-contrast',
          }}
        />
      </div>

    </div>
  );
}
