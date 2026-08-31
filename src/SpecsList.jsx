import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SpecsList() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionsRef.current, {
        xPercent: -100 * (sectionsRef.current.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.5,
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ width: '100%', height: '100vh', display: 'flex', overflow: 'hidden', background: '#050505' }}>
      <div 
        ref={el => sectionsRef.current[0] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Clean Layout</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              No useless widgets. Just a straightforward desktop environment built on React. Perfect for timing checking and team tracking.
            </p>
          </div>
          <div style={{ flex: 1, height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-color)' }}>
             <span style={{ fontSize: '4rem', color: 'var(--accent-color)', opacity: 0.5 }}>UI/UX</span>
          </div>
        </div>
      </div>

      <div 
        ref={el => sectionsRef.current[1] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Fast Booting</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              The workspace loads quickly using a custom mock boot loader. Reset or pit stop the car in less than 3 seconds whenever you like.
            </p>
          </div>
          <div style={{ flex: 1, height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary-color)' }}>
             <span style={{ fontSize: '4rem', color: 'var(--primary-color)', opacity: 0.5 }}>UPDATE</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={el => sectionsRef.current[2] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>System Info</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Keep an eye on system details like active CPU temp indicators on the taskbar and battery storage percentages in the settings dial.
            </p>
          </div>
          <div style={{ flex: 1, height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
             <img src="/assets/telemetry.png" alt="Telemetry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
