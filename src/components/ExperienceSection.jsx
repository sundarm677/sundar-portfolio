import React from 'react';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'Web Development Intern',
    org: 'Think Bright EdTech',
    period: 'Jun 2025 – Jul 2025',
    badge: 'Responsive Web Focus',
    desc: 'Developed and maintained responsive web pages using HTML5, CSS3, and JavaScript, improving page usability and layout consistency.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'Layout Consistency'],
  },
  {
    role: 'Full Stack Development Intern',
    org: 'Besant Technologies',
    period: 'May – Sep 2026',
    badge: 'Full Stack & Database Integration',
    desc: 'Assisted in developing and integrating front-end and back-end modules for web applications, supporting end-to-end functionality; contributed to database-related tasks using SQL and MySQL.',
    skills: ['Java', 'SQL', 'MySQL', 'Full Stack Integration', 'End-to-End Development'],
  },
];

export default function ExperienceSection({ onExperienceHover, onExperienceLeave }) {
  return (
    <section id="experience" data-avatar-pose="experience">
      <div className="section-wrap">
        <ScrollReveal animation="fade-down">
          <p className="section-label">Career History</p>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', color: '#FFFFFF', marginBottom: '48px' }}>Work Experience &amp; Internships</h2>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experiences.map((exp, i) => {
            const expId = exp.org.includes('Think Bright') ? 'thinkbright' : 'besant';
            return (
              <ScrollReveal key={i} animation="fade-up" delay={150 * (i + 1)}>
                <div
                  className="surface-card"
                  style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderLeft: '3px solid #F59E0B', display: 'grid', gap: '32px', transition: 'transform 0.25s ease, border-color 0.25s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#F59E0B';
                    if (onExperienceHover) onExperienceHover({ id: expId, name: exp.org });
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#2A2A2A';
                    if (onExperienceLeave) onExperienceLeave();
                  }}
                >
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '32px', alignItems: 'start' }} className="exp-inner">
                  {/* Left: Org & Period */}
                  <div style={{ minWidth: '200px' }}>
                    <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '16px', color: '#FFFFFF', marginBottom: '4px' }}>{exp.org}</h3>
                    <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#666666', marginBottom: '8px' }}>{exp.period}</p>
                    <span className="pill-badge" style={{ background: '#F59E0B', color: '#1A0F00', fontWeight: '800' }}>{exp.badge}</span>
                  </div>

                  {/* Right: Role, Desc, Skills */}
                  <div>
                    <h4 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>{exp.role} — {exp.org}</h4>
                    <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#999999', lineHeight: 1.75, marginBottom: '16px' }}>{exp.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.skills.map(s => <span key={s} className="pill-mono-tag">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .exp-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
