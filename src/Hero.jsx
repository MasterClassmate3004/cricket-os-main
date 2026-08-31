import { useEffect, useRef } from 'react';
import { Power, Terminal, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero({ team, onIgnite }) {
  const bgTextRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      
      gsap.from(carRef.current, {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, [team.id]);

  return (
    <section className="hero-container">
      <nav className="top-nav">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings className="gear-icon" size={24} /> F1 OS
        </div>
        <div className="status-bar">
          <span>TEAM: {team.name}</span>
          <span style={{ color: 'var(--accent-color)' }}>STATUS: OK</span>
        </div>
      </nav>

      <h1 className="bg-text" ref={bgTextRef}>THE GRID</h1>

      <div className="hero-content">
        <div className="glass-panel main-panel">
          <h2 className="hero-heading">
            F1 Web Desktop <br/>
            <span style={{ color: 'var(--accent-color)' }}>Dashboard</span>
          </h2>
          <p className="hero-tagline">
            A simple web desktop concept themed after F1. Open timing leaderboards, view driver databases, and adjust steering wheel telemetry modes.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onIgnite}>
              <Power size={20} /> Launch OS
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('team-selection').scrollIntoView({ behavior: 'smooth' })}>
              <Terminal size={20} /> Choose Team
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
          style={{ filter: team.filter || 'none' }} 
        />
        <div className="car-gradient-mask"></div>
      </div>
    </section>
  );
}
