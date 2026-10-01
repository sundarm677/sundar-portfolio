import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import Toast from './Toast';

export default function ContactSection({ onOpenResume, onContactHover, onContactLeave }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('msundar677@gmail.com');
    setCopied(true);
    showToast('Email copied to clipboard: msundar677@gmail.com');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#FFFFFF', '#CCCCCC', '#888888', '#333333'] });
    showToast('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" style={{ background: '#151515', borderTop: '1px solid #2A2A2A', position: 'relative' }}>
      <Toast message={toastMsg} />

      <div className="section-wrap">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '12px' }}>Get In Touch</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: '#FFFFFF', marginBottom: '14px' }}>
            Let's build something<br /><span className="underline-highlight">great together</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#CCCCCC', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
            Computer Science Engineering graduate (2026) looking for an entry-level developer role, ideally on the Java side. Feel free to reach out!
          </p>
        </div>

        {/* Two-Column Grid */}
        <div style={{ display: 'grid', gap: '40px', marginBottom: '60px' }} className="contact-grid">

          {/* Contact Form */}
          <div className="sage-card" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A' }}>
            <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '18px', color: '#FFFFFF', marginBottom: '20px' }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gap: '12px' }} className="form-row">
                <input required placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input required type="email" placeholder="Your Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <textarea required rows={4} placeholder="Your Message *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />

              {sent && (
                <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid #444444', borderRadius: '10px', padding: '10px 14px', fontFamily: 'Inter', fontSize: '13px', fontWeight: '500', color: '#FFFFFF' }}>
                  ✓ Message sent! Thank you for reaching out.
                </div>
              )}

              <button type="submit" className="btn-white" style={{ alignSelf: 'flex-start' }}>
                <Send size={14} /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="sage-card" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A' }}>
              <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '16px', color: '#FFFFFF', marginBottom: '16px' }}>Contact Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={15} color="#F59E0B" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location</p>
                    <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: '#FFFFFF' }}>India</p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={15} color="#F59E0B" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</p>
                    <a href="tel:+919360346758" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', textDecoration: 'none' }}>+91-9360346758</a>
                  </div>
                </div>

                {/* Email */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  onMouseEnter={() => onContactHover && onContactHover('email')}
                  onMouseLeave={() => onContactLeave && onContactLeave()}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={15} color="#F59E0B" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</p>
                    <a href="mailto:msundar677@gmail.com" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', textDecoration: 'none' }}>msundar677@gmail.com</a>
                  </div>
                  <button onClick={handleCopy} style={{ background: 'transparent', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '6px', color: copied ? '#F59E0B' : '#666666', cursor: 'pointer' }}>
                    {copied ? <Check size={13} color="#F59E0B" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="sage-card" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter', fontSize: '13px', fontWeight: '500', color: '#CCCCCC', textDecoration: 'none', flex: 1, minWidth: '120px', padding: '10px', borderRadius: '10px', background: '#151515', border: '1px solid #2A2A2A', transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B';
                  if (onContactHover) onContactHover('github');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#CCCCCC';
                  if (onContactLeave) onContactLeave();
                }}
              >
                <GithubIcon style={{ width: '18px', height: '18px', flexShrink: 0 }} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/sundar-2k5" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter', fontSize: '13px', fontWeight: '500', color: '#CCCCCC', textDecoration: 'none', flex: 1, minWidth: '120px', padding: '10px', borderRadius: '10px', background: '#151515', border: '1px solid #2A2A2A', transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B';
                  if (onContactHover) onContactHover('linkedin');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#CCCCCC';
                  if (onContactLeave) onContactLeave();
                }}
              >
                <LinkedinIcon style={{ width: '18px', height: '18px', flexShrink: 0 }} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#666666' }}>
            © {new Date().getFullYear()} Sundar M · India
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onOpenResume} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '13px' }}>View Resume</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'transparent', border: '1px solid #2A2A2A', color: '#CCCCCC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#CCCCCC'; }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
