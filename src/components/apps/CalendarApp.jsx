import './CalendarApp.css';

const RACES_2026 = [
  { round: 1, country: 'Bahrain', track: 'Bahrain International Circuit', date: '01 MAR', completed: true },
  { round: 2, country: 'Saudi Arabia', track: 'Jeddah Corniche Circuit', date: '08 MAR', completed: true },
  { round: 3, country: 'Australia', track: 'Albert Park Circuit', date: '22 MAR', completed: false },
  { round: 4, country: 'Japan', track: 'Suzuka International Racing Course', date: '05 APR', completed: false },
  { round: 5, country: 'China', track: 'Shanghai International Circuit', date: '19 APR', completed: false },
  { round: 6, country: 'Miami', track: 'Miami International Autodrome', date: '03 MAY', completed: false },
  { round: 7, country: 'Emilia Romagna', track: 'Imola Circuit', date: '17 MAY', completed: false },
  { round: 8, country: 'Monaco', track: 'Circuit de Monaco', date: '24 MAY', completed: false }
];

export default function CalendarApp() {
  return (
    <div className="calendar-app">
      <div className="calendar-header">
        <h2>2026 RACE CALENDAR</h2>
        <div className="season-progress">
          ROUND 3 OF 24
        </div>
      </div>
      <div className="race-list">
        {RACES_2026.map(race => (
          <div key={race.round} className={`race-item ${race.completed ? 'completed' : ''}`}>
            <div className="race-round">R{race.round}</div>
            <div className="race-details">
              <div className="race-country">{race.country}</div>
              <div className="race-track">{race.track}</div>
            </div>
            <div className="race-date">{race.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
