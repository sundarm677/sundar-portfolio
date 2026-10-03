import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, ArrowUp, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import Toast from './Toast';

export default function ContactSection({ onOpenResume, onContactHover, onContactLeave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '' // Honeypot field for bot spam prevention
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('msundar677@gmail.com');
    setCopied(true);
    showToast('Email copied to clipboard: msundar677@gmail.com');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic Client-side Validation
    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!form.subject.trim()) {
      setError('Please enter a subject.');
      return;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      setError('Please write a message with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Thanks for reaching out! Your message has been sent successfully. I'll get back to you soon.");
        showToast("Message sent successfully!");
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FFFFFF', '#CCCCCC', '#00E5FF']
        });
        setForm({ name: '', email: '', phone: '', subject: '', message: '', company: '' });
      } else {
        setError(data.message || 'Failed to send message. Please check your inputs and try again.');
        showToast(data.message || 'Submission failed.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError('Unable to reach the server. Please verify your connection or email directly.');
      showToast('Network error while sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" data-avatar-pose="contact" style={{ background: '#121212', borderTop: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative' }}>
      <Toast message={toastMsg} />

      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '12px' }}>Get In Touch</p>
          <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', color: '#FFFFFF', marginBottom: '14px', fontFamily: 'var(--font-sora)' }}>
            Let's build something<br /><span className="underline-highlight">great together</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', color: '#CCCCCC', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
            Computer Science Engineering graduate (2026) looking for an entry-level developer role, ideally on the Java side. Feel free to reach out!
          </p>
        </div>

        {/* Two-Column Grid */}
        <div style={{ display: 'grid', gap: '36px', marginBottom: '60px' }} className="contact-grid">

          {/* Contact Form Card */}
          <div className="sage-card" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: '700', fontSize: '18px', color: '#FFFFFF', marginBottom: '20px' }}>Send a Message</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Hidden Honeypot Field */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Name & Email */}
              <div style={{ display: 'grid', gap: '16px' }} className="form-row">
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', display: 'block' }}>
                    Full Name <span style={{ color: '#F59E0B' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    disabled={loading}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', display: 'block' }}>
                    Email Address <span style={{ color: '#F59E0B' }}>*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    disabled={loading}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Subject */}
              <div style={{ display: 'grid', gap: '16px' }} className="form-row">
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', display: 'block' }}>
                    Phone Number <span style={{ color: '#666666', fontSize: '10px' }}>(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    disabled={loading}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', display: 'block' }}>
                    Subject <span style={{ color: '#F59E0B' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Job Opportunity / Project Inquiry"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    disabled={loading}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', display: 'block' }}>
                  Message <span style={{ color: '#F59E0B' }}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi Sundar, I'd like to talk about..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  disabled={loading}
                  style={{ resize: 'vertical', width: '100%', minHeight: '110px' }}
                />
              </div>

              {/* Success Alert */}
              {success && (
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '10px', padding: '12px 16px', fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: '500', color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>{success}</div>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '10px', padding: '12px 16px', fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: '500', color: '#ffffff', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>{error}</div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-amber"
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '4px',
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin-slow" /> Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="sage-card" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-sora)', fontWeight: '700', fontSize: '16px', color: '#FFFFFF', marginBottom: '16px' }}>Contact Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={15} color="#F59E0B" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: '500', color: '#FFFFFF' }}>India</p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={15} color="#F59E0B" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</p>
                    <a href="tel:+919360346758" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', textDecoration: 'none' }}>+91-9360346758</a>
                  </div>
                </div>

                {/* Email */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  onMouseEnter={() => onContactHover && onContactHover('email')}
                  onMouseLeave={() => onContactLeave && onContactLeave()}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={15} color="#F59E0B" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: '500', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</p>
                    <a href="mailto:msundar677@gmail.com" style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: '500', color: '#FFFFFF', textDecoration: 'none', wordBreak: 'break-all' }}>msundar677@gmail.com</a>
                  </div>
                  <button onClick={handleCopy} title="Copy email address" style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '6px', color: copied ? '#F59E0B' : '#666666', cursor: 'pointer', flexShrink: 0 }}>
                    {copied ? <Check size={13} color="#F59E0B" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="sage-card" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: '500', color: '#CCCCCC', textDecoration: 'none', flex: 1, minWidth: '120px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B';
                  if (onContactHover) onContactHover('github');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#CCCCCC';
                  if (onContactLeave) onContactLeave();
                }}
              >
                <GithubIcon style={{ width: '18px', height: '18px', flexShrink: 0 }} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/sundar-2k5" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: '500', color: '#CCCCCC', textDecoration: 'none', flex: 1, minWidth: '120px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', transition: 'all 0.2s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B';
                  if (onContactHover) onContactHover('linkedin');
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#CCCCCC';
                  if (onContactLeave) onContactLeave();
                }}
              >
                <LinkedinIcon style={{ width: '18px', height: '18px', flexShrink: 0 }} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#666666' }}>
            © {new Date().getFullYear()} Sundar M · India
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onOpenResume} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '13px' }}>View Resume</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#CCCCCC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#F59E0B'; e.currentTarget.style.color = '#F59E0B'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#CCCCCC'; }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1.2fr 0.8fr !important; }
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
