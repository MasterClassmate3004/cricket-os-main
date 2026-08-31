import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function StatsShow() {
  const sectionRef = useRef(null);
  const bootRef = useRef(null);
  const fpsRef = useRef(null);
  const latencyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      tl.from(sectionRef.current.querySelectorAll('.bench-card'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });

      gsap.to(bootRef.current, {
        innerHTML: 2.1,
        duration: 2,
        snap: { innerHTML: 0.1 },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      
      gsap.to(fpsRef.current, {
        innerHTML: 240,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.to(latencyRef.current, {
        innerHTML: 0.5,
        duration: 2,
        snap: { innerHTML: 0.1 },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 4rem', background: 'var(--bg-dark)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3.5rem', color: 'var(--primary-color)' }}>Real Stats</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Quick overview of system response times.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div className="bench-card glass-panel" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Boot Time</div>
          <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>
            <span ref={bootRef}>0</span>s
          </div>
          <p style={{ marginTop: '1rem' }}>vs ~15s standard OS boot</p>
        </div>

        <div className="bench-card glass-panel" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>UI Framerate</div>
          <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary-color)', fontFamily: 'var(--font-mono)' }}>
            <span ref={fpsRef}>0</span>
          </div>
          <p style={{ marginTop: '1rem' }}>Runs at 60+ fps smoothly</p>
        </div>

        <div className="bench-card glass-panel" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Input Latency</div>
          <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>
            <span ref={latencyRef}>0</span>ms
          </div>
          <p style={{ marginTop: '1rem' }}>Responsive input processing</p>
        </div>

      </div>
    </section>
  );
}
