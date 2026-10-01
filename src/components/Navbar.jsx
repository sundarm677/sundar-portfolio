import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenResume }) {
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'Work',           href: '#work' },
    { name: 'About',          href: '#about' },
    { name: 'Skills',         href: '#skills' },
    { name: 'Experience',     href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact',        href: '#contact' },
  ];

  return (
    <header className="navbar">
      <div className="container nav-inner">

        {/* Logo: Sundar.dev */}
        <a
          href="#hero"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <div className="nav-logo-box" style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-oxanium)', fontWeight: '800', fontSize: '18px', color: '#1A0F00', boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>S</div>
          <span className="nav-logo-text" style={{ fontFamily: 'var(--font-sora)', fontWeight: '800', fontSize: '19px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Sundar<span style={{ color: '#F59E0B' }}>.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '999px', padding: '6px 10px', backdropFilter: 'blur(12px)' }} className="desktop-nav">
          {links.map(l => (
            <a
              key={l.name}
              href={l.href}
              style={{ fontFamily: 'var(--font-inter)', fontWeight: '500', fontSize: '13px', color: '#CCCCCC', padding: '7px 16px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.target.style.color = '#F59E0B'; e.target.style.background = 'rgba(245,158,11,0.12)'; }}
              onMouseLeave={e => { e.target.style.color = '#CCCCCC'; e.target.style.background = 'transparent'; }}
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Phone + Resume Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="tel:+919360346758" style={{ fontFamily: 'var(--font-mono)', fontWeight: '500', fontSize: '12px', color: '#999999', textDecoration: 'none', display: 'none', letterSpacing: '0.04em' }} className="phone-link">
            +91-9360346758
          </a>

          <button onClick={onOpenResume} className="btn-amber nav-resume-btn" style={{ padding: '9px 18px', fontSize: '13px', minHeight: '40px' }}>
            Resume <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', width: '44px', height: '44px', color: '#FFFFFF', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div style={{ background: '#121212', borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px 24px', position: 'relative', zIndex: 60 }}>
          {links.map(l => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', minHeight: '48px', fontFamily: 'var(--font-inter)', fontWeight: '500', fontSize: '15px', color: '#FFFFFF', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
            >
              {l.name} <ArrowRight size={16} color="#F59E0B" />
            </a>
          ))}
          <a href="tel:+919360346758" style={{ display: 'flex', alignItems: 'center', minHeight: '48px', marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#CCCCCC', textDecoration: 'none' }}>
            +91-9360346758
          </a>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(8, 8, 8, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .nav-inner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .phone-link  { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-inner { height: 64px; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .nav-inner {
            padding: 0 14px !important;
          }
          .nav-logo-text {
            font-size: 16px !important;
          }
          .nav-resume-btn {
            padding: 7px 14px !important;
            font-size: 12px !important;
            min-height: 36px !important;
          }
          .mobile-menu-btn {
            width: 38px !important;
            height: 38px !important;
          }
        }
        @media (max-width: 360px) {
          .nav-logo-box {
            width: 28px !important;
            height: 28px !important;
            font-size: 15px !important;
          }
          .nav-logo-text {
            font-size: 15px !important;
          }
          .nav-resume-btn span {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
