import React, { useEffect, useRef } from 'react';

export default function Hero3DSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const numPoints = 140;
    const points = [];
    const radius = 110;

    // Generate 3D sphere points using Golden Spiral Algorithm
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      points.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
      });
    }

    let angleX = 0.005;
    let angleY = 0.008;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - size / 2) * 0.0001;
      mouseY = (e.clientY - rect.top - size / 2) * 0.0001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      const currentAngleX = angleX + mouseY;
      const currentAngleY = angleY + mouseX;

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 3D Rotation Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // 3D Rotation X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y1;
        p.z = z2;

        // 3D Perspective projection formula: scale = F / (F + z)
        const fov = 280;
        const scale = fov / (fov + z2);
        const x2D = cx + x1 * scale;
        const y2D = cy + y1 * scale;

        projected.push({ x: x2D, y: y2D, z: z2, scale });
      }

      // Sort points by Z to draw back-to-front depth
      projected.sort((a, b) => b.z - a.z);

      // Draw connecting lines between nearby points
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42) {
            const alpha = (1 - dist / 42) * 0.25 * (p1.scale > 0.9 ? 1 : 0.4);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw point nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const opacity = Math.max(0.1, (p.z + radius) / (2 * radius));
        const pSize = Math.max(1, p.scale * 2.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '240px',
          height: '240px',
          filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.15))',
        }}
      />
      <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#666666', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '-10px' }}>
        ✦ Interactive 3D Mesh
      </span>
    </div>
  );
}
