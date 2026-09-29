import React, { useState, useEffect } from 'react';

const glyphs = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

export default function InteractiveHeadline() {
  const [text, setText] = useState('efficient');
  const [isScrambling, setIsScrambling] = useState(false);

  const targetWord = 'efficient';

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetWord
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetWord[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iteration >= targetWord.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Initial subtle scramble on mount
    const timeout = setTimeout(() => triggerScramble(), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <h1 style={{ fontFamily: 'Sora', fontWeight: '800', fontSize: 'clamp(36px, 5vw, 62px)', lineHeight: 1.08, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
      Building scalable,<br />
      <span
        onMouseEnter={triggerScramble}
        onClick={triggerScramble}
        className="underline-highlight shimmer-text"
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          transition: 'transform 0.2s ease',
        }}
        title="Click or hover to decode JS animation"
      >
        {text}
      </span>{' '}
      software<br />
      solutions.
    </h1>
  );
}
