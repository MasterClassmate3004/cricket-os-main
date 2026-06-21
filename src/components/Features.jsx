import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Features() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll Pinned Animation
      gsap.to(sectionsRef.current, {
        xPercent: -100 * (sectionsRef.current.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sectionsRef.current.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ width: '100%', height: '100vh', display: 'flex', overflow: 'hidden', background: '#050505' }}>
      {/* Feature 1 */}
      <div 
        ref={el => sectionsRef.current[0] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Aerodynamic UI</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Zero drag. Total focus. A user interface stripped of unnecessary bloatware to deliver maximum downforce on your daily productivity. 
              The kernel is tuned to prioritize foreground tasks exactly like an MGU-K deploys power.
            </p>
          </div>
          <div style={{ flex: 1, height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-color)' }}>
             <span style={{ fontSize: '4rem', color: 'var(--accent-color)', opacity: 0.5 }}>UI/UX</span>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div 
        ref={el => sectionsRef.current[1] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Pit Stop Updates</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Why wait minutes for an OS update when an F1 car changes 4 tires in 2 seconds? 
              Our A/B partition system allows for seamless, blazing-fast background updates. A quick reboot, and you're back on track.
            </p>
          </div>
          <div style={{ flex: 1, height: '300px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary-color)' }}>
             <span style={{ fontSize: '4rem', color: 'var(--primary-color)', opacity: 0.5 }}>UPDATE</span>
          </div>
        </div>
      </div>
      
      {/* Feature 3 */}
      <div 
        ref={el => sectionsRef.current[2] = el}
        style={{ minWidth: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
      >
        <div className="glass-panel" style={{ width: '80%', maxWidth: '1000px', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Telemetry Dashboard</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Real-time system diagnostics right at your fingertips. Monitor CPU temps, memory allocation, and thermal performance with the precision of a race engineer.
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
