import { useEffect, useRef } from 'react';
import { Power, Terminal, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero({ team }) {
  const bgTextRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Text Parallax
      gsap.to(bgTextRef.current, {
        y: 300,
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Car Parallax
      gsap.to(carRef.current, {
        y: -100,
        scale: 1.05,
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Car Entry Animation (runs every time team changes)
      gsap.from(carRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, [team.id]); // re-run animation on team change

  return (
    <section className="hero-container">
      <nav className="top-nav">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings className="gear-icon" size={24} /> F1 OS
        </div>
        <div className="status-bar">
          <span>TEAM: {team.name}</span>
          <span style={{ color: 'var(--accent-color)' }}>SYS: OPTIMAL</span>
        </div>
      </nav>

      <h1 className="bg-text" ref={bgTextRef}>THE GRID</h1>

      <div className="hero-content">
        <div className="glass-panel main-panel">
          <h2 className="hero-heading">
            Engineered for <br/>
            <span style={{ color: 'var(--accent-color)' }}>Performance</span>
          </h2>
          <p className="hero-tagline">
            A lightning-fast, highly-aerodynamic operating system experience. Driven by you.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">
              <Power size={20} /> Ignite Workspace
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('team-selection').scrollIntoView({ behavior: 'smooth' })}>
              <Terminal size={20} /> Select Constructor
            </button>
          </div>
        </div>
      </div>

      <div className="hero-car-wrapper" ref={carRef}>
        <img 
          src={team.imageUrl} 
          alt={`${team.name} F1 Car`} 
          className="hero-car" 
          key={team.id}
          style={{ filter: `hue-rotate(${team.hue || 0}deg) drop-shadow(-20px 20px 30px rgba(0,0,0,0.8))` }} 
        />
        <div className="car-gradient-mask"></div>
      </div>
    </section>
  );
}
