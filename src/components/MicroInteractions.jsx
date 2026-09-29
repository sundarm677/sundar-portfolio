import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

// ── Copy to Clipboard Toast Hook & Trigger Component ──
export function CopyableContact({ text, label, icon: Icon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleCopy}
        className="btn-ghost"
        style={{
          padding: '8px 16px',
          fontSize: '13px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        title={`Click to copy ${label}`}
      >
        {Icon && <Icon size={14} style={{ color: '#F59E0B' }} />}
        <span>{text}</span>
        {copied ? (
          <CheckCircle2 size={13} style={{ color: '#10B981' }} />
        ) : (
          <Copy size={12} style={{ color: '#666666', opacity: 0.7 }} />
        )}
      </button>

      {/* Floating Toast Popup */}
      {copied && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#F59E0B',
            color: '#1A0F00',
            fontFamily: 'Inter',
            fontWeight: '700',
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
            zIndex: 30,
            animation: 'toast-slide 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Copied to clipboard! ✓
        </div>
      )}
    </div>
  );
}

// ── Scroll Animated Number Counter Component ──
export function AnimatedCounter({ end, duration = 1800, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime = null;
          const target = parseFloat(end);

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Easing function (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = easeProgress * target;
            
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ── Magnetic Spotlight Cursor Mouse Hover Wrapper ──
export function SpotlightCard({ children, className = '', style = {}, spotlightColor = 'rgba(245, 158, 11, 0.12)' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        className="spotlight-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 60%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
