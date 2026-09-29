import React, { useState, useEffect } from 'react';

const roles = [
  'Software Developer',
  'Java Developer',
  'Python & Web Developer',
  'Available for Hire',
];

export default function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <span style={{ color: '#FFFFFF', fontWeight: '700', borderRight: '2px solid #FFFFFF', paddingRight: '4px', animation: 'pulse-dot 1s infinite' }}>
      {displayText}
    </span>
  );
}
