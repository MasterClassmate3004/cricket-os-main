import { ArrowUpRight, Check } from 'lucide-react';
import './PickTeam.css';

export default function PickTeam({ teams, currentTeam, onSelect }) {
  return (
    <section id="team-selection" className="team-selection">
      <div className="team-selection-intro">
        <div>
          <h2>Who are you following?</h2>
          <p>Tell me who you care about. I’ll carry that choice with you.</p>
        </div>
        <div className="selected-team-note">
          <span className="selected-team-dot" style={{ backgroundColor: currentTeam.accent }}></span>
          <span>You’re following <strong>{currentTeam.name}</strong></span>
        </div>
      </div>

      <div className="team-choice-grid">
        {teams.map(team => {
          const isActive = team.id === currentTeam.id;
          return (
            <button
              key={team.id}
              onClick={() => onSelect(team)}
              className={`team-choice ${isActive ? 'is-active' : ''}`}
              style={{ '--team-accent': team.accent, '--team-primary': team.primary }}
            >
              <span className="team-choice-topline">
                <img src={team.logoUrl} alt="" />
                {isActive && <span className="team-check"><Check size={14} /></span>}
              </span>
              <span className="team-choice-name">{team.name}</span>
              <span className="team-choice-drivers">{team.drivers.map(driver => driver.name).join(' · ')}</span>
              <span className="team-choice-action">{isActive ? 'Your team' : 'Follow this team'} <ArrowUpRight size={15} /></span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
