import { useState, useEffect } from 'react';
import './TelemetryApp.css';

const DRIVERS_2026 = [
  { name: 'VER', fullName: 'Max Verstappen', team: 'red-bull', no: 1 },
  { name: 'LAW', fullName: 'Liam Lawson', team: 'red-bull', no: 30 },
  { name: 'LEC', fullName: 'Charles Leclerc', team: 'ferrari', no: 16 },
  { name: 'HAM', fullName: 'Lewis Hamilton', team: 'ferrari', no: 44 },
  { name: 'NOR', fullName: 'Lando Norris', team: 'mclaren', no: 4 },
  { name: 'PIA', fullName: 'Oscar Piastri', team: 'mclaren', no: 81 },
  { name: 'RUS', fullName: 'George Russell', team: 'mercedes', no: 63 },
  { name: 'ANT', fullName: 'Kimi Antonelli', team: 'mercedes', no: 12 },
  { name: 'ALO', fullName: 'Fernando Alonso', team: 'aston-martin', no: 14 },
  { name: 'STR', fullName: 'Lance Stroll', team: 'aston-martin', no: 18 },
  { name: 'ALB', fullName: 'Alexander Albon', team: 'williams', no: 23 },
  { name: 'SAI', fullName: 'Carlos Sainz', team: 'williams', no: 55 },
  { name: 'TSU', fullName: 'Yuki Tsunoda', team: 'racing-bulls', no: 22 },
  { name: 'HAD', fullName: 'Isack Hadjar', team: 'racing-bulls', no: 37 },
  { name: 'HUL', fullName: 'Nico Hulkenberg', team: 'audi', no: 27 },
  { name: 'BOR', fullName: 'Gabriel Bortoleto', team: 'audi', no: 85 },
  { name: 'OCO', fullName: 'Esteban Ocon', team: 'haas', no: 31 },
  { name: 'BEA', fullName: 'Oliver Bearman', team: 'haas', no: 87 },
  { name: 'GAS', fullName: 'Pierre Gasly', team: 'alpine', no: 10 },
  { name: 'DOO', fullName: 'Jack Doohan', team: 'alpine', no: 7 },
  { name: 'HER', fullName: 'Colton Herta', team: 'cadillac', no: 26 },
  { name: 'PAL', fullName: 'Alex Palou', team: 'cadillac', no: 28 }
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
              <th style={{ textAlign: 'center' }}>POS</th>
              <th style={{ textAlign: 'center' }}>NO</th>
              <th style={{ textAlign: 'left' }}>DRIVER</th>
              <th style={{ textAlign: 'center' }}>TYRE</th>
              <th style={{ textAlign: 'right' }}>LAP TIME</th>
              <th style={{ textAlign: 'right' }}>GAP</th>
              <th style={{ textAlign: 'right' }}>S1</th>
              <th style={{ textAlign: 'right' }}>S2</th>
              <th style={{ textAlign: 'right' }}>S3</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((driver, index) => (
              <tr key={driver.name}>
                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                <td style={{ textAlign: 'center' }} className="driver-no">{driver.no}</td>
                <td style={{ textAlign: 'left' }} className="driver-name">
                  <span className={`team-color ${driver.team}`}></span>
                  {driver.name}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`tyre tyre-${driver.tyre}`}>{driver.tyre}</span>
                </td>
                <td style={{ textAlign: 'right' }} className="lap-time">{driver.lapTime}</td>
                <td style={{ textAlign: 'right' }} className="gap">{driver.gap}</td>
                <td style={{ textAlign: 'right' }} className="sector">{driver.s1}</td>
                <td style={{ textAlign: 'right' }} className="sector">{driver.s2}</td>
                <td style={{ textAlign: 'right' }} className="sector">{driver.s3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
