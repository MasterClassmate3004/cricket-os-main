import { useState, useEffect } from 'react';
import { teams, defaultTeam } from './data/teams';
import Loader from './components/PageLoader';
import Hero from './components/Hero';
import Features from './components/SpecsList';
import Benchmarks from './components/StatsShow';
import TeamSelector from './components/PickTeam';
import Startup from './components/Startup';
import Desktop from './components/Desktop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedTeam, setSelectedTeam] = useState(defaultTeam);
  const [loading, setLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [isOSActive, setIsOSActive] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', selectedTeam.primary);
    document.documentElement.style.setProperty('--accent-color', selectedTeam.accent);
    document.documentElement.style.setProperty('--bg-dark', selectedTeam.dark);
  }, [selectedTeam]);

  const handleIgnite = () => {
    setIsBooting(true);
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    setIsOSActive(true);
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {isBooting && (
        <Startup team={selectedTeam} onComplete={handleBootComplete} />
      )}

      {!loading && !isOSActive && !isBooting && (
        <div className="app-fade-in">
          <div className="grid-bg"></div>
          <Hero team={selectedTeam} onIgnite={handleIgnite} />
          <Features />
          <Benchmarks team={selectedTeam} />
          <TeamSelector teams={teams} currentTeam={selectedTeam} onSelect={setSelectedTeam} />

          <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)' }}>
            <p>Formula 1 OS - Prototype V2.0</p>
          </footer>
        </div>
      )}

      {!loading && isOSActive && !isBooting && (
        <Desktop team={selectedTeam} onExit={() => setIsOSActive(false)} />
      )}
    </>
  );
}

export default App;
