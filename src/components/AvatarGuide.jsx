import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Laptop, Code2, Award, GraduationCap, Send } from 'lucide-react';

// 12 Section-Aware Mascot Avatar States
const AVATAR_STATES = {
  hero: {
    pose: 'wave',
    image: '/avatar-wave.png',
    message: "Hi, I'm Sundar 👋",
    prop: '👋',
  },
  about: {
    pose: 'thinking',
    image: '/avatar-thinking.png',
    message: "A little about me...",
    prop: '💡',
  },
  skills: {
    pose: 'coding',
    image: '/avatar-coding.png',
    message: "These are my tools 🚀",
    prop: '🚀',
  },
  projects: {
    pose: 'pointing',
    image: '/avatar-pointing.png',
    message: "Check out what I've built →",
    prop: '📂',
  },
  chatbot: {
    pose: 'chatting',
    image: '/avatar-chatting.png',
    message: "Let's chat 🤖",
    prop: '🤖',
  },
  ecommerce: {
    pose: 'shopping',
    image: '/avatar-shopping.png',
    message: "Built with HTML, CSS & JavaScript 🛒",
    prop: '🛒',
  },
  experience: {
    pose: 'professional',
    image: '/avatar-professional.png',
    message: "Learning by building.",
    prop: '💼',
  },
  education: {
    pose: 'reading',
    image: '/avatar-reading.png',
    message: "Always learning something new 🎓",
    prop: '🎓',
  },
  contact: {
    pose: 'wave-point',
    image: '/avatar-wave-point.png',
    message: "Let's build something together! 👋",
    prop: '🤝',
  },
  github: {
    pose: 'laptop',
    image: '/avatar-laptop.png',
    message: "Check out my code →",
    prop: '🐙',
  },
  linkedin: {
    pose: 'handshake',
    image: '/avatar-handshake.png',
    message: "Let's connect 🤝",
    prop: '🤝',
  },
  footer: {
    pose: 'celebrate',
    image: '/avatar-celebrate.png',
    message: "Thanks for visiting! 🚀",
    prop: '🎉',
  },
};

const POSE_ASSET_KEYS = Object.keys(AVATAR_STATES);

export default function AvatarGuide({ hoverState }) {
  const currentPoseRef = useRef(null);
  const isCrossfadingRef = useRef(false);

  const [activeStateKey, setActiveStateKey] = useState('hero');
  const [currentPoseSrc, setCurrentPoseSrc] = useState(AVATAR_STATES.hero.image);
  const [nextPoseSrc, setNextPoseSrc] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const [speechText, setSpeechText] = useState(AVATAR_STATES.hero.message);
  const [activeProp, setActiveProp] = useState(AVATAR_STATES.hero.prop);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const avatarRef = useRef(null);

  // Preload all 12 pose PNG images on mount
  useEffect(() => {
    POSE_ASSET_KEYS.forEach(key => {
      const img = new Image();
      img.src = AVATAR_STATES[key].image;
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

  // Section State Setter Function with Lock
  const setAvatarState = (sectionKey) => {
    if (currentPoseRef.current === sectionKey || isCrossfadingRef.current) return;
    const stateObj = AVATAR_STATES[sectionKey];
    if (!stateObj) return;

    currentPoseRef.current = sectionKey;
    isCrossfadingRef.current = true;

    setNextPoseSrc(stateObj.image);
    setIsCrossfading(true);
    setActiveStateKey(sectionKey);
    setSpeechText(stateObj.message);
    setActiveProp(stateObj.prop);

    setTimeout(() => {
      setCurrentPoseSrc(stateObj.image);
      setNextPoseSrc(null);
      setIsCrossfading(false);
      isCrossfadingRef.current = false;
    }, 500); // 500ms smooth crossfade
  };

  // Section Observer (threshold: 0.45)
  useEffect(() => {
    const handleScroll = () => {
      // Bottom footer check
      const scrollPosition = window.innerHeight + window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= maxScroll) {
        setAvatarState('footer');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = document.querySelectorAll('[data-avatar-pose]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const poseKey = entry.target.dataset.avatarPose;
          const targetKey = poseKey === 'thanks' ? 'footer' : poseKey;
          if (targetKey && AVATAR_STATES[targetKey]) {
            setAvatarState(targetKey);
          }
        }
      });
    }, { threshold: [0.35, 0.45, 0.6] });

    sections.forEach(sec => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Hover Reactions Context Engine
  useEffect(() => {
    if (hoverState) {
      if (hoverState.type === 'project') {
        if (hoverState.id === 'chatbot') setAvatarState('chatbot');
        else if (hoverState.id === 'ecommerce') setAvatarState('ecommerce');
        return;
      }
      if (hoverState.type === 'contact') {
        if (hoverState.id === 'github') setAvatarState('github');
        else if (hoverState.id === 'linkedin') setAvatarState('linkedin');
        else if (hoverState.id === 'email') {
          setAvatarState('contact');
          setSpeechText("Drop me an email! 📧");
        }
        return;
      }
      if (hoverState.type === 'skill') {
        setAvatarState('skills');
        setSpeechText(`Exploring ${hoverState.name} ⚡`);
        return;
      }
    } else {
      const currentObj = AVATAR_STATES[currentPoseRef.current || 'hero'];
      if (currentObj) {
        setSpeechText(currentObj.message);
        setActiveProp(currentObj.prop);
      }
    }
  }, [hoverState]);

  return (
    <div
      ref={avatarRef}
      className={`avatar-mascot ${isMobile ? 'avatar-mobile' : ''}`}
      style={{
        position: 'fixed',
        bottom: isMobile ? '18px' : '28px',
        left: isMobile ? '16px' : '28px',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        pointerEvents: 'none',
      }}
    >
      {/* Speech Bubble (Placed Above Mascot) */}
      <div
        className="avatar-speech-bubble"
        style={{
          background: 'linear-gradient(135deg, #1E1E1E 0%, #151515 100%)',
          border: '1.5px solid #F59E0B',
          borderRadius: '16px',
          padding: isMobile ? '8px 12px' : '10px 16px',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '11px' : '13px',
          fontWeight: '700',
          boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.25)',
          marginBottom: '10px',
          maxWidth: isMobile ? '220px' : '240px',
          position: 'relative',
          pointerEvents: 'none',
          animation: 'bubblePulse 3s ease-in-out infinite',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Sparkles size={13} color="#F59E0B" className="animate-spin-slow" />
        <span>{speechText}</span>
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '28px',
            width: '12px',
            height: '12px',
            background: '#151515',
            borderRight: '1.5px solid #F59E0B',
            borderBottom: '1.5px solid #F59E0B',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      {/* Avatar Mascot Character Frame */}
      <div
        className="avatar-character-frame"
        style={{
          position: 'relative',
          width: isMobile ? '85px' : '135px',
          height: isMobile ? '95px' : '155px',
          pointerEvents: 'auto',
        }}
      >

        {/* Section Prop Icon */}
        <div style={{ position: 'absolute', top: '4px', right: '-6px', zIndex: 11, pointerEvents: 'none' }}>
          <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '5px', borderRadius: '50%', boxShadow: '0 0 10px rgba(245,158,11,0.5)' }}>
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
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.45) 0%, transparent 75%)',
            filter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Dual-Layer Crossfading Stage */}
        <div
          className="avatar-stage"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.5))',
          }}
        >
          {/* Current Pose Layer */}
          <img
            src={currentPoseSrc}
            alt={`Sundar Mascot ${activeStateKey}`}
            className={`avatar-pose-img pose-${activeStateKey}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: isCrossfading ? 0 : 1,
              transform: isCrossfading ? 'translateY(-4px)' : 'translateY(0px)',
              transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: isReducedMotion ? 'none' : 'avatarIdleFloat 4s ease-in-out infinite',
            }}
          />

          {/* Next Pose Layer */}
          {nextPoseSrc && (
            <img
              src={nextPoseSrc}
              alt="Sundar Mascot Incoming"
              className="avatar-pose-img pose-incoming"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: isCrossfading ? 1 : 0,
                transform: isCrossfading ? 'translateY(0px)' : 'translateY(6px)',
                transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
