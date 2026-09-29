import React, { useEffect, useRef } from 'react';

export default function ParticleCirculationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let centerX = width >= 900 ? width * 0.611 : width * 0.5;
    let centerY = height * 0.478;

    const mouse = { x: -1000, y: -1000 };
    const shockwaves = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 140,
        opacity: 0.7,
      });
    };

    const updateDimensions = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width >= 900 ? width * 0.611 : width * 0.5;
      centerY = height * 0.478;
    };

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const numParticles = 145;
    const particles = [];

    const maxRadius = Math.min(Math.max(width * 0.38, 300), 520);
    const minRadius = 40;

    for (let i = 0; i < numParticles; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const angle = Math.random() * Math.PI * 2;
      const dir = Math.random() < 0.5 ? 1 : -1;
      const speed = dir * (Math.random() * 0.005 + 0.0015);
      const size = Math.random() * 1.6 + 0.5;
      const opacity = Math.random() * 0.45 + 0.15;

      particles.push({
        radius,
        angle,
        speed,
        size,
        opacity,
        offsetX: 0,
        offsetY: 0,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const s = shockwaves[i];
        s.radius += 4;
        s.opacity -= 0.02;

        if (s.opacity <= 0 || s.radius >= s.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Render particles with mouse physics repulsion
      particles.forEach((p) => {
        p.angle += p.speed;

        let baseX = centerX + Math.cos(p.angle) * p.radius;
        let baseY = centerY + Math.sin(p.angle) * p.radius * 0.6;

        // Mouse repulsion force field
        const dx = baseX - mouse.x;
        const dy = baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 20;
          p.offsetX += (dx / dist) * force * 0.2;
          p.offsetY += (dy / dist) * force * 0.2;
        }

        // Smooth return damping
        p.offsetX *= 0.92;
        p.offsetY *= 0.92;

        const renderX = baseX + p.offsetX;
        const renderY = baseY + p.offsetY;

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
}
