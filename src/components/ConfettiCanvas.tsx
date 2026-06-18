import React, { useEffect, useRef } from 'react';

export const ConfettiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', 
      '#06b6d4', '#e11d48', '#b48a3c', '#d4af37'
    ];
    
    interface ConfettiPiece {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }

    const pieces: ConfettiPiece[] = [];
    const pieceCount = 120;

    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20, // Spawn offscreen above
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      pieces.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotationSpeed;

        // Apply slight gravity/drift
        p.vx += Math.sin(p.y / 30) * 0.05;

        if (p.y < height + 20) {
          alive = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // Draw small rectangles for confetti
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
        ctx.restore();
      });

      if (alive) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    />
  );
};
