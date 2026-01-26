import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function ShippingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    // Nepal position (center-left)
    const nepalX = 150;
    const nepalY = 250;

    // Destination cities around the world
    const destinations = [
      { x: 350, y: 150, name: 'Middle East', angle: -0.5 },
      { x: 500, y: 180, name: 'Far East', angle: -0.3 },
      { x: 250, y: 100, name: 'Europe', angle: -1.2 },
      { x: 100, y: 150, name: 'USA', angle: -1.8 },
      { x: 450, y: 350, name: 'Australia', angle: 0.8 },
      { x: 550, y: 250, name: 'Asia Pacific', angle: 0.2 }
    ];

    // Shipping packages
    const packages: Array<{
      progress: number;
      destination: typeof destinations[0];
      speed: number;
      hue: number;
    }> = destinations.map((dest, i) => ({
      progress: Math.random() * 0.3,
      destination: dest,
      speed: 0.003 + Math.random() * 0.002,
      hue: i * 60
    }));

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections (dotted lines)
      destinations.forEach((dest, i) => {
        ctx.strokeStyle = 'rgba(0, 56, 147, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(nepalX, nepalY);
        ctx.lineTo(dest.x, dest.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Nepal (center hub)
      ctx.fillStyle = '#DC143C';
      ctx.beginPath();
      ctx.arc(nepalX, nepalY, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // Nepal glow
      const nepalGlow = ctx.createRadialGradient(nepalX, nepalY, 0, nepalX, nepalY, 30);
      nepalGlow.addColorStop(0, 'rgba(220, 20, 60, 0.3)');
      nepalGlow.addColorStop(1, 'rgba(220, 20, 60, 0)');
      ctx.fillStyle = nepalGlow;
      ctx.beginPath();
      ctx.arc(nepalX, nepalY, 30, 0, Math.PI * 2);
      ctx.fill();

      // Nepal label
      ctx.fillStyle = '#1A1A1B';
      ctx.font = '600 11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('NEPAL', nepalX, nepalY + 35);

      // Draw destination nodes
      destinations.forEach((dest) => {
        ctx.fillStyle = '#003893';
        ctx.beginPath();
        ctx.arc(dest.x, dest.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Destination labels
        ctx.fillStyle = 'rgba(26, 26, 27, 0.5)';
        ctx.font = '500 9px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(dest.name, dest.x, dest.y - 15);
      });

      // Animate packages
      packages.forEach((pkg) => {
        pkg.progress += pkg.speed;
        
        if (pkg.progress > 1) {
          pkg.progress = 0;
        }

        // Calculate position along the curve
        const startX = nepalX;
        const startY = nepalY;
        const endX = pkg.destination.x;
        const endY = pkg.destination.y;

        // Create a curved path
        const t = pkg.progress;
        const curveHeight = 50;
        const midX = (startX + endX) / 2;
        const midY = ((startY + endY) / 2) - curveHeight;

        // Quadratic bezier curve
        const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
        const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;

        // Draw package (small container icon)
        const size = 8;
        
        // Package shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(x - size / 2 + 2, y - size / 2 + 2, size, size);
        
        // Package body
        ctx.fillStyle = '#003893';
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
        
        // Package highlight
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - size / 2, y - size / 2, size, size);

        // Trail effect
        if (pkg.progress > 0.1) {
          const trailT = pkg.progress - 0.1;
          const trailX = (1 - trailT) * (1 - trailT) * startX + 2 * (1 - trailT) * trailT * midX + trailT * trailT * endX;
          const trailY = (1 - trailT) * (1 - trailT) * startY + 2 * (1 - trailT) * trailT * midY + trailT * trailT * endY;
          
          ctx.strokeStyle = 'rgba(0, 56, 147, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(trailX, trailY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      // Pulse effect on destinations when package arrives
      packages.forEach((pkg) => {
        if (pkg.progress > 0.95 && pkg.progress < 1) {
          const pulseAlpha = 1 - (pkg.progress - 0.95) / 0.05;
          ctx.strokeStyle = `rgba(255, 215, 0, ${pulseAlpha * 0.5})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pkg.destination.x, pkg.destination.y, 15 * (1 - pulseAlpha), 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
