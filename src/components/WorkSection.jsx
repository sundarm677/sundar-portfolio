import React, { useState } from 'react';
import { Play, X, ChevronRight, Filter } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { SpotlightCard } from './MicroInteractions';

const projects = [
  {
    id: 'chatbot',
    categoryKey: 'ai',
    category: 'PYTHON & NLP CHATBOT',
    year: 'May 2025 – Jun 2026',
    title: 'AI Chatbot for College Admission & Student Support',
    desc: 'Built a chatbot in Python to answer admission and campus-related questions using NLP for free-text queries, tested against real question phrasing from classmates to refine matching logic.',
    tags: ['Python', 'NLP', 'Natural Language Processing', 'Text Matching'],
    github: 'https://github.com/sundarm677',
    demo: null,
    metric: 'Free-text NLP Understanding',
  },
  {
    id: 'ecommerce',
    categoryKey: 'fullstack',
    category: 'FRONTEND & E-COMMERCE',
    year: 'Jun 2025 – Jul 2025',
    title: 'E-Commerce Application',
    desc: 'Developed responsive, user-friendly web pages with product listings, product details, and full shopping cart functionality using modern front-end development practices.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    github: 'https://github.com/sundarm677',
    demo: null,
    metric: 'Full Shopping Cart & Responsive UI',
  },
  {
    id: 'library',
    categoryKey: 'java',
    category: 'JAVA & OOP ARCHITECTURE',
    year: 'Jun 2026 – July 2026',
    title: 'Library Management System',
    desc: 'Console-based Java application managing book catalog and member checkouts using HashMap and ArrayList for fast lookups, with three custom exceptions so invalid input is handled gracefully without crashing.',
    tags: ['Java', 'OOP', 'HashMap & ArrayList', 'Custom Exceptions', 'Exception Handling'],
    github: 'https://github.com/sundarm677',
    demo: null,
    metric: 'Java HashMap & Custom Exceptions',
  },
];

export default function WorkSection({ onProjectHover, onProjectLeave }) {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [demoState, setDemoState] = useState({ query: '', response: null, loading: false, cartItems: 2, consoleLogs: [] });

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.categoryKey === filter);

  const handleSimulate = (id) => {
    if (id === 'chatbot') {
      setDemoState(prev => ({ ...prev, loading: true, response: null }));
      setTimeout(() => {
        setDemoState(prev => ({
          ...prev,
          loading: false,
          response: {
            intent: 'admission_query',
            confidence: '98.6%',
            answer: 'For B.E. Computer Science & Engineering admission, candidates need Higher Secondary completion with Physics, Chemistry & Mathematics. Application deadline is June 30.',
          }
        }));
      }, 1000);
    } else if (id === 'ecommerce') {
      setDemoState(prev => ({ ...prev, cartItems: prev.cartItems + 1 }));
    } else if (id === 'library') {
      setDemoState(prev => ({
        ...prev,
        consoleLogs: [
          '[JAVA_INIT] Loading HashMap catalog Persistence Store...',
          '[BOOK_ADDED] "Effective Java 3rd Ed" (ID: #BK-104)',
          '[USER_CHECKOUT] Member #M-882 checked out #BK-104',
          '[FILE_IO] Serialized state to data/catalog.db ✓'
        ]
      }));
    }
  };

  return (
    <section id="work">
      <div className="section-wrap">

        {/* Header */}
        <ScrollReveal animation="fade-down">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
            <div>
              <p className="section-label">Featured Projects</p>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#FFFFFF' }}>Projects &amp; Systems</h2>
            </div>
            <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '10px 20px', fontSize: '13px' }}>
              View All on GitHub <ChevronRight size={14} />
            </a>
          </div>
        </ScrollReveal>

        {/* JS Filter Bar */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666666', fontSize: '12px', fontWeight: '600', marginRight: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Filter size={12} /> Filter:
            </div>
            {[
              { key: 'all', label: 'All Projects (3)' },
              { key: 'java', label: 'Java & OOP' },
              { key: 'ai', label: 'Python & NLP' },
              { key: 'fullstack', label: 'Web & Frontend' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="btn-ghost"
                style={{
                  padding: '6px 16px',
                  fontSize: '12px',
                  background: filter === f.key ? '#F59E0B' : 'transparent',
                  color: filter === f.key ? '#1A0F00' : '#CCCCCC',
                  borderColor: filter === f.key ? '#F59E0B' : '#2A2A2A',
                  fontWeight: filter === f.key ? '700' : '500',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Cards with 3D Tilt & ScrollReveal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {filteredProjects.map((p, i) => (
            <ScrollReveal key={p.id} animation="fade-up" delay={150 * (i + 1)}>
              <Card3D>
                <SpotlightCard>
                  <div
                    className="surface-card hover-lift"
                    onMouseEnter={() => onProjectHover && onProjectHover(p)}
                    onMouseLeave={() => onProjectLeave && onProjectLeave()}
                    style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', display: 'grid', gap: '32px', alignItems: 'start', cursor: 'default' }}
                  >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }} className="proj-inner">
                    <div>
                      {/* Meta */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span className="pill-mono-tag">{p.category}</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#666666', fontWeight: '500' }}>{p.year}</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#F59E0B' }}>· {p.metric}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '24px', color: '#FFFFFF', marginBottom: '12px' }}>{p.title}</h3>

                      {/* Desc */}
                      <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#999999', lineHeight: 1.75, maxWidth: '680px', marginBottom: '18px' }}>{p.desc}</p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                        {p.tags.map(t => (
                          <span key={t} className="pill-mono-tag">{t}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '9px 18px', fontSize: '13px' }}>
                          <GithubIcon style={{ width: '13px', height: '13px', display: 'block' }} /> GitHub Repo
                        </a>
                        <button
                          onClick={() => { setActiveProject(p); handleSimulate(p.id); }}
                          className="btn-filled"
                          style={{ padding: '9px 18px', fontSize: '13px' }}
                        >
                          <Play size={13} /> Interactive Simulator
                        </button>
                      </div>
                    </div>

                    {/* Index Number */}
                    <span style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '80px', color: 'rgba(245,158,11,0.08)', lineHeight: 1, userSelect: 'none' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Card3D>
          </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Demo Modal */}
      {activeProject && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="sage-card" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2A2A2A', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <p className="section-label" style={{ marginBottom: '4px' }}>{activeProject.category}</p>
                <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '20px', color: '#FFFFFF' }}>{activeProject.title} — Interactive Demo</h3>
              </div>
              <button onClick={() => setActiveProject(null)} style={{ background: '#151515', border: '1px solid #2A2A2A', borderRadius: '10px', padding: '8px', color: '#FFFFFF', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            {/* Chatbot Simulator */}
            {activeProject.id === 'chatbot' && (
              <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                <div style={{ background: '#151515', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>USER QUERY:</p>
                  <p style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', padding: '10px 14px', borderRadius: '8px', color: '#F59E0B' }}>
                    "What is the admission procedure for B.E. Computer Science?"
                  </p>
                  {demoState.loading ? (
                    <div style={{ color: '#999999', marginTop: '12px', fontStyle: 'italic' }}>Evaluating intent with Python NLP...</div>
                  ) : demoState.response && (
                    <div style={{ marginTop: '14px', background: '#0D0D0D', border: '1px solid #F59E0B', borderRadius: '10px', padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', color: '#F59E0B' }}>
                        <span>INTENT: {demoState.response.intent}</span>
                        <span>CONFIDENCE: {demoState.response.confidence}</span>
                      </div>
                      <p style={{ color: '#FFFFFF', lineHeight: 1.6 }}>{demoState.response.answer}</p>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleSimulate('chatbot')} className="btn-white" style={{ padding: '9px 16px', fontSize: '13px' }}>Re-run NLP Query</button>
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '9px 16px', fontSize: '13px' }}>GitHub Code</a>
                </div>
              </div>
            )}

            {/* E-Commerce Simulator */}
            {activeProject.id === 'ecommerce' && (
              <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                <div style={{ background: '#151515', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', color: '#FFFFFF' }}>SHOPPING CART STATE</span>
                    <span className="pill-badge" style={{ background: '#F59E0B', color: '#1A0F00' }}>{demoState.cartItems} Items in Cart</span>
                  </div>
                  <p style={{ color: '#999999', marginBottom: '12px' }}>Simulating real-time responsive DOM subtotal calculation &amp; item updates...</p>
                  <div style={{ background: '#0D0D0D', padding: '12px', borderRadius: '8px', border: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
                    <span>Estimated Subtotal ({demoState.cartItems} items):</span>
                    <span style={{ color: '#F59E0B', fontWeight: '700' }}>₹{(demoState.cartItems * 1299).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleSimulate('ecommerce')} className="btn-white" style={{ padding: '9px 16px', fontSize: '13px' }}>Add Sample Item (+1)</button>
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '9px 16px', fontSize: '13px' }}>GitHub Repository</a>
                </div>
              </div>
            )}

            {/* Library Management Simulator */}
            {activeProject.id === 'library' && (
              <div style={{ fontFamily: 'Inter', fontSize: '13px' }}>
                <div style={{ background: '#151515', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>JAVA CONSOLE LOG OUTPUT:</p>
                  <pre style={{ fontFamily: 'Courier New, monospace', fontSize: '12px', color: '#F59E0B', background: '#0A0A0A', padding: '12px', borderRadius: '8px', border: '1px solid #2A2A2A', overflowX: 'auto', lineHeight: 1.6 }}>
                    <code>{demoState.consoleLogs.length ? demoState.consoleLogs.join('\n') : 'Click "Execute Java Checkout" to run system logic...'}</code>
                  </pre>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleSimulate('library')} className="btn-white" style={{ padding: '9px 16px', fontSize: '13px' }}>Execute Java Checkout</button>
                  <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '9px 16px', fontSize: '13px' }}>GitHub Code</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) { .proj-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
