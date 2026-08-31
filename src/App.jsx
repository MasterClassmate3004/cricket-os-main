import { useState, useEffect } from 'react';
import { teams, defaultTeam } from './teams';
import Loader from './PageLoader';
import Hero from './Hero';
import TeamSelector from './PickTeam';
import Startup from './Startup';
import Desktop from './Desktop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedTeam, setSelectedTeam] = useState(defaultTeam);
  const [loading, setLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [isOSActive, setIsOSActive] = useState(false);
  const [startIntent, setStartIntent] = useState('telemetry');

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', selectedTeam.primary);
    document.documentElement.style.setProperty('--accent-color', selectedTeam.accent);
    document.documentElement.style.setProperty('--bg-dark', selectedTeam.dark);
  }, [selectedTeam]);

  const handleIgnite = (intent = 'telemetry') => {
    setStartIntent(intent);
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
          <Hero
            team={selectedTeam}
            onIgnite={handleIgnite}
            onChooseTeam={() => document.getElementById('team-selection')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <TeamSelector teams={teams} currentTeam={selectedTeam} onSelect={setSelectedTeam} />

          <footer className="site-footer">
            <p>Made for the races you care about.</p>
          </footer>
        </div>
      )}

      {!loading && isOSActive && !isBooting && (
        <Desktop
          team={selectedTeam}
          initialApp={startIntent}
          onExit={() => setIsOSActive(false)}
        />
      )}
    </>
  );
}

export default App;
