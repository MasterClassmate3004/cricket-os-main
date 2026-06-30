import './CalendarApp.css';

const TEAM_COLORS = {
  mercedes: '#27F4D2',
  ferrari: '#E80020'
};

const RACES_2026 = [
  { round: 1, country: 'Australia', track: 'Melbourne', date: '06-08 MAR', completed: true, winner: 'George Russell', team: 'mercedes' },
  { round: 2, country: 'China', track: 'Shanghai', date: '13-15 MAR', completed: true, winner: 'Kimi Antonelli', team: 'mercedes' },
  { round: 3, country: 'Japan', track: 'Suzuka', date: '27-29 MAR', completed: true, winner: 'Kimi Antonelli', team: 'mercedes' },
  { round: 4, country: 'Bahrain', track: 'Sakhir', date: '10-12 APR', completed: true, status: 'Cancelled' },
  { round: 5, country: 'Saudi Arabia', track: 'Jeddah', date: '17-19 APR', completed: true, status: 'Cancelled' },
  { round: 6, country: 'Miami', track: 'Miami', date: '01-03 MAY', completed: true, winner: 'Kimi Antonelli', team: 'mercedes' },
  { round: 7, country: 'Canada', track: 'Montreal', date: '22-24 MAY', completed: true, winner: 'Kimi Antonelli', team: 'mercedes' },
  { round: 8, country: 'Monaco', track: 'Monaco', date: '05-07 JUN', completed: true, winner: 'Kimi Antonelli', team: 'mercedes' },
  { round: 9, country: 'Spain', track: 'Barcelona - Catalunya', date: '12-14 JUN', completed: true, winner: 'Lewis Hamilton', team: 'ferrari' },
  { round: 10, country: 'Austria', track: 'Spielberg', date: '26-28 JUN', completed: true, winner: 'George Russell', team: 'mercedes' },
  { round: 11, country: 'Great Britain', track: 'Silverstone', date: '03-05 JUL', completed: false },
  { round: 12, country: 'Belgium', track: 'Spa-Francorchamps', date: '17-19 JUL', completed: false },
  { round: 13, country: 'Hungary', track: 'Budapest', date: '24-26 JUL', completed: false },
  { round: 14, country: 'Netherlands', track: 'Zandvoort', date: '21-23 AUG', completed: false },
  { round: 15, country: 'Italy', track: 'Monza', date: '04-06 SEP', completed: false },
  { round: 16, country: 'Spain', track: 'Madrid', date: '11-13 SEP', completed: false },
  { round: 17, country: 'Azerbaijan', track: 'Baku', date: '25-27 SEP', completed: false },
  { round: 18, country: 'Singapore', track: 'Singapore', date: '09-11 OCT', completed: false },
  { round: 19, country: 'United States', track: 'Austin', date: '23-25 OCT', completed: false },
  { round: 20, country: 'Mexico', track: 'Mexico City', date: '30 OCT-01 NOV', completed: false },
  { round: 21, country: 'Brazil', track: 'São Paulo', date: '06-08 NOV', completed: false },
  { round: 22, country: 'Las Vegas', track: 'Las Vegas', date: '19-21 NOV', completed: false },
  { round: 23, country: 'Qatar', track: 'Lusail', date: '27-29 NOV', completed: false },
  { round: 24, country: 'Abu Dhabi', track: 'Yas Island', date: '04-06 DEC', completed: false }
];

export default function CalendarApp() {
  return (
    <div className="calendar-app">
      <div className="calendar-header">
        <h2>2026 RACE CALENDAR</h2>
        <div className="season-progress">
          ROUND 11 OF 24
        </div>
      </div>
      <div className="race-list">
        {RACES_2026.map((race, index) => (
          <div 
            key={race.round} 
            className={`race-item ${race.completed ? 'completed' : ''}`}
            style={{ '--anim-delay': `${index * 0.15}s` }}
          >
            <div className="race-round">R{race.round}</div>
            <div className="race-details">
              <div className="race-country">{race.country}</div>
              <div className="race-track">{race.track}</div>
            </div>
            <div className="race-date" style={{ textAlign: 'right' }}>
              {race.status === 'Cancelled' ? (
                <span className="completed-stamp" style={{ color: '#888', textShadow: 'none' }}>CANCELLED</span>
              ) : race.completed && race.winner ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 'bold', letterSpacing: '1px' }}>WINNER</span>
                  <span style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1rem', 
                    color: TEAM_COLORS[race.team] || '#fff',
                    textShadow: `0 0 8px ${TEAM_COLORS[race.team]}80`
                  }}>
                    {race.winner}
                  </span>
                </div>
              ) : (
                race.date
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
