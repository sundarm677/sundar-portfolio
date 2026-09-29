import React from 'react';
import { X, Download, Printer, BookOpen } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}>
      <div style={{ width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto', background: '#1E1E1E', border: '1px solid #2A2A2A', borderRadius: '20px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #2A2A2A', position: 'sticky', top: 0, background: '#1E1E1E', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={16} color="#F59E0B" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Sora', fontWeight: '700', fontSize: '16px', color: '#FFFFFF' }}>Sundar M — Official Resume</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#F59E0B', fontWeight: '600' }}>Software Developer · Java Developer · B.E. Computer Science Engineering</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href="mailto:msundar677@gmail.com" className="btn-ghost" style={{ padding: '8px 14px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Download size={13} /> Email Sundar
            </a>
            <button onClick={onClose} style={{ width: '36px', height: '36px', background: '#151515', border: '1px solid #2A2A2A', borderRadius: '10px', color: '#CCCCCC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div style={{ padding: '32px 24px', fontFamily: 'Inter', fontSize: '13px', color: '#CCCCCC', lineHeight: 1.7 }}>

          {/* Name & Contact */}
          <div style={{ textAlign: 'center', borderBottom: '1px solid #2A2A2A', paddingBottom: '20px', marginBottom: '24px' }}>
            <h1 style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: '28px', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '4px' }}>SUNDAR M</h1>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#F59E0B', fontWeight: '700', letterSpacing: '0.06em' }}>FULL STACK DEVELOPER</p>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#999999', marginTop: '6px' }}>
              +91 9360346758 | <a href="mailto:msundar677@gmail.com" style={{ color: '#F59E0B' }}>msundar677@gmail.com</a>
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#666666', marginTop: '4px' }}>
              <a href="https://www.linkedin.com/in/sundar-2k5" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B', textDecoration: 'underline' }}>linkedin.com/in/sundar-2k5</a> | <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B', textDecoration: 'underline' }}>github.com/sundarm677</a>
            </p>
          </div>

          {/* Sections */}
          {[
            {
              heading: 'SUMMARY',
              content: (
                <p style={{ lineHeight: 1.8, color: '#CCCCCC' }}>
                  Computer Science Engineering graduate (2026) with hands-on experience in Java, Python, SQL, and web development. Strong foundation in Object-Oriented Programming (OOP), with practical experience building responsive applications using HTML5, CSS3, JavaScript, and MySQL. Experienced with Git/GitHub, problem solving, debugging, and software development through academic projects and internships. Seeking an entry-level Software Developer or Java Developer role to apply technical skills and grow as a software professional.
                </p>
              ),
            },
            {
              heading: 'SKILLS',
              content: (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {[
                    ['Languages', 'Java, Python, SQL'],
                    ['Tools & IDEs', 'MySQL Workbench, VS Code, Eclipse'],
                    ['Version Control', 'Git, GitHub'],
                    ['Soft Skills', 'Problem Solving, Communication, Teamwork, Resilience, Adaptability'],
                  ].map(([k, v]) => (
                    <p key={k} style={{ margin: 0 }}><strong style={{ color: '#F59E0B', fontWeight: '600' }}>{k}:</strong> {v}</p>
                  ))}
                </div>
              ),
            },
            {
              heading: 'PROJECTS',
              content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>AI Chatbot for College Admission &amp; Student Support</strong>
                      <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>May 2025 – Jun 2026</span>
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '18px', color: '#999999', margin: '4px 0 6px' }}>
                      <li>Built a chatbot in Python to answer admission and campus-related questions for prospective and current students, using NLP to interpret free-text queries instead of relying on fixed menus.</li>
                      <li>Tested it against real question phrasing collected from classmates and reworked the matching logic wherever it gave an unclear or wrong answer.</li>
                    </ul>
                    <p style={{ fontSize: '12px', color: '#666666' }}>
                      GitHub: <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B' }}>github.com/sundarm677</a>
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>E-Commerce Application</strong>
                      <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>Jun 2025 – Jul 2025</span>
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '18px', color: '#999999', margin: '4px 0 6px' }}>
                      <li>Developed responsive and user-friendly e-commerce web pages.</li>
                      <li>Implemented product listings, product details, and shopping cart functionality.</li>
                      <li>Improved UI design and usability using modern front-end development practices.</li>
                    </ul>
                    <p style={{ fontSize: '12px', color: '#666666' }}>
                      GitHub: <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B' }}>github.com/sundarm677</a>
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>Library Management System</strong>
                      <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>Jun 2026 – July 2026</span>
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '18px', color: '#999999', margin: '4px 0 6px' }}>
                      <li>Console-based Java application for managing a book catalog and member checkouts, using HashMap and Array List for fast lookups.</li>
                      <li>Added three custom exceptions (book not found, book unavailable, member not found) so bad input is handled gracefully instead of crashing the program.</li>
                    </ul>
                    <p style={{ fontSize: '12px', color: '#666666' }}>
                      GitHub: <a href="https://github.com/sundarm677" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B' }}>github.com/sundarm677</a>
                    </p>
                  </div>
                </div>
              ),
            },
            {
              heading: 'INTERNSHIP EXPERIENCE',
              content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>Web Development Intern — Think Bright EdTech</strong>
                    </div>
                    <p style={{ color: '#999999', margin: 0 }}>
                      <strong style={{ color: '#CCCCCC' }}>Responsibilities &amp; Technologies:</strong> Developed and maintained responsive web pages using HTML5, CSS3, and JavaScript, improving page usability and layout consistency.
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>Full Stack Development Intern — Besant Technologies</strong>
                    </div>
                    <p style={{ color: '#999999', margin: 0 }}>
                      <strong style={{ color: '#CCCCCC' }}>Responsibilities &amp; Technologies:</strong> Assisted in developing and integrating front-end and back-end modules for web applications, supporting end-to-end functionality; contributed to database-related tasks using SQL and MySQL.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              heading: 'EDUCATION',
              content: (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <strong style={{ color: '#FFFFFF', fontSize: '14px' }}>Bachelor of Engineering in Computer Science and Engineering | CGPA: 7.7</strong>
                    <span style={{ color: '#F59E0B', fontSize: '12px', fontWeight: '600' }}>2022 – 2026</span>
                  </div>
                  <p style={{ color: '#999999', margin: 0 }}>
                    Jaya Engineering College, Affiliated to Anna University (Thiruninravur, Tamil Nadu)
                  </p>
                </div>
              ),
            },
          ].map(({ heading, content }) => (
            <div key={heading} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', color: '#F59E0B', textTransform: 'uppercase', borderBottom: '1px solid #2A2A2A', paddingBottom: '6px', marginBottom: '12px' }}>{heading}</h2>
              {content}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#666666' }}>Sundar M · Official Resume</span>
          <a href="mailto:msundar677@gmail.com" className="btn-white" style={{ padding: '9px 18px', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Download size={13} /> Contact Sundar M
          </a>
        </div>
      </div>
    </div>
  );
}
