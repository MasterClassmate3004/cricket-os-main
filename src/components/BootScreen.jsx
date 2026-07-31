import { useState, useEffect } from 'react';
import './BootScreen.css';

export default function BootScreen({ team, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Play Apple-like startup chime with Web Audio API
  useEffect(() => {
    let ctx = null;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContext();
      
      const playTone = (freq, type, startTime, duration, maxGain = 0.12) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
        
        // Envelope: smooth attack & long acoustic decay
        gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
        gain.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + startTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };

      // F-Major 9 Harmonic Chime (Warm macOS Chime emulation)
      playTone(174.61, 'sine', 0, 3.8, 0.18);   // F3
      playTone(261.63, 'sine', 0, 3.5, 0.14);   // C4
      playTone(349.23, 'sine', 0, 3.2, 0.12);   // F4
      playTone(440.00, 'sine', 0, 3.0, 0.10);   // A4
      playTone(523.25, 'triangle', 0.02, 2.5, 0.04); // C5 accent
      playTone(587.33, 'sine', 0, 2.8, 0.08);   // D5
    } catch (e) {
      console.log('Audio Context unavailable:', e);
    }

    return () => {
      if (ctx && ctx.state !== 'closed') {
        try {
          ctx.close();
        } catch (e) {
          // Ignore cleanup error
        }
      }
    };
  }, []);

  // Simulate macOS Boot Progress bar filling smoothly
  useEffect(() => {
    const steps = [
      { target: 15, delay: 250 },
      { target: 35, delay: 650 },
      { target: 60, delay: 1200 },
      { target: 85, delay: 1900 },
      { target: 98, delay: 2500 },
      { target: 100, delay: 2800 }
    ];

    const timeouts = [];

    steps.forEach((step) => {
      const t = setTimeout(() => {
        setProgress(step.target);
      }, step.delay);
      timeouts.push(t);
    });

    // Handle complete & fade out into OS
    const finishTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600); // smooth CSS fade-out transition duration
    }, 3100);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="boot-content-wrapper">
        <div className="boot-logo-container">
          {team && team.logoUrl ? (
            <img src={team.logoUrl} alt={`${team.name} Logo`} className="boot-logo-img" />
          ) : (
            <svg className="boot-apple-svg" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.7.13-9.56-1.92-14.58-6.15-3.32-2.78-7.23-7.46-11.74-14.04-6.44-9.42-11.44-19.8-15-31.13-3.56-11.33-5.34-22.13-5.34-32.4 0-14.88 3.73-27.17 11.19-36.87 7.46-9.7 17.06-14.65 28.8-14.85 4.58 0 9.87 1.16 15.86 3.49 5.99 2.33 9.77 3.49 11.33 3.49 1.35 0 5.26-1.22 11.74-3.66 6.48-2.44 11.66-3.57 15.54-3.38 11.8.69 21.05 4.96 27.75 12.8-10.37 6.26-15.42 15.01-15.15 26.25.26 8.87 3.7 16.29 10.3 22.25 6.6 5.97 14.5 9.38 23.7 10.23-2.52 7.64-5.91 15.35-10.18 23.13zM119.22 31.06c0-6.9 2.51-13.47 7.54-19.72 5.03-6.25 11.33-9.98 18.9-11.19.26.96.39 1.86.39 2.7 0 6.91-2.56 13.57-7.68 19.98-5.12 6.41-11.4 10.19-18.84 11.34-.09-.64-.31-1.68-.31-3.11z" />
            </svg>
          )}
        </div>

        {/* Pure minimalist Apple Progress Bar */}
        <div className="boot-progress-track">
          <div 
            className="boot-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
