import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatingScrollNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
      }}
      className="floating-scroll-nav"
    >
      {/* Connecting Vertical Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '1px',
          background: '#2A2A2A',
          zIndex: 0,
        }}
      />

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            title={sec.label}
            style={{
              position: 'relative',
              zIndex: 1,
              width: isActive ? '12px' : '8px',
              height: isActive ? '12px' : '8px',
              borderRadius: '50%',
              backgroundColor: isActive ? '#F59E0B' : '#444444',
              boxShadow: isActive ? '0 0 10px #F59E0B' : 'none',
              transition: 'all 0.3s ease',
              display: 'block',
            }}
          />
        );
      })}

      <style>{`
        @media (max-width: 900px) {
          .floating-scroll-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
