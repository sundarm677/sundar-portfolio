import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import SkillMeterSection from './components/SkillMeterSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';
import ScrollProgress from './components/ScrollProgress';
import ParticleCirculationCanvas from './components/ParticleCirculationCanvas';
import CustomCursor from './components/CustomCursor';
import FloatingScrollNav from './components/FloatingScrollNav';
import ScrollParallaxMarquee from './components/ScrollParallaxMarquee';
import SmoothLoader from './components/SmoothLoader';
import AvatarGuide from './components/AvatarGuide';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarHoverState, setAvatarHoverState] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', position: 'relative' }}>
      {/* Smooth Initial Page Preloader */}
      {isLoading && <SmoothLoader onComplete={() => setIsLoading(false)} />}

      {/* Custom Fluid Trailing Mouse Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Section Progress Scroll Indicator (Right Edge) */}
      <FloatingScrollNav />

      {/* Interactive 3D Avatar Companion Guide (Bottom Left) */}
      <AvatarGuide hoverState={avatarHoverState} />

      {/* Pure Particle Circulation Canvas Background */}
      <ParticleCirculationCanvas />

      {/* Main Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Page Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* Scroll Velocity Parallax Kinetic Text Marquee */}
        <ScrollParallaxMarquee text="SOFTWARE DEVELOPER · JAVA DEVELOPER · CORE JAVA · PYTHON · SQL · MYSQL ·" direction={1} />

        <WorkSection onProjectHover={(project) => setAvatarHoverState({ type: 'project', ...project })} onProjectLeave={() => setAvatarHoverState(null)} />
        <AboutSection />
        <SkillMeterSection onSkillHover={(skill) => setAvatarHoverState({ type: 'skill', name: skill })} onSkillLeave={() => setAvatarHoverState(null)} />

        {/* Reverse Parallax Kinetic Text Marquee */}
        <ScrollParallaxMarquee text="HTML5 & CSS3 · JAVASCRIPT · RESPONSIVE WEB DESIGN · OOP ARCHITECTURE · GIT & GITHUB ·" direction={-1} />

        <ExperienceSection onExperienceHover={(exp) => setAvatarHoverState({ type: 'experience', ...exp })} onExperienceLeave={() => setAvatarHoverState(null)} />
        <CertificationsSection />
        <ContactSection onOpenResume={() => setResumeOpen(true)} onContactHover={(item) => setAvatarHoverState({ type: 'contact', id: item })} onContactLeave={() => setAvatarHoverState(null)} />
      </main>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

