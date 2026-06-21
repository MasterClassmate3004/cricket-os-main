import { useState, useEffect } from 'react';
import { teams, defaultTeam } from './data/teams';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Features from './components/Features';
import Benchmarks from './components/Benchmarks';
import TeamSelector from './components/TeamSelector';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedTeam, setSelectedTeam] = useState(defaultTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', selectedTeam.primary);
    document.documentElement.style.setProperty('--accent-color', selectedTeam.accent);
    document.documentElement.style.setProperty('--bg-dark', selectedTeam.dark);
  }, [selectedTeam]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="app-fade-in">
          <div className="grid-bg"></div>
          <Hero team={selectedTeam} />
          <Features />
          <Benchmarks team={selectedTeam} />
          <TeamSelector teams={teams} currentTeam={selectedTeam} onSelect={setSelectedTeam} />
          
          <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)' }}>
            <p>Formula 1 OS - Prototype V2.0</p>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
