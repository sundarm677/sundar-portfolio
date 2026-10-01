import React from 'react';
import { ArrowRight } from 'lucide-react';
import IDBadge3D from './IDBadge3D';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import TypewriterRole from './TypewriterRole';
import Hero3DSphere from './Hero3DSphere';
import InteractiveHeadline from './InteractiveHeadline';
import AnimatedCounter from './AnimatedCounter';

const techStack = ['Java', 'Python', 'SQL', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Git & GitHub', 'Eclipse', 'VS Code'];

export default function Hero({ onOpenResume }) {
  return (
    <>
      {/* ── Hero Section ───────────────────────────────────── */}
      <section id="hero" data-avatar-pose="hero" style={{ paddingTop: '110px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '60px', alignItems: 'center' }} className="hero-grid">

            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="hero-left-col">

              {/* Pill Tag with Live Typewriter Effect */}
              <div className="pill-mono-tag" style={{ width: 'fit-content', color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.08)' }}>
                <span className="animate-pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0, display: 'inline-block' }} />
                <TypewriterRole />
              </div>

              {/* Interactive JS Scramble Headline */}
              <InteractiveHeadline />

              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(15px, 1.8vw, 17px)', fontWeight: '400', color: '#CCCCCC', maxWidth: '580px', lineHeight: 1.75 }}>
                Computer Science Engineering graduate (2026) with hands-on experience in Java, Python, SQL, and web development. Strong foundation in Object-Oriented Programming (OOP), with practical experience building responsive applications using HTML5, CSS3, JavaScript, and MySQL. Experienced with Git/GitHub, problem solving, debugging, and software development through academic projects and internships. Seeking an entry-level Software Developer or Java Developer role to apply technical skills and grow as a software professional.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }} className="hero-cta-group">
                <a href="#work" className="btn-amber">
                  View Projects <ArrowRight size={14} />
                </a>
                <a href="#contact" className="btn-ghost">
                  Contact Me
                </a>
                <button onClick={onOpenResume} className="btn-filled">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  Resume
                </button>
              </div>

              {/* Social + Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }} className="hero-social-group">
                <a
                  href="https://github.com/sundarm677"
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#999999', transition: 'color 0.2s', minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={e => e.currentTarget.style.color = '#999999'}
                >
                  <GithubIcon style={{ width: '20px', height: '20px', display: 'block' }} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sundar-2k5"
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: '#999999', transition: 'color 0.2s', minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={e => e.currentTarget.style.color = '#999999'}
                >
                  <LinkedinIcon style={{ width: '20px', height: '20px', display: 'block' }} />
                </a>
                <span style={{ width: '1px', height: '18px', background: 'rgba(255, 255, 255, 0.12)' }} />
                <a href="mailto:msundar677@gmail.com" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '500', color: '#999999', textDecoration: 'none', transition: 'color 0.2s', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F59E0B'}
                  onMouseLeave={e => e.currentTarget.style.color = '#999999'}
                >
                  msundar677@gmail.com
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — Dedicated Stage */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', gap: '20px' }} className="hero-right">

              {/* Floating Stat Card 1 — 3 — Major Projects Built */}
              <div
                className="sage-card animate-float hero-stat-card-1"
                style={{ position: 'absolute', top: '-16px', right: '-10px', width: '220px', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', zIndex: 10, background: 'rgba(18, 18, 18, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sora)', fontWeight: '800', fontSize: '22px', color: '#F59E0B', lineHeight: 1 }}>
                    <AnimatedCounter target={3} suffix="" decimals={0} />
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: '500', color: '#999999', marginTop: '3px' }}>Major Projects Built</p>
                </div>
              </div>

              {/* ID Badge Stage */}
              <div className="avatar-stage" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <IDBadge3D />
              </div>

              {/* Floating Stat Card 2 — 2 — Internships Completed */}
              <div
                className="sage-card animate-float2 hero-stat-card-2"
                style={{ position: 'absolute', bottom: '40px', left: '-20px', width: '220px', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', zIndex: 10, background: 'rgba(18, 18, 18, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 1 0 7.75"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-sora)', fontWeight: '800', fontSize: '22px', color: '#F59E0B', lineHeight: 1 }}>
                    <AnimatedCounter target={2} suffix="" decimals={0} />
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', fontWeight: '500', color: '#999999', marginTop: '3px' }}>Internships Completed</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Interactive 3D Sphere Canvas Feature */}
        <Hero3DSphere />
      </section>

      {/* ── Tech Stack Marquee ─────────────────────────────── */}
      <div className="marquee-wrap" style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', padding: '16px 0', overflow: 'hidden' }}>
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999999', whiteSpace: 'nowrap', padding: '0 24px' }}>
                {tech}
                <span style={{ color: '#00E5FF' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop (≥1024px) */
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.05fr 0.95fr !important; gap: 60px !important; }
          .hero-left-col { text-align: left; align-items: flex-start !important; }
          .hero-cta-group { flex-direction: row !important; width: auto !important; }
          .hero-cta-group a, .hero-cta-group button { width: auto !important; justify-content: center; }
          .hero-social-group { justify-content: flex-start !important; }
          .hero-right { padding-top: 20px; order: 0 !important; }
          .hero-stat-card-1 { position: absolute !important; top: -20px !important; right: -25px !important; width: 220px !important; }
          .hero-stat-card-2 { position: absolute !important; bottom: 25px !important; left: -30px !important; width: 220px !important; }
        }

        /* Tablet (768px – 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .hero-left-col { text-align: left; align-items: flex-start !important; }
          .hero-cta-group { flex-direction: row !important; flex-wrap: wrap !important; }
          .hero-stat-card-1 { position: absolute !important; top: -20px !important; right: -5px !important; width: 200px !important; transform: scale(0.95); }
          .hero-stat-card-2 { position: absolute !important; bottom: 20px !important; left: -10px !important; width: 200px !important; }
        }

        /* Mobile (≤767px) */
        @media (max-width: 767px) {
          #hero { padding-top: 84px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-left-col { text-align: center; align-items: center !important; }
          .pill-mono-tag { margin: 0 auto; }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .hero-cta-group a, .hero-cta-group button {
            width: 100% !important;
            justify-content: center !important;
            min-height: 44px !important;
            padding: 12px 20px !important;
          }
          .hero-social-group { justify-content: center !important; width: 100% !important; }
          .hero-right { order: 1 !important; width: 100% !important; gap: 16px !important; position: relative !important; margin-top: 12px; }
          .hero-stat-card-1, .hero-stat-card-2 {
            position: static !important;
            width: 100% !important;
            max-width: 290px !important;
            margin: 0 auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
