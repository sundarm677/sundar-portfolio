import React, { useState } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';

const certs = [
  {
    id: 'java-oop',
    title: 'Object-Oriented Programming (Java)',
    issuer: 'Academic Coursework — Jaya Engineering College',
    year: '2024–2025',
    desc: 'Comprehensive study of Core Java, OOP principles (Abstraction, Encapsulation, Inheritance, Polymorphism), Java Collections Framework, and custom exception handling.',
    skills: ['Java', 'OOP', 'Collections Framework', 'Exception Handling'],
    symbol: '☕',
    credentialId: 'CS-JAVA-OOP',
    modules: ['Core Java Fundamentals', 'OOP Principles', 'Collections Framework', 'Custom Exception Handling']
  },
  {
    id: 'dbms',
    title: 'Database Management Systems (DBMS)',
    issuer: 'Academic Coursework — Jaya Engineering College',
    year: '2024–2025',
    desc: 'Relational database architecture, ER modeling, normalization, complex SQL querying, joins, indexing, and MySQL database management.',
    skills: ['MySQL', 'DBMS', 'SQL Queries', 'Database Design'],
    symbol: '⬡',
    credentialId: 'CS-DBMS-SQL',
    modules: ['Relational Database Model', 'Complex SQL Queries & Joins', 'Database Normalization', 'MySQL Workbench']
  },
  {
    id: 'ds',
    title: 'Data Structures & Algorithms',
    issuer: 'Academic Coursework — Jaya Engineering College',
    year: '2024–2025',
    desc: 'Core data structures implementation including Arrays, Linked Lists, Stacks, Queues, HashTables, Trees, and algorithmic problem-solving techniques.',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving'],
    symbol: '⚡',
    credentialId: 'CS-DS-ALG',
    modules: ['Arrays & Linked Lists', 'Stacks & Queues', 'HashMaps & Trees', 'Sorting & Searching']
  },
  {
    id: 'web-tech',
    title: 'Web Technologies & Software Engineering',
    issuer: 'Academic Coursework — Jaya Engineering College',
    year: '2025',
    desc: 'Modern web development fundamentals, HTML5/CSS3 semantic architecture, client-side scripting, and software engineering lifecycle methodologies.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Software Engineering'],
    symbol: '◇',
    credentialId: 'CS-WEB-SE',
    modules: ['HTML5 & CSS3 Standards', 'DOM Manipulation', 'Software Architecture', 'Agile & SDLC']
  },
];

export default function CertificationsSection() {
  const [flippedMap, setFlippedMap] = useState({});

  const toggleFlip = (id) => {
    setFlippedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="certifications" data-avatar-pose="education" style={{ background: '#080808', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <p className="section-label">Academic Foundations</p>
        <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: '#FFFFFF', marginBottom: '12px', fontFamily: 'var(--font-sora)' }}>Relevant Coursework</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#999999', marginBottom: '40px' }}>
          ✦ Click any coursework card to flip it and view module details &amp; course topics.
        </p>

        <div style={{ display: 'grid', gap: '24px' }} className="cert-grid">
          {certs.map((cert) => {
            const isFlipped = !!flippedMap[cert.id];
            return (
              <div
                key={cert.id}
                className="perspective-1000"
                style={{ minHeight: '260px', height: '100%', cursor: 'pointer' }}
                onClick={() => toggleFlip(cert.id)}
              >
                <div
                  className="transform-3d"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="sage-card backface-hidden"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '24px',
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#F59E0B', flexShrink: 0 }}>
                      {cert.symbol}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                        <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: '700', fontSize: '17px', color: '#FFFFFF' }}>{cert.title}</h3>
                        <span className="pill-badge" style={{ background: '#F59E0B', color: '#1A0F00', fontWeight: '800' }}>✓ VERIFIED</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: '500', color: '#CCCCCC', marginBottom: '6px' }}>
                        {cert.issuer} ({cert.year})
                      </p>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#999999', lineHeight: 1.6, marginBottom: '14px' }}>{cert.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {cert.skills.map(s => <span key={s} className="pill-mono-tag">✓ {s}</span>)}
                      </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', fontFamily: 'var(--font-mono)' }}>
                      <RefreshCw size={10} /> Flip Card
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="sage-card backface-hidden rotate-y-180"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#121212',
                      border: '1px solid #F59E0B',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '700', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Credential Modules // {cert.title}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999' }}>ID: {cert.credentialId}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                        {cert.modules.map((mod, idx) => (
                          <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#CCCCCC', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-inter)' }}>
                            <CheckCircle size={12} color="#F59E0B" /> {mod}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '11px', color: '#666666' }}>Issued by {cert.issuer} ({cert.year})</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                        <RefreshCw size={10} /> Flip Back
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .cert-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
