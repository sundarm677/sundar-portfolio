import React, { useState, useRef } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';

export default function IDBadge3D() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 14;
    const rotateX = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 14;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div className="perspective-1000" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', userSelect: 'none' }}>

      {/* Lanyard Assembly */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, marginBottom: '-14px' }}>
        <div style={{
          width: '32px', height: '64px',
          background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.4) 0%, rgba(255,255,255,0.12) 100%)',
          borderLeft: '1px solid rgba(245, 158, 11, 0.5)',
          borderRight: '1px solid rgba(245, 158, 11, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '8px', fontWeight: '800', color: '#F59E0B', letterSpacing: '0.18em', writingMode: 'vertical-rl', textTransform: 'uppercase' }}>SUNDAR.DEV</span>
        </div>
        <div style={{ width: '42px', height: '12px', background: 'linear-gradient(90deg, #1E1E1E, #F59E0B, #1E1E1E)', borderRadius: '4px', border: '1px solid #F59E0B', boxShadow: '0 0 10px rgba(245,158,11,0.3)' }} />
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#1E1E1E', border: '2px solid #F59E0B', marginTop: '-7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 8px #F59E0B' }} className="animate-pulse-dot" />
        </div>
      </div>

      {/* Enlarged Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => { setIsFlipped(!isFlipped); setRotate({ x: 0, y: 0 }); }}
        className="transform-3d"
        style={{
          width: 'clamp(330px, 25vw, 370px)',
          height: 'clamp(530px, 40vw, 570px)',
          cursor: 'pointer',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
          transition: rotate.x === 0 && rotate.y === 0 ? 'transform 0.65s cubic-bezier(0.23,1,0.32,1)' : 'none',
          position: 'relative',
        }}
      >

        {/* ── FRONT ── */}
        <div
          className="backface-hidden"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(165deg, #1A1A1A 0%, #111111 100%)',
            border: '2px solid #2A2A2A',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 36px 90px rgba(0,0,0,0.85), 0 0 25px rgba(245, 158, 11, 0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Background Mesh */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Top Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', color: '#999999', textTransform: 'uppercase' }}>DEV PASS // 2026</span>
            <span className="pill-badge" style={{ fontSize: '11px', background: '#F59E0B', color: '#1A0F00', padding: '4px 12px', fontWeight: '800', boxShadow: '0 0 12px rgba(245,158,11,0.4)' }}>
              <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A0F00', display: 'inline-block' }} />
              AVAILABLE
            </span>
          </div>

          {/* Chip Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
            <div style={{ width: '44px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', border: '1px solid #FBBF24', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px', padding: '5px', boxShadow: '0 0 10px rgba(245,158,11,0.3)' }}>
              {[0,1,2,3].map(i => <div key={i} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '2px' }} />)}
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#888888', letterSpacing: '0.08em', textTransform: 'uppercase' }}>PASS ID: #SUNDAR-2026-CS</p>
              <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '800', color: '#F59E0B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>✦ VERIFIED DEV</p>
            </div>
          </div>

          {/* Avatar — Real Photo of Sundar M */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px', marginBottom: '8px', zIndex: 2 }}>
            <div style={{ position: 'relative' }}>
              {/* Glowing Aura Ring */}
              <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', background: 'conic-gradient(#F59E0B 0%, #FBBF24 50%, transparent 80%)', opacity: 0.9 }} className="animate-spin-slow" />
              
              {/* Photo Frame Outer Ring with Padding */}
              <div style={{
                width: '165px',
                height: '165px',
                borderRadius: '50%',
                border: '5px solid #F59E0B',
                padding: '4px',
                background: '#FFFFFF',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.45), 0 10px 30px rgba(0,0,0,0.7)',
                transform: 'translateZ(1px)',
                isolation: 'isolate'
              }}>
                {/* Circular Mask Inner Wrapper */}
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/sundar_photo.png?v=fullres2"
                    alt="Sundar M"
                    className="profile-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                      transform: 'scale(0.88)',
                      display: 'block',
                      backgroundColor: '#FFFFFF',
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'contrast(1.02) brightness(1.01) saturate(1.03)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = "/avatar.jpg"; }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '22px', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '4px' }}>SUNDAR M</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>Software Developer | Java Developer</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
              <MapPin size={13} color="#F59E0B" />
              <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '500', color: '#CCCCCC' }}>India</span>
            </div>
          </div>

          {/* Barcode Strip & Click to Flip */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid #2A2A2A', paddingTop: '14px', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '32px', marginBottom: '6px' }}>
                  {[3,5,2,4,3,2,5,3,4,2,3,5,2,4,3,2,4,3,5,2,3].map((w, i) => (
                    <div key={i} style={{ width: `${w}px`, height: `${55 + (i % 3) * 15}%`, background: '#AAAAAA', borderRadius: '1px' }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: '600', color: '#888888', letterSpacing: '0.12em' }}>+91-9360346758</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.3)' }}>
                <RefreshCw size={11} className="animate-spin-slow" />
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Flip Card</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="backface-hidden rotate-y-180"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(165deg, #151515 0%, #0D0D0D 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 36px 90px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.2)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', color: '#F59E0B', textTransform: 'uppercase' }}>System Overview</span>
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>v2.6_STABLE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'DEGREE', value: 'B.E. CSE', sub: 'CGPA 7.7 (2022–26)' },
              { label: 'STACK', value: 'Java, Python', sub: 'SQL, HTML/CSS' },
              { label: 'INTERNSHIPS', value: '2 Completed', sub: 'Think Bright + Besant' },
              { label: 'TOP PROJECT', value: 'AI Chatbot', sub: 'NLP College Support' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: '700', color: '#F59E0B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontFamily: 'Sora', fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>{item.value}</p>
                <p style={{ fontFamily: 'Inter', fontSize: '10px', color: '#888888' }}>{item.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', borderRadius: '12px', padding: '14px', fontFamily: 'Inter', fontSize: '12px', lineHeight: 1.75 }}>
            <p style={{ color: '#FFFFFF', fontWeight: '600' }}>$ sundar.getOverview()</p>
            <p style={{ color: '#AAAAAA' }}>✓ AI Chatbot for College Support (NLP)</p>
            <p style={{ color: '#AAAAAA' }}>✓ E-Commerce Clothing Website</p>
            <p style={{ color: '#AAAAAA' }}>✓ Library Management System (Java OOP)</p>
            <p style={{ color: '#F59E0B', fontWeight: '700', marginTop: '4px' }}>⚡ Seeking Entry-Level Java Role</p>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid #2A2A2A', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: '600', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact Email</p>
              <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#FFFFFF' }}>msundar677@gmail.com</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.3)' }}>
              <RefreshCw size={11} />
              <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Flip Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '700', color: '#F59E0B', letterSpacing: '0.08em' }}>
        ✦ Hover to tilt · Click to flip
      </p>
    </div>
  );
}
