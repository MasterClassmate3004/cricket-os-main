import { useState, useEffect } from 'react';
import './TelemetryApp.css';

const DRIVERS_2026 = [
  { name: 'VER', fullName: 'Max Verstappen', team: 'Red Bull' },
  { name: 'LAW', fullName: 'Liam Lawson', team: 'Red Bull' },
  { name: 'LEC', fullName: 'Charles Leclerc', team: 'Ferrari' },
  { name: 'HAM', fullName: 'Lewis Hamilton', team: 'Ferrari' },
  { name: 'NOR', fullName: 'Lando Norris', team: 'McLaren' },
  { name: 'PIA', fullName: 'Oscar Piastri', team: 'McLaren' },
  { name: 'RUS', fullName: 'George Russell', team: 'Mercedes' },
  { name: 'ANT', fullName: 'Kimi Antonelli', team: 'Mercedes' },
  { name: 'ALO', fullName: 'Fernando Alonso', team: 'Aston Martin' },
  { name: 'STR', fullName: 'Lance Stroll', team: 'Aston Martin' },
  { name: 'ALB', fullName: 'Alexander Albon', team: 'Williams' },
  { name: 'SAI', fullName: 'Carlos Sainz', team: 'Williams' },
  { name: 'TSU', fullName: 'Yuki Tsunoda', team: 'Racing Bulls' },
  { name: 'HAD', fullName: 'Isack Hadjar', team: 'Racing Bulls' },
  { name: 'HUL', fullName: 'Nico Hulkenberg', team: 'Audi' },
  { name: 'BOR', fullName: 'Gabriel Bortoleto', team: 'Audi' },
  { name: 'OCO', fullName: 'Esteban Ocon', team: 'Haas' },
  { name: 'BEA', fullName: 'Oliver Bearman', team: 'Haas' },
  { name: 'GAS', fullName: 'Pierre Gasly', team: 'Alpine' },
  { name: 'DOO', fullName: 'Jack Doohan', team: 'Alpine' }
];

const generateLapTime = (base = 80) => {
  const time = base + Math.random() * 5;
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(3).padStart(6, '0');
  return `${minutes}:${seconds}`;
};

const generateSector = () => {
  return (20 + Math.random() * 5).toFixed(1);
};

export default function TelemetryApp() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Initial generation
    const initialData = DRIVERS_2026.map(driver => ({
      ...driver,
      lapTime: generateLapTime(),
      s1: generateSector(),
      s2: generateSector(),
      s3: generateSector(),
      gap: 0,
      tyre: ['S', 'M', 'H'][Math.floor(Math.random() * 3)]
    })).sort((a, b) => {
      if (a.lapTime < b.lapTime) return -1;
      if (a.lapTime > b.lapTime) return 1;
      return 0;
    });
    
    // Calculate gaps
    const baseTimeStr = initialData[0].lapTime;
    const parseTime = (str) => {
      const [m, s] = str.split(':');
      return parseInt(m) * 60 + parseFloat(s);
    };
    const baseTime = parseTime(baseTimeStr);

    const dataWithGaps = initialData.map((d, i) => {
      if (i === 0) return { ...d, gap: 'Interval' };
      const diff = parseTime(d.lapTime) - baseTime;
      return { ...d, gap: `+${diff.toFixed(3)}s` };
    });

    setLeaderboard(dataWithGaps);

    // Random updates simulation
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const newData = [...prev];
        const randomIdx = Math.floor(Math.random() * newData.length);
        newData[randomIdx].s1 = generateSector();
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="telemetry-app">
      <div className="telemetry-header">
        <div className="track-info">
          <h3>BAHRAIN GRAND PRIX 2026</h3>
          <p>LIVE TIMING - FP1</p>
        </div>
        <div className="weather-info">
          <span>AIR: 24°C</span>
          <span>TRACK: 31°C</span>
          <span>HUMIDITY: 45%</span>
        </div>
      </div>
      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>POS</th>
              <th>NO</th>
              <th>DRIVER</th>
              <th>TYRE</th>
              <th>LAP TIME</th>
              <th>GAP</th>
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((driver, index) => (
              <tr key={driver.name}>
                <td>{index + 1}</td>
                <td className="driver-no">{(index * 3 + 1)}</td>
                <td className="driver-name">
                  <span className={`team-color ${driver.team.replace(/\s+/g, '-').toLowerCase()}`}></span>
                  {driver.name}
                </td>
                <td className={`tyre tyre-${driver.tyre}`}>{driver.tyre}</td>
                <td className="lap-time">{driver.lapTime}</td>
                <td className="gap">{driver.gap}</td>
                <td className="sector">{driver.s1}</td>
                <td className="sector">{driver.s2}</td>
                <td className="sector">{driver.s3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
