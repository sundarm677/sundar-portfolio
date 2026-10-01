import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Laptop, GraduationCap, Send, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

// 19 Comment-Based Pose Asset Mapping
const COMMENT_POSE_MAP = {
  hi: { src: '/avatar-hi.png', text: "Hi, I'm Sundar 👋", prop: '👋' },
  welcome: { src: '/avatar-welcome.png', text: "Welcome to my portfolio", prop: '✨' },
  about: { src: '/avatar-about.png', text: "A little about me...", prop: '💡' },
  developer: { src: '/avatar-developer.png', text: "I'm a Software Developer", prop: '⚡' },
  building: { src: '/avatar-building.png', text: "I love building software", prop: '💻' },
  skills: { src: '/avatar-skills.png', text: "These are my skills 🚀", prop: '🚀' },
  java: { src: '/avatar-java.png', text: "Java is one of my core skills", prop: '☕' },
  problemSolving: { src: '/avatar-problem-solving.png', text: "Let's solve some problems", prop: '🧠' },
  projects: { src: '/avatar-projects.png', text: "Check out my projects →", prop: '📂' },
  chatbot: { src: '/avatar-chatbot.png', text: "AI Chatbot 🤖", prop: '🤖' },
  ecommerce: { src: '/avatar-ecommerce.png', text: "E-Commerce Website 🛒", prop: '🛒' },
  learning: { src: '/avatar-learning.png', text: "Learning by building", prop: '🔨' },
  experience: { src: '/avatar-experience.png', text: "My internship experience", prop: '💼' },
  education: { src: '/avatar-education.png', text: "Always learning something new 🎓", prop: '🎓' },
  contact: { src: '/avatar-contact.png', text: "Let's connect! 👋", prop: '🤝' },
  github: { src: '/avatar-github.png', text: "Find me on GitHub", prop: '🐙' },
  collaboration: { src: '/avatar-collaboration.png', text: "Let's build something together", prop: '🚀' },
  thanks: { src: '/avatar-thanks.png', text: "Thanks for visiting! 🚀", prop: '🎉' },
  goodbye: { src: '/avatar-goodbye.png', text: "See you soon! 👋", prop: '👋' },
};

const POSE_KEYS = Object.keys(COMMENT_POSE_MAP);

export default function AvatarGuide({ hoverState }) {
  const [activePoseKey, setActivePoseKey] = useState('hi');
  const [currentPoseSrc, setCurrentPoseSrc] = useState(COMMENT_POSE_MAP.hi.src);
  const [nextPoseSrc, setNextPoseSrc] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const [speechText, setSpeechText] = useState(COMMENT_POSE_MAP.hi.text);
  const [activeProp, setActiveProp] = useState(COMMENT_POSE_MAP.hi.prop);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prevScrollY = useRef(0);
  const avatarRef = useRef(null);

  // Preload all 19 pose images on mount
  useEffect(() => {
    POSE_KEYS.forEach(key => {
      const img = new Image();
      img.src = COMMENT_POSE_MAP[key].src;
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

  // Section Observer for data-avatar-pose & scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - prevScrollY.current;
      if (Math.abs(scrollDelta) > 2) {
        setScrollDirection(scrollDelta > 0 ? 1 : -1);
      }
      prevScrollY.current = currentScrollY;

      // Bottom footer check
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= threshold) {
        triggerPoseChange('thanks');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = document.querySelectorAll('[data-avatar-pose]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          const poseKey = entry.target.dataset.avatarPose;
          if (poseKey && COMMENT_POSE_MAP[poseKey]) {
            triggerPoseChange(poseKey);
          }
        }
      });
    }, { threshold: [0.25, 0.5, 0.75] });

    sections.forEach(sec => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activePoseKey]);

  // Dual-Layer Crossfade Pose Switcher
  const triggerPoseChange = (newPoseKey) => {
    if (newPoseKey === activePoseKey || isCrossfading) return;
    const poseObj = COMMENT_POSE_MAP[newPoseKey];
    if (!poseObj) return;

    setNextPoseSrc(poseObj.src);
    setIsCrossfading(true);
    setActivePoseKey(newPoseKey);
    setSpeechText(poseObj.text);
    setActiveProp(poseObj.prop);

    setTimeout(() => {
      setCurrentPoseSrc(poseObj.src);
      setNextPoseSrc(null);
      setIsCrossfading(false);
    }, 500); // 500ms smooth crossfade
  };

  // Cursor micro-tracking
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

  // Contextual hover reactions mapping directly to comment poses
  useEffect(() => {
    if (hoverState) {
      if (hoverState.type === 'skill') {
        if (hoverState.name.toLowerCase().includes('java')) {
          triggerPoseChange('java');
        } else {
          triggerPoseChange('skills');
          setSpeechText(`Exploring ${hoverState.name} ⚡`);
        }
        return;
      }
      if (hoverState.type === 'project') {
        if (hoverState.id === 'chatbot') {
          triggerPoseChange('chatbot');
        } else if (hoverState.id === 'ecommerce') {
          triggerPoseChange('ecommerce');
        } else {
          triggerPoseChange('projects');
        }
        return;
      }
      if (hoverState.type === 'contact') {
        if (hoverState.id === 'github') {
          triggerPoseChange('github');
        } else if (hoverState.id === 'email') {
          triggerPoseChange('contact');
          setSpeechText("Drop me an email! 📧");
        } else if (hoverState.id === 'linkedin') {
          triggerPoseChange('contact');
          setSpeechText("Let's connect on LinkedIn! 🤝");
        }
        return;
      }
      if (hoverState.type === 'experience') {
        triggerPoseChange('learning');
        return;
      }
    } else {
      // Revert to current section pose if hover clears
      const currentObj = COMMENT_POSE_MAP[activePoseKey];
      if (currentObj) {
        setSpeechText(currentObj.text);
        setActiveProp(currentObj.prop);
      }
    }
  }, [hoverState]);

  let bodyRotation = scrollDirection * 1.5;
  if (isReducedMotion) bodyRotation = 0;

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
      {/* Speech Bubble */}
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

      {/* Main Avatar Frame */}
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
          transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px) rotate(${bodyRotation}deg)`,
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

        {/* Floating Prop Icon */}
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
              transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
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
                transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
