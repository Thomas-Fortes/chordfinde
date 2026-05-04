'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PitchDetector } from 'pitchy';

export type MicState = 'idle' | 'requesting' | 'listening' | 'weak' | 'stable' | 'unknown' | 'error';

interface PitchResult {
  frequency: number | null;
  note: string | null;
  clarity: number;
  volume: number; // 0-1
}

interface UsePitchDetectorReturn {
  micState: MicState;
  pitchResult: PitchResult;
  start: () => Promise<void>;
  stop: () => void;
  errorMessage: string | null;
}

const BUFFER_SIZE = 2048;
const CLARITY_THRESHOLD = 0.93;
const VOLUME_THRESHOLD = 0.01;
const STABLE_FRAMES = 3;
const ANALYSIS_INTERVAL_MS = 50;

function freqToNoteName(freq: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const midi = Math.round(12 * Math.log2(freq / 440) + 69);
  const octave = Math.floor(midi / 12) - 1;
  const name = noteNames[((midi % 12) + 12) % 12];
  return `${name}${octave}`;
}

export function usePitchDetector(): UsePitchDetectorReturn {
  const [micState, setMicState] = useState<MicState>('idle');
  const [pitchResult, setPitchResult] = useState<PitchResult>({
    frequency: null,
    note: null,
    clarity: 0,
    volume: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);
  const stableCountRef = useRef(0);
  const lastNoteRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    stableCountRef.current = 0;
    lastNoteRef.current = null;
    setMicState('idle');
    setPitchResult({ frequency: null, note: null, clarity: 0, volume: 0 });
  }, []);

  const start = useCallback(async () => {
    if (micState === 'listening' || micState === 'stable' || micState === 'requesting') return;

    setMicState('requesting');
    setErrorMessage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = BUFFER_SIZE;
      source.connect(analyser);

      const buffer = new Float32Array(BUFFER_SIZE);
      detectorRef.current = PitchDetector.forFloat32Array(BUFFER_SIZE);

      setMicState('listening');

      intervalRef.current = setInterval(() => {
        analyser.getFloatTimeDomainData(buffer);

        // Compute RMS volume
        let rms = 0;
        for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
        rms = Math.sqrt(rms / buffer.length);

        if (rms < VOLUME_THRESHOLD) {
          stableCountRef.current = 0;
          lastNoteRef.current = null;
          setPitchResult({ frequency: null, note: null, clarity: 0, volume: rms });
          setMicState('listening');
          return;
        }

        const [freq, clarity] = detectorRef.current!.findPitch(buffer, ctx.sampleRate);

        if (clarity < CLARITY_THRESHOLD || freq < 60 || freq > 2000) {
          stableCountRef.current = 0;
          setPitchResult({ frequency: null, note: null, clarity, volume: rms });
          setMicState(rms > VOLUME_THRESHOLD ? 'weak' : 'listening');
          return;
        }

        const note = freqToNoteName(freq);

        if (note === lastNoteRef.current) {
          stableCountRef.current++;
        } else {
          stableCountRef.current = 1;
          lastNoteRef.current = note;
        }

        if (stableCountRef.current >= STABLE_FRAMES) {
          setPitchResult({ frequency: freq, note, clarity, volume: rms });
          setMicState('stable');
        } else {
          setPitchResult((prev) => ({ ...prev, volume: rms, clarity }));
          setMicState('listening');
        }
      }, ANALYSIS_INTERVAL_MS);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('Permission') || msg.includes('permission') || msg.includes('denied')) {
        setErrorMessage('Accès au microphone refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
      } else {
        setErrorMessage('Impossible d\'accéder au microphone. Vérifiez qu\'un microphone est connecté.');
      }
      setMicState('error');
    }
  }, [micState]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { micState, pitchResult, start, stop, errorMessage };
}
