import { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, CalendarDays, Gauge, UsersRound } from 'lucide-react';
import { gsap } from 'gsap';
import './Hero.css';

export default function Hero({ team, onIgnite, onChooseTeam }) {
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
        <div className="logo">
          <span className="logo-mark">R</span>
          <span>Race Day</span>
        </div>
        <div className="status-bar">
          <span className="following-dot" style={{ backgroundColor: team.accent }}></span>
          <span>Following {team.name}</span>
          <button className="change-team-button" onClick={onChooseTeam}>Change team</button>
        </div>
      </nav>

      <div className="bg-text" ref={bgTextRef}>RACE DAY</div>

      <div className="hero-content">
        <div className="main-panel">
          <h1 className="hero-heading">What are you in the mood for?</h1>
          <p className="hero-tagline">
            Pick a starting point. You can always change your mind.
          </p>
          <div className="choice-list">
            <button className="choice-card choice-card-featured" onClick={() => onIgnite('telemetry')}>
              <span className="choice-icon"><Gauge size={20} /></span>
              <span className="choice-copy">
                <strong>See who’s quickest</strong>
                <span>Check the live order and gaps.</span>
              </span>
              <ArrowRight className="choice-arrow" size={20} />
            </button>
            <button className="choice-card" onClick={() => onIgnite('teaminfo')}>
              <span className="choice-icon"><UsersRound size={20} /></span>
              <span className="choice-copy">
                <strong>Stay close to {team.name}</strong>
                <span>Drivers, results, and the season so far.</span>
              </span>
              <ArrowRight className="choice-arrow" size={20} />
            </button>
            <button className="choice-card" onClick={() => onIgnite('calendar')}>
              <span className="choice-icon"><CalendarDays size={20} /></span>
              <span className="choice-copy">
                <strong>Find the next race</strong>
                <span>See where the paddock is heading.</span>
              </span>
              <ArrowRight className="choice-arrow" size={20} />
            </button>
            <button className="choice-card" onClick={() => onIgnite('wiki')}>
              <span className="choice-icon"><BookOpen size={20} /></span>
              <span className="choice-copy">
                <strong>Learn something new</strong>
                <span>Search the F1 basics and driver stories.</span>
              </span>
              <ArrowRight className="choice-arrow" size={20} />
            </button>
          </div>
          <p className="hero-note">You choose the pace. The rest can wait.</p>
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
        <div className="hero-art-caption">
          <span>Right now</span>
          <strong>{team.name}</strong>
          <small>{team.drivers.map(driver => driver.name).join(' · ')}</small>
        </div>
      </div>
    </section>
  );
}
