import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenResume }) {
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'Work',           href: '#work' },
    { name: 'About',          href: '#about' },
    { name: 'Experience',     href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact',        href: '#contact' },
  ];

  return (
    <header className="navbar">
      <div style={{ maxWidth: 'min(92vw, 1500px)', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo: Sundar.dev (with S container in #F59E0B and S letter in #1A0F00) */}
        <a
          href="#hero"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Sora', fontWeight: '800', fontSize: '16px', color: '#1A0F00' }}>S</div>
          <span style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>
            Sundar<span style={{ color: '#F59E0B' }}>.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#151515', border: '1px solid #2A2A2A', borderRadius: '999px', padding: '5px 8px' }} className="desktop-nav">
          {links.map(l => (
            <a
              key={l.name}
              href={l.href}
              style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: '13px', color: '#CCCCCC', padding: '6px 16px', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.target.style.color = '#F59E0B'; e.target.style.background = 'rgba(245,158,11,0.12)'; }}
              onMouseLeave={e => { e.target.style.color = '#CCCCCC'; e.target.style.background = 'transparent'; }}
            >
              {l.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Phone + Resume Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="tel:+919360346758" style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: '13px', color: '#999999', textDecoration: 'none', display: 'none' }} className="phone-link">
            +91-9360346758
          </a>

          <button onClick={onOpenResume} className="btn-white" style={{ padding: '9px 20px', fontSize: '13px', minHeight: '40px' }}>
            Resume <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: '10px', width: '44px', height: '44px', color: '#FFFFFF', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div style={{ background: '#151515', borderTop: '1px solid #2A2A2A', padding: '16px 24px', position: 'relative', zIndex: 60 }}>
          {links.map(l => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', minHeight: '48px', fontFamily: 'Inter', fontWeight: '500', fontSize: '15px', color: '#FFFFFF', textDecoration: 'none', borderBottom: '1px solid #2A2A2A' }}
            >
              {l.name} <ArrowRight size={16} color="#CCCCCC" />
            </a>
          ))}
          <a href="tel:+919360346758" style={{ display: 'flex', alignItems: 'center', minHeight: '48px', marginTop: '8px', fontFamily: 'Inter', fontSize: '14px', color: '#CCCCCC', textDecoration: 'none' }}>
            +91-9360346758
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .phone-link  { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
