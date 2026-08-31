import { useState, useEffect } from 'react';
import './TelemetryApp.css';

const DRIVERS_2026 = [
  { name: 'VER', fullName: 'Max Verstappen', team: 'red-bull', no: 1 },
  { name: 'HAD', fullName: 'Isack Hadjar', team: 'red-bull', no: 37 },
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
  { name: 'LIN', fullName: 'Arvid Lindblad', team: 'racing-bulls', no: 6 },
  { name: 'LAW', fullName: 'Liam Lawson', team: 'racing-bulls', no: 30 },
  { name: 'HUL', fullName: 'Nico Hulkenberg', team: 'audi', no: 27 },
  { name: 'BOR', fullName: 'Gabriel Bortoleto', team: 'audi', no: 85 },
  { name: 'OCO', fullName: 'Esteban Ocon', team: 'haas', no: 31 },
  { name: 'BEA', fullName: 'Oliver Bearman', team: 'haas', no: 87 },
  { name: 'GAS', fullName: 'Pierre Gasly', team: 'alpine', no: 10 },
  { name: 'COL', fullName: 'Franco Colapinto', team: 'alpine', no: 43 },
  { name: 'PER', fullName: 'Sergio Perez', team: 'cadillac', no: 11 },
  { name: 'BOT', fullName: 'Valtteri Bottas', team: 'cadillac', no: 77 }
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

const buildLeaderboard = () => {
  const mustBeTop4 = ['HAM', 'RUS', 'ANT', 'VER'];
  const topPool = ['HAD', 'LEC', 'NOR', 'PIA', 'LIN', 'LAW', 'GAS', 'COL'];
  const midPool = ['BEA', 'OCO', 'ALB', 'SAI', 'BOR', 'HUL'];
  const bottom4Pool = ['STR', 'ALO', 'PER', 'BOT'];
  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  const shuffledTopPool = shuffle([...topPool]);
  const top6Names = [...mustBeTop4, ...shuffledTopPool.splice(0, 2)];
  const pos7to10Names = shuffledTopPool.splice(0, 4);
  const pos11to18Names = shuffle([...midPool, ...shuffledTopPool]);

  const getBaseTime = (name) => {
    if (top6Names.includes(name)) return 70;
    if (pos7to10Names.includes(name)) return 76;
    if (pos11to18Names.includes(name)) return 82;
    if (bottom4Pool.includes(name)) return 88;
    return 82;
  };

  const initialData = DRIVERS_2026.map(driver => ({
    ...driver,
    lapTime: generateLapTime(getBaseTime(driver.name)),
    s1: generateSector(),
    s2: generateSector(),
    s3: generateSector(),
    gap: 0,
    tyre: ['S', 'M', 'H'][Math.floor(Math.random() * 3)]
  })).sort((a, b) => a.lapTime.localeCompare(b.lapTime));

  const parseTime = (str) => {
    const [minutes, seconds] = str.split(':');
    return parseInt(minutes) * 60 + parseFloat(seconds);
  };
  const baseTime = parseTime(initialData[0].lapTime);

  return initialData.map((driver, index) => {
    if (index === 0) return { ...driver, gap: 'Interval' };
    const diff = parseTime(driver.lapTime) - baseTime;
    return { ...driver, gap: `+${diff.toFixed(3)}s` };
  });
};

export default function TelemetryApp() {
  const [leaderboard, setLeaderboard] = useState(buildLeaderboard);

  useEffect(() => {
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
          <p className="telemetry-kicker">Practice session · live order</p>
          <h3>Who’s quickest right now?</h3>
        </div>
        <div className="weather-info">
          <span>Air 24°C</span>
          <span>Track 31°C</span>
          <span>Humidity 45%</span>
        </div>
      </div>
      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>#</th>
              <th style={{ textAlign: 'center' }}>Car</th>
              <th style={{ textAlign: 'left' }}>Driver</th>
              <th style={{ textAlign: 'center' }}>Tyre</th>
              <th style={{ textAlign: 'right' }}>Lap</th>
              <th style={{ textAlign: 'right' }}>Gap</th>
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
