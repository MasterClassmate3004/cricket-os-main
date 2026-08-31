import './TeamInfoApp.css';
import { Trophy, Calendar, MapPin, Target } from 'lucide-react';

export default function TeamInfoApp({ team }) {
  if (!team || !team.stats) return <div>No team data available</div>;

  return (
    <div className="team-info-app">
      <div className="team-info-header" style={{ borderColor: team.primary }}>
        <img src={team.logoUrl} alt={`${team.name} Logo`} className="team-info-logo" />
        <div className="team-info-title">
          <p className="team-info-kicker">The team you’re following</p>
          <h2>{team.name}</h2>
          <div className="team-meta">
            <span><MapPin size={14} /> {team.country}</span>
            <span><Calendar size={14} /> Racing since {team.established}</span>
          </div>
        </div>
      </div>
      
      <div className="team-stats-grid">
        <div className="stat-card">
          <Trophy className="stat-icon" style={{ color: team.primary }} />
          <div className="stat-value">{team.stats.wins}</div>
          <div className="stat-label">race wins</div>
        </div>
        <div className="stat-card">
          <Target className="stat-icon" style={{ color: team.accent }} />
          <div className="stat-value">{team.stats.podiums}</div>
          <div className="stat-label">podiums</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pts" style={{ color: team.primary }}>PTS</div>
          <div className="stat-value">{team.stats.points}</div>
          <div className="stat-label">championship points</div>
        </div>
      </div>

      <div className="team-details">
        <div className="detail-row">
          <span className="detail-label">Team principal</span>
          <span className="detail-value">{team.principal}</span>
        </div>
      </div>

      <div className="team-drivers">
        <h3>The people you’re following</h3>
        <div className="drivers-grid">
          {team.drivers.map(driver => (
            <div key={driver.code} className="driver-card" style={{ borderLeftColor: team.primary }}>
              <div className="driver-name">
                <strong>{driver.name}</strong> 
                <span className="driver-code">{driver.code}</span>
              </div>
              <div className="driver-country">{driver.country}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
