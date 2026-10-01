import React from 'react';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { SpotlightCard, AnimatedCounter } from './MicroInteractions';

const skillMeters = [
  { name: 'Core Java & OOP Architecture', level: 92 },
  { name: 'Python & NLP Chatbot Dev', level: 88 },
  { name: 'MySQL & Relational Databases', level: 86 },
  { name: 'HTML5, CSS3 & JavaScript', level: 90 },
  { name: 'Responsive Web Design', level: 94 },
  { name: 'Git, GitHub & Version Control', level: 85 },
];

export default function SkillMeterSection({ onSkillHover, onSkillLeave }) {
  return (
    <section id="skills" data-avatar-pose="skills" style={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
      <div className="section-wrap">
        <ScrollReveal animation="fade-down">
          <p className="section-label">Engineering Metrics</p>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', color: '#FFFFFF', marginBottom: '40px' }}>
            Proficiency &amp; Core Strengths
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {skillMeters.map((item, idx) => (
            <ScrollReveal key={item.name} animation="zoom-in" delay={80 * (idx + 1)}>
              <Card3D>
                <SpotlightCard>
                  <div
                    className="hover-lift"
                    onMouseEnter={() => onSkillHover && onSkillHover(item.name)}
                    onMouseLeave={() => onSkillLeave && onSkillLeave()}
                    style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '16px', padding: '20px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '15px', color: '#FFFFFF' }}>{item.name}</span>
                      <span style={{ fontFamily: 'Inter', fontWeight: '800', fontSize: '14px', color: '#F59E0B' }}>
                        <AnimatedCounter end={item.level} suffix="%" />
                      </span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: '#151515', borderRadius: '999px', border: '1px solid #2A2A2A', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.level}%`,
                          background: 'linear-gradient(90deg, #D97706, #F59E0B)',
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
    </section>
  );
}
