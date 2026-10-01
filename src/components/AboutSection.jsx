import React from 'react';
import ScrollReveal from './ScrollReveal';
import { AnimatedCounter, SpotlightCard } from './MicroInteractions';

const skillsByCategory = [
  { category: 'Languages', items: ['Java', 'Python', 'SQL'], symbol: '⚙' },
  { category: 'Frontend & Web', items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'], symbol: '◇' },
  { category: 'Databases', items: ['MySQL', 'DBMS', 'SQL Queries'], symbol: '⬡' },
  { category: 'Tools & IDEs', items: ['MySQL Workbench', 'VS Code', 'Eclipse'], symbol: '⚡' },
  { category: 'Version Control', items: ['Git', 'GitHub'], symbol: '✦' },
  { category: 'Soft Skills', items: ['Problem Solving', 'Communication', 'Teamwork', 'Resilience', 'Adaptability'], symbol: '★' },
];

export default function AboutSection() {
  return (
    <section id="about" data-avatar-pose="about" style={{ background: '#151515' }}>
      <div className="section-wrap">

        <div style={{ display: 'grid', gap: '60px', alignItems: 'start' }} className="about-grid">

          {/* Left: Summary & Education */}
          <div>
            <ScrollReveal animation="fade-down">
              <p className="section-label">About Me</p>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', color: '#FFFFFF', marginBottom: '20px' }}>
                CS student building<br />
                <span className="underline-highlight">scalable &amp; efficient</span> solutions
              </h2>
            </ScrollReveal>
            
            {/* Exact Summary Quote / Paragraph */}
            <ScrollReveal animation="fade-up" delay={100}>
              <SpotlightCard>
                <div style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#CCCCCC', lineHeight: 1.85, margin: 0 }}>
                    "Computer Science Engineering graduate (2026) with hands-on experience in Java, Python, SQL, and web development. Strong foundation in Object-Oriented Programming (OOP), with practical experience building responsive applications using HTML5, CSS3, JavaScript, and MySQL. Experienced with Git/GitHub, problem solving, debugging, and software development through academic projects and internships. Seeking an entry-level Software Developer or Java Developer role to apply technical skills and grow as a software professional."
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Quick Stats */}
            <ScrollReveal animation="zoom-in" delay={200}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }} className="about-stats-grid">
                {[
                  { num: 7.7, dec: 1, label: 'CGPA', sub: 'Jaya Engg College' },
                  { num: 2, dec: 0, label: 'Internships', sub: 'Web & Full Stack' },
                  { num: 3, dec: 0, label: 'Projects', sub: 'Python, Java & Web' },
                ].map(s => (
                  <SpotlightCard key={s.label}>
                    <div className="sage-card hover-lift" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', textAlign: 'center', padding: '20px 12px' }}>
                      <p style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '26px', color: '#F59E0B', lineHeight: 1 }}>
                        <AnimatedCounter end={s.num} decimals={s.dec} />
                      </p>
                      <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '13px', color: '#CCCCCC', marginTop: '4px' }}>{s.label}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666666', marginTop: '2px' }}>{s.sub}</p>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </ScrollReveal>

            {/* Education Card */}
            <ScrollReveal animation="fade-up" delay={300}>
              <SpotlightCard>
                <div className="sage-card hover-lift" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderLeft: '3px solid #F59E0B' }}>
                  <p className="section-label" style={{ marginBottom: '8px' }}>Education</p>
                  <h4 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '17px', color: '#FFFFFF', marginBottom: '4px' }}>
                    B.E. Computer Science Engineering
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: '#CCCCCC' }}>
                    Jaya Engineering College (2022–2026)
                  </p>
                  <div style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '6px 14px' }}>
                    <span style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '18px', color: '#F59E0B' }}>
                      <AnimatedCounter end={7.7} decimals={1} />
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#F59E0B' }}>CGPA</span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Right: Categorized Technical Skills */}
          <div>
            <ScrollReveal animation="fade-down">
              <p className="section-label" style={{ marginBottom: '12px' }}>Technical Stack</p>
              <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '24px', color: '#FFFFFF', marginBottom: '24px' }}>
                Skills Organized by Category
              </h3>
            </ScrollReveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {skillsByCategory.map((sk, idx) => (
                <ScrollReveal key={sk.category} animation="fade-up" delay={100 * (idx + 1)}>
                  <SpotlightCard>
                    <div className="sage-card hover-lift" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '14px', color: '#F59E0B' }}>{sk.symbol}</span>
                          <h4 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '15px', color: '#FFFFFF' }}>{sk.category}</h4>
                        </div>
                        <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
                        {sk.items.map(item => (
                          <span key={item} className="pill-mono-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .about-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
