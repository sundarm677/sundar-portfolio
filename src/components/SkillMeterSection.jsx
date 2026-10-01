import React from 'react';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { SpotlightCard, AnimatedCounter } from './MicroInteractions';

const skillMeters = [
  { name: 'Core Java & OOP Architecture', level: 92, icon: '☕' },
  { name: 'Python & NLP Chatbot Dev', level: 88, icon: '🤖' },
  { name: 'MySQL & Relational Databases', level: 86, icon: '⬡' },
  { name: 'HTML5, CSS3 & JavaScript', level: 90, icon: '◇' },
  { name: 'Responsive Web Design', level: 94, icon: '📱' },
  { name: 'Git, GitHub & Version Control', level: 85, icon: '🐙' },
];

export default function SkillMeterSection({ onSkillHover, onSkillLeave }) {
  return (
    <section id="skills" data-avatar-pose="skills" style={{ background: '#080808', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <ScrollReveal animation="fade-down">
          <p className="section-label">Engineering Metrics</p>
          <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: '#FFFFFF', marginBottom: '40px', fontFamily: 'var(--font-sora)' }}>
            Proficiency &amp; Core Strengths
          </h2>
        </ScrollReveal>

        <div className="skills-grid">
          {skillMeters.map((item, idx) => (
            <ScrollReveal key={item.name} animation="zoom-in" delay={80 * (idx + 1)}>
              <Card3D>
                <SpotlightCard>
                  <div
                    className="hover-lift skill-card-inner"
                    onMouseEnter={() => onSkillHover && onSkillHover(item.name)}
                    onMouseLeave={() => onSkillLeave && onSkillLeave()}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '24px',
                      minHeight: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', fontSize: '15px', color: '#F59E0B' }}>
                          <AnimatedCounter end={item.level} suffix="%" />
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-sora)', fontWeight: '700', fontSize: '15px', color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.4 }}>
                        {item.name}
                      </h4>
                    </div>

                    <div style={{ height: '6px', width: '100%', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.level}%`,
                          background: 'linear-gradient(90deg, #00E5FF, #F59E0B)',
                          borderRadius: '999px',
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (min-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
