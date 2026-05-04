'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dotRef.current?.style.setProperty('opacity', '1');
      ringRef.current?.style.setProperty('opacity', '1');
    };
    const onLeave = () => {
      dotRef.current?.style.setProperty('opacity', '0');
      ringRef.current?.style.setProperty('opacity', '0');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-accent"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] opacity-0"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-9 h-9 rounded-full border border-accent/30"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </>
  );
}
