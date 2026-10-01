import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Laptop, Code2, Award, GraduationCap, Send } from 'lucide-react';

// Exact Section Mapping Definition
const AVATAR_DATA = {
  hero: {
    image: '/avatar-hero.png',
    message: "Hi, I'm Sundar 👋",
    prop: '👋',
  },
  about: {
    image: '/avatar-about.png',
    message: "A little about me...",
    prop: '💡',
  },
  skills: {
    image: '/avatar-skills.png',
    message: "These are my skills 🚀",
    prop: '🚀',
  },
  projects: {
    image: '/avatar-projects.png',
    message: "Check out what I've built →",
    prop: '📂',
  },
  experience: {
    image: '/avatar-experience.png',
    message: "Learning by building.",
    prop: '💼',
  },
  education: {
    image: '/avatar-education.png',
    message: "Always learning something new 🎓",
    prop: '🎓',
  },
  contact: {
    image: '/avatar-contact.png',
    message: "Let's connect! 👋",
    prop: '🤝',
  },
  thanks: {
    image: '/avatar-thanks.png',
    message: "Thanks for visiting! 🚀",
    prop: '🎉',
  },

  // Contextual Hover Overrides
  java: {
    image: '/avatar-java.png',
    message: "Java is one of my core skills",
    prop: '☕',
  },
  chatbot: {
    image: '/avatar-chatbot.png',
    message: "AI Chatbot 🤖",
    prop: '🤖',
  },
  ecommerce: {
    image: '/avatar-ecommerce.png',
    message: "E-Commerce Website 🛒",
    prop: '🛒',
  },
  github: {
    image: '/avatar-github.png',
    message: "Find me on GitHub",
    prop: '🐙',
  },
};

const POSE_KEYS = Object.keys(AVATAR_DATA);

export default function AvatarGuide({ hoverState }) {
  const currentPoseKeyRef = useRef('hero');
  const isCrossfadingRef = useRef(false);

  const [activePoseKey, setActivePoseKey] = useState('hero');
  const [currentPoseSrc, setCurrentPoseSrc] = useState(AVATAR_DATA.hero.image);
  const [nextPoseSrc, setNextPoseSrc] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const [speechText, setSpeechText] = useState(AVATAR_DATA.hero.message);
  const [activeProp, setActiveProp] = useState(AVATAR_DATA.hero.prop);

  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const avatarRef = useRef(null);

  // Preload all pose images on mount
  useEffect(() => {
    POSE_KEYS.forEach(key => {
      const img = new Image();
      img.src = AVATAR_DATA[key].image;
    });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Dual-Layer Pose Switcher Function
  const setAvatarPose = (newPose) => {
    if (newPose === currentPoseKeyRef.current || isCrossfadingRef.current) return;
    const poseObj = AVATAR_DATA[newPose];
    if (!poseObj) return;

    currentPoseKeyRef.current = newPose;
    isCrossfadingRef.current = true;

    setNextPoseSrc(poseObj.image);
    setIsCrossfading(true);
    setActivePoseKey(newPose);
    setSpeechText(poseObj.message);
    setActiveProp(poseObj.prop);

    setTimeout(() => {
      setCurrentPoseSrc(poseObj.image);
      setNextPoseSrc(null);
      setIsCrossfading(false);
      isCrossfadingRef.current = false;
    }, 450); // 450ms smooth crossfade
  };

  // TRUE Viewport Center Synchronized Section Evaluator with rAF Debouncing
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      const sections = document.querySelectorAll('[data-avatar-pose]');

      let closestSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection && closestSection.dataset.avatarPose) {
        const newPose = closestSection.dataset.avatarPose;
        setAvatarPose(newPose);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection(); // Initial execution

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Desktop Cursor Micro-tracking
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      setCursorOffset({
        x: Math.max(-5, Math.min(5, deltaX * 25)),
        y: Math.max(-5, Math.min(5, deltaY * 25)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isReducedMotion]);

  // Hover Reaction Overrides (Reverts back to current viewport section pose when mouse leaves)
  useEffect(() => {
    if (hoverState) {
      if (hoverState.type === 'skill') {
        if (hoverState.name.toLowerCase().includes('java')) {
          setAvatarPose('java');
        } else {
          setSpeechText(`Exploring ${hoverState.name} ⚡`);
        }
        return;
      }
      if (hoverState.type === 'project') {
        if (hoverState.id === 'chatbot') {
          setAvatarPose('chatbot');
        } else if (hoverState.id === 'ecommerce') {
          setAvatarPose('ecommerce');
        }
        return;
      }
      if (hoverState.type === 'contact') {
        if (hoverState.id === 'github') {
          setAvatarPose('github');
        } else if (hoverState.id === 'email') {
          setSpeechText("Drop me an email! 📧");
        } else if (hoverState.id === 'linkedin') {
          setSpeechText("Let's connect on LinkedIn! 🤝");
        }
        return;
      }
    } else {
      const currentObj = AVATAR_DATA[currentPoseKeyRef.current];
      if (currentObj) {
        setSpeechText(currentObj.message);
        setActiveProp(currentObj.prop);
      }
    }
  }, [hoverState]);

  const skillBadges = ['Java', 'Python', 'SQL', 'HTML5', 'CSS3', 'JS'];

  return (
    <div
      ref={avatarRef}
      className={`avatar-companion-container ${isMobile ? 'avatar-mobile' : ''}`}
      style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '28px',
        left: isMobile ? '16px' : '28px',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        pointerEvents: 'none',
      }}
    >
      {/* Speech Bubble Synchronized with Active Section */}
      <div
        className="avatar-speech-bubble"
        style={{
          background: 'linear-gradient(135deg, #1E1E1E 0%, #151515 100%)',
          border: '1.5px solid #F59E0B',
          borderRadius: '16px',
          padding: '10px 16px',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '12px' : '13px',
          fontWeight: '700',
          boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.25)',
          marginBottom: '10px',
          maxWidth: '240px',
          position: 'relative',
          pointerEvents: 'auto',
          animation: 'bubblePulse 3s ease-in-out infinite',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Sparkles size={14} color="#F59E0B" className="animate-spin-slow" />
        <span>{speechText}</span>
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '32px',
            width: '12px',
            height: '12px',
            background: '#151515',
            borderRight: '1.5px solid #F59E0B',
            borderBottom: '1.5px solid #F59E0B',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      {/* Avatar Stage Frame */}
      <div
        className="avatar-character-frame"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: isMobile ? '110px' : '145px',
          height: isMobile ? '125px' : '165px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px)`,
          transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Floating Skill Badges */}
        {activePoseKey === 'skills' && (
          <div
            style={{
              position: 'absolute',
              top: '-35px',
              left: '0px',
              right: '0px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              zIndex: 10,
            }}
          >
            {skillBadges.map((badge, idx) => (
              <span
                key={badge}
                className="floating-tech-badge"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '9px',
                  fontWeight: '800',
                  color: '#1A0F00',
                  background: '#F59E0B',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(245,158,11,0.4)',
                  animation: `badgeFloat 2s ease-in-out infinite ${idx * 0.15}s`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Section Prop Icon */}
        <div style={{ position: 'absolute', top: '6px', right: '-8px', zIndex: 11 }}>
          <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%', boxShadow: '0 0 12px rgba(245,158,11,0.5)' }}>
            {activeProp}
          </div>
        </div>

        {/* Base Glow Aura */}
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85%',
            height: '16px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.45) 0%, transparent 75%)',
            filter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Dual-Layer Crossfading Avatar Stage */}
        <div
          className="avatar-stage"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            filter: isHovered ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.6))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
            transition: 'filter 0.3s ease',
          }}
        >
          {/* Current Pose Layer */}
          <img
            src={currentPoseSrc}
            alt={`Sundar Avatar Pose ${activePoseKey}`}
            className={`avatar-pose-img pose-${activePoseKey}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: isCrossfading ? 0 : 1,
              transform: isCrossfading ? 'translateY(-6px)' : 'translateY(0px)',
              transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: isReducedMotion ? 'none' : 'avatarIdleFloat 4s ease-in-out infinite',
            }}
          />

          {/* Next Pose Layer */}
          {nextPoseSrc && (
            <img
              src={nextPoseSrc}
              alt="Sundar Avatar Pose Incoming"
              className="avatar-pose-img pose-incoming"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: isCrossfading ? 1 : 0,
                transform: isCrossfading ? 'translateY(0px)' : 'translateY(8px)',
                transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
