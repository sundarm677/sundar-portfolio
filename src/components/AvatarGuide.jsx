import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code2, Laptop, GraduationCap, Mail, Send, Terminal, ShoppingCart, MessageSquare, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function AvatarGuide({ hoverState, activeSectionOverride }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [speechText, setSpeechText] = useState("Hi, I'm Sundar 👋");
  const [isWaving, setIsWaving] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0); // -1 up, 1 down
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const prevScrollY = useRef(0);
  const animationFrameRef = useRef(null);
  const avatarRef = useRef(null);

  // Check reduced motion & mobile viewport
  useEffect(() => {
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

  // Section Observer & Bottom Scroll Observer
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'work', 'experience', 'certifications', 'contact'];
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - prevScrollY.current;
      
      if (Math.abs(scrollDelta) > 2) {
        setScrollDirection(scrollDelta > 0 ? 1 : -1);
      }
      prevScrollY.current = currentScrollY;

      // Check footer bottom
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 120;
      if (scrollPosition >= threshold) {
        setActiveSection('footer');
        return;
      }

      // Check section in view
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor micro-tracking (Desktop only)
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - avatarCenterX) / window.innerWidth;
      const deltaY = (e.clientY - avatarCenterY) / window.innerHeight;

      // Max 5px translation, max 2deg tilt
      setCursorOffset({
        x: Math.max(-5, Math.min(5, deltaX * 25)),
        y: Math.max(-5, Math.min(5, deltaY * 25)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isReducedMotion]);

  // Handle active section speech & pose state
  useEffect(() => {
    // Override if hover state active
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
        else if (hoverState.id === 'besant') setSpeechText("Besant Tech — Full-Stack Training");
        return;
      }
    }

    // Default section messages
    switch (activeSectionOverride || activeSection) {
      case 'hero':
        setSpeechText("Hi, I'm Sundar 👋");
        setIsWaving(true);
        break;
      case 'about':
        setSpeechText("A little about me...");
        setIsWaving(false);
        break;
      case 'skills':
        setSpeechText("These are my tools 🚀");
        setIsWaving(false);
        break;
      case 'work':
        setSpeechText("Check out what I've built →");
        setIsWaving(false);
        break;
      case 'experience':
        setSpeechText("Learning by building.");
        setIsWaving(false);
        break;
      case 'certifications':
        setSpeechText("Always learning something new.");
        setIsWaving(false);
        break;
      case 'contact':
        setSpeechText("Let's build something together! 👋");
        setIsWaving(true);
        break;
      case 'footer':
        setSpeechText("Thanks for visiting! 🚀");
        setIsWaving(true);
        break;
      default:
        setSpeechText("Hi, I'm Sundar 👋");
        setIsWaving(false);
    }
  }, [activeSection, hoverState, activeSectionOverride]);

  // Compute dynamic transform styles based on section & scroll direction
  const currentSectionKey = activeSectionOverride || activeSection;

  let bodyRotation = scrollDirection * 1.5; // ±1.5° tilt on scroll
  if (isReducedMotion) bodyRotation = 0;

  let poseTransform = '';
  switch (currentSectionKey) {
    case 'hero':
      poseTransform = 'translateY(0px) rotate(0deg) scale(1)';
      break;
    case 'about':
      poseTransform = 'rotate(-2deg) scale(1.02) translateY(-2px)'; // Thinking posture tilt
      break;
    case 'skills':
      poseTransform = 'rotate(1.5deg) scale(1.03) translateY(-3px)'; // Developer posture
      break;
    case 'work':
      poseTransform = 'rotate(-1.5deg) scale(1.04) translateY(-2px)'; // Presentation posture
      break;
    case 'experience':
      poseTransform = 'rotate(1deg) scale(1.02) translateY(-1px)'; // Professional posture
      break;
    case 'certifications':
      poseTransform = 'rotate(-1deg) scale(1.01) translateY(-2px)'; // Learning posture
      break;
    case 'contact':
      poseTransform = 'rotate(2deg) scale(1.05) translateY(-4px)'; // Inviting posture
      break;
    case 'footer':
      poseTransform = 'translateY(-8px) scale(1.08) rotate(0deg)'; // Celebration bounce
      break;
    default:
      poseTransform = 'none';
  }

  // Floating skill badges for Skills Section
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
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease',
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
          maxWidth: '230px',
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

        {/* Pointer Arrow */}
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

      {/* Main Avatar Character Wrapper */}
      <div
        className="avatar-character-frame"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: isMobile ? '100px' : '135px',
          height: isMobile ? '115px' : '150px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px) rotate(${bodyRotation}deg) ${poseTransform}`,
          transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Floating Contextual Badges (Skills Section) */}
        {currentSectionKey === 'skills' && (
          <div
            style={{
              position: 'absolute',
              top: '-35px',
              left: '0px',
              right: '0px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              zIndex: 3,
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
                  opacity: 0.95,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Floating Icon Badges per section */}
        <div style={{ position: 'absolute', top: '10px', right: '-10px', zIndex: 4 }}>
          {currentSectionKey === 'hero' && (
            <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%', boxShadow: '0 0 12px rgba(245,158,11,0.5)' }}>
              👋
            </div>
          )}
          {currentSectionKey === 'about' && (
            <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}>
              💡
            </div>
          )}
          {currentSectionKey === 'skills' && (
            <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}>
              <Laptop size={14} />
            </div>
          )}
          {currentSectionKey === 'work' && (
            <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}>
              <Code2 size={14} />
            </div>
          )}
          {currentSectionKey === 'experience' && (
            <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}>
              <Award size={14} />
            </div>
          )}
          {currentSectionKey === 'certifications' && (
            <div className="floating-prop-icon" style={{ background: '#1E1E1E', border: '1px solid #F59E0B', color: '#F59E0B', padding: '6px', borderRadius: '50%' }}>
              <GraduationCap size={14} />
            </div>
          )}
          {currentSectionKey === 'contact' && (
            <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}>
              <Send size={14} />
            </div>
          )}
          {currentSectionKey === 'footer' && (
            <div className="floating-prop-icon" style={{ background: '#F59E0B', color: '#1A0F00', padding: '6px', borderRadius: '50%' }}>
              🎉
            </div>
          )}
        </div>

        {/* Glowing Base Aura Ring */}
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

        {/* 3D Rendered Avatar Image */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            filter: isHovered ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.6))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
            transition: 'filter 0.3s ease',
          }}
        >
          <img
            src="/sundar_3d_avatar.png"
            alt="Sundar 3D Avatar Companion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              animation: isReducedMotion ? 'none' : 'avatarIdleFloat 4s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}
