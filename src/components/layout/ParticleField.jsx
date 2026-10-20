import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 48;
const CONNECTION_DISTANCE = 132;

export default function ParticleField({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;
    let animationFrame = null;
    let elapsed = 0;
    let previousTime = performance.now();
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000, currentX: -1000, currentY: -1000 };
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      orbit: 4 + Math.random() * 14,
      speed: 0.18 + Math.random() * 0.28,
      radius: 1 + Math.random() * 1.5,
      twinkle: 0.7 + Math.random() * 1.5,
      accent: Math.random() > 0.78
    }));

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now = performance.now()) => {
      elapsed += Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      context.clearRect(0, 0, width, height);
      const teal = darkMode ? '115, 230, 193' : '41, 144, 147';
      const coral = darkMode ? '239, 112, 99' : '239, 97, 86';
      pointer.currentX += (pointer.x - pointer.currentX) * 0.08;
      pointer.currentY += (pointer.y - pointer.currentY) * 0.08;
      const points = particles.map((particle) => {
        const wave = elapsed * particle.speed + particle.phase;
        const baseX = particle.x * width;
        const baseY = particle.y * height;
        const point = {
          x: baseX + Math.cos(wave) * particle.orbit,
          y: baseY + Math.sin(wave * 0.83) * particle.orbit
        };
        const dx = point.x - pointer.currentX;
        const dy = point.y - pointer.currentY;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion && distance < 170 && distance > 0) {
          const force = ((170 - distance) / 170) * 12;
          point.x += (dx / distance) * force;
          point.y += (dy / distance) * force;
        }
        return point;
      });

      if (pointer.currentX > -500) {
        const cursorGlow = context.createRadialGradient(
          pointer.currentX, pointer.currentY, 0,
          pointer.currentX, pointer.currentY, 190
        );
        cursorGlow.addColorStop(0, `rgba(${teal}, 0.08)`);
        cursorGlow.addColorStop(1, `rgba(${teal}, 0)`);
        context.fillStyle = cursorGlow;
        context.fillRect(pointer.currentX - 190, pointer.currentY - 190, 380, 380);
      }

      points.forEach((point, index) => {
        particles.slice(index + 1).forEach((_, offset) => {
          const other = points[index + offset + 1];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < CONNECTION_DISTANCE) {
            const cursorDistance = Math.min(
              Math.hypot(point.x - pointer.currentX, point.y - pointer.currentY),
              Math.hypot(other.x - pointer.currentX, other.y - pointer.currentY)
            );
            const proximity = cursorDistance < 180 ? 0.12 : 0;
            const alpha = 0.045 * (1 - distance / CONNECTION_DISTANCE) + proximity;
            context.strokeStyle = `rgba(${teal}, ${alpha})`;
            context.lineWidth = proximity ? 1.5 : 1;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        });
        const particle = particles[index];
        const pulse = 0.72 + Math.sin(elapsed * particle.twinkle + particle.phase) * 0.28;
        const color = particle.accent ? coral : teal;
        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, particle.radius * 7);
        glow.addColorStop(0, `rgba(${color}, ${0.22 * pulse})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, particle.radius * 7, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(${color}, ${0.3 * pulse})`;
        context.beginPath();
        context.arc(point.x, point.y, particle.radius * (0.85 + pulse * 0.2), 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion && animationFrame !== null) cancelAnimationFrame(animationFrame);
      draw();
    };

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    reducedMotionQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, [darkMode]);

  return <canvas ref={canvasRef} className="particle-field absolute inset-0 h-full w-full" aria-hidden="true" />;
}
