'use client';

import { useEffect, useRef, MutableRefObject } from 'react';

interface Props {
  analyserRef: MutableRefObject<AnalyserNode | null>;
  active: boolean;
}

export default function Waveform({ analyserRef, active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const ACCENT = '#C8F562';
    const IDLE_COLOR = '#2A2A2A';

    const draw = () => {
      frameRef.current = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const analyser = analyserRef.current;

      if (!analyser || !active) {
        // Idle: single thin line
        ctx.beginPath();
        ctx.strokeStyle = IDLE_COLOR;
        ctx.lineWidth = 1 * dpr;
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const buffer = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(buffer);

      // Measure signal amplitude
      let maxAmp = 0;
      for (let i = 0; i < bufferLength; i++) maxAmp = Math.max(maxAmp, Math.abs(buffer[i]));

      const hasSignal = maxAmp > 0.015;
      ctx.beginPath();
      ctx.strokeStyle = hasSignal ? ACCENT : IDLE_COLOR;
      ctx.lineWidth = (hasSignal ? 1.5 : 1) * dpr;

      if (hasSignal) {
        ctx.shadowBlur = 14 * dpr;
        ctx.shadowColor = ACCENT;
      }

      const step = W / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        const x = i * step;
        const y = ((1 - buffer[i]) / 2) * H;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    draw();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [analyserRef, active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Forme d'onde audio"
    />
  );
}
