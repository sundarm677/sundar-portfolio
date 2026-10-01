import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Laptop, GraduationCap, Send, Award } from 'lucide-react';

const POSE_MAP = {
  hero: '/avatar-hero.png',
  about: '/avatar-about.png',
  skills: '/avatar-skills.png',
  projects: '/avatar-projects.png',
  experience: '/avatar-experience.png',
  education: '/avatar-education.png',
  contact: '/avatar-contact.png',
  thanks: '/avatar-thanks.png',
};

const POSE_LIST = Object.keys(POSE_MAP);

export default function AvatarGuide({ hoverState }) {
  const [activePoseKey, setActivePoseKey] = useState('hero');
  const [currentPoseSrc, setCurrentPoseSrc] = useState(POSE_MAP.hero);
  const [nextPoseSrc, setNextPoseSrc] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const [speechText, setSpeechText] = useState("Hi, I'm Sundar 👋");
  const [scrollDirection, setScrollDirection] = useState(0);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prevScrollY = useRef(0);
  const avatarRef = useRef(null);

  // Preload all 8 avatar pose images on mount
  useEffect(() => {
    POSE_LIST.forEach(poseKey => {
      const img = new Image();
      img.src = POSE_MAP[poseKey];
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

  // IntersectionObserver for section detection (data-avatar-pose)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - prevScrollY.current;
      if (Math.abs(scrollDelta) > 2) {
        setScrollDirection(scrollDelta > 0 ? 1 : -1);
      }
      prevScrollY.current = currentScrollY;

      // Check footer bottom position
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= threshold) {
        triggerPoseChange('thanks');
        return;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observer setup for data-avatar-pose sections
    const sections = document.querySelectorAll('[data-avatar-pose]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          const poseKey = entry.target.dataset.avatarPose;
          if (poseKey && POSE_MAP[poseKey]) {
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

  // Trigger pose change with smooth dual-layer crossfade
  const triggerPoseChange = (newPoseKey) => {
    if (newPoseKey === activePoseKey || isCrossfading) return;

    const targetSrc = POSE_MAP[newPoseKey];
    setNextPoseSrc(targetSrc);
    setIsCrossfading(true);
    setActivePoseKey(newPoseKey);

    setTimeout(() => {
      setCurrentPoseSrc(targetSrc);
      setNextPoseSrc(null);
      setIsCrossfading(false);
    }, 550); // 550ms crossfade duration
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

  // Contextual speech bubble text updates
  useEffect(() => {
    if (hoverState) {
      if (hoverState.type === 'skill') {
        setSpeechText(`Exploring ${hoverState.name} ⚡`);
        return;
      }
      if (hoverState.type === 'project') {
        if (hoverState.id === 'chatbot') {
          setSpeechText("Let's chat 🤖");
        } else if (hoverState.id === 'ecommerce') {
          setSpeechText("Built with HTML, CSS & JS.");
        } else {
          setSpeechText(`Check out ${hoverState.title || 'this project'} ✦`);
        }
        return;
      }
      if (hoverState.type === 'contact') {
        if (hoverState.id === 'email') setSpeechText("Drop me an email! 📧");
        else if (hoverState.id === 'linkedin') setSpeechText("Let's connect on LinkedIn! 🤝");
        else if (hoverState.id === 'github') setSpeechText("Check out my GitHub repos! 💻");
        return;
      }
      if (hoverState.type === 'experience') {
        if (hoverState.id === 'thinkbright') setSpeechText("Think Bright EdTech — Web Dev");
        else if (hoverState.id === 'besant') setSpeechText("Besant Tech — Full Stack");
        return;
      }
    }

    switch (activePoseKey) {
      case 'hero':
        setSpeechText("Hi, I'm Sundar 👋");
        break;
      case 'about':
        setSpeechText("A little about me...");
        break;
      case 'skills':
        setSpeechText("These are my tools 🚀");
        break;
      case 'projects':
        setSpeechText("Check out what I've built →");
        break;
      case 'experience':
        setSpeechText("Learning by building.");
        break;
      case 'education':
        setSpeechText("Always learning something new 🎓");
        break;
      case 'contact':
        setSpeechText("Let's build something together! 👋");
        break;
      case 'thanks':
        setSpeechText("Thanks for visiting! 🚀");
        break;
      default:
        setSpeechText("Hi, I'm Sundar 👋");
    }
  }, [activePoseKey, hoverState]);

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
      {/* Glossy Speech Bubble */}
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

      {/* Main Multi-Pose Dual-Layer Avatar Stage */}
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
        {/* Floating Skill Badges (Skills Section) */}
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

        {/* Section Prop Badge Icon */}
        <div style={{ position: 'absolute', top: '6px', right: '-8px', zIndex: 11 }}>
          {activePoseKey === 'hero' && <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}>👋</div>}
          {activePoseKey === 'about' && <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}>💡</div>}
          {activePoseKey === 'skills' && <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}><Laptop size={13} /></div>}
          {activePoseKey === 'projects' && <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}><Code2 size={13} /></div>}
          {activePoseKey === 'experience' && <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}><Award size={13} /></div>}
          {activePoseKey === 'education' && <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}><GraduationCap size={13} /></div>}
          {activePoseKey === 'contact' && <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}><Send size={13} /></div>}
          {activePoseKey === 'thanks' && <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}>🎉</div>}
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

        {/* Dual-Layer Crossfading Stage */}
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
            alt="Sundar Avatar Pose Current"
            className={`avatar-pose-img pose-${activePoseKey}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: isCrossfading ? 0 : 1,
              transform: isCrossfading ? 'translateY(-6px)' : 'translateY(0px)',
              transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
              animation: isReducedMotion ? 'none' : `idle-${activePoseKey} 4s ease-in-out infinite`,
            }}
          />

          {/* Next Pose Layer (Fades in during crossfade) */}
          {nextPoseSrc && (
            <img
              src={nextPoseSrc}
              alt="Sundar Avatar Pose Next"
              className="avatar-pose-img pose-incoming"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: isCrossfading ? 1 : 0,
                transform: isCrossfading ? 'translateY(0px)' : 'translateY(8px)',
                transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
