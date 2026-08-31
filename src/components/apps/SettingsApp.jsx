import { useState, useEffect } from 'react';
import './SettingsApp.css';

export default function SettingsApp({ team }) {
  const [stratMode, setStratMode] = useState('STRAT 2');
  const [mgukMode, setMgukMode] = useState('BALANCED');
  const [brakeBalance, setBrakeBalance] = useState(54.5);
  const [diffEntry, setDiffEntry] = useState(6);
  const [diffMid, setDiffMid] = useState(5);
  const [tireCompound, setTireCompound] = useState('MEDIUM');
  const [drsStatus, setDrsStatus] = useState(false);
  const [engineTemp, setEngineTemp] = useState(105);
  const [ersStore, setErsStore] = useState(88);

  useEffect(() => {
    const interval = setInterval(() => {
      const targetTemp = stratMode === 'STRAT 1' ? 112 : stratMode === 'STRAT 3' ? 98 : 105;
      setEngineTemp(prev => {
        const diff = targetTemp - prev;
        return parseFloat((prev + diff * 0.1 + (Math.random() - 0.5) * 0.2).toFixed(1));
      });
      setErsStore(prev => {
        if (mgukMode === 'HOT LAP' || mgukMode === 'OVERTAKE') {
          return Math.max(0, parseFloat((prev - (Math.random() * 0.5 + 0.2)).toFixed(1)));
        } else if (mgukMode === 'HARVEST') {
          return Math.min(100, parseFloat((prev + (Math.random() * 0.4 + 0.2)).toFixed(1)));
        }
        return Math.max(0, Math.min(100, parseFloat((prev + (Math.random() - 0.5) * 0.1).toFixed(1))));
      });
    }, 500);
    return () => clearInterval(interval);
  }, [stratMode, mgukMode]);

  return (
    <div className="settings-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      {/* LED Rev Indicator */}
      <div className="rev-lights">
        {[...Array(15)].map((_, i) => {
          const color = i < 5 ? 'green' : i < 10 ? 'red' : 'blue';
          return <span key={i} className={`light ${color} active`} />;
        })}
      </div>

      {/* Telemetry LCD Panel */}
      <div className="wheel-display">
        <div className="display-grid">
          <div className="display-stat">
            <span className="stat-label">ENG TEMP</span>
            <span className={`stat-val ${engineTemp > 110 ? 'alert' : ''}`}>{engineTemp}°C</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">ERS STORE</span>
            <span className="stat-val highlight">{ersStore}%</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">DRS STATUS</span>
            <span className={`stat-val ${drsStatus ? 'active' : 'inactive'}`}>
              {drsStatus ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Dials / Buttons */}
      <div className="settings-grid">
        {/* Row 1: Powertrain & Energy */}
        <div className="settings-card">
          <div className="card-header">ICE MAPPING</div>
          <div className="strat-buttons">
            {['STRAT 1', 'STRAT 2', 'STRAT 3', 'STRAT 4'].map(mode => (
              <button
                key={mode}
                className={`strat-btn ${stratMode === mode ? 'active' : ''}`}
                onClick={() => setStratMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">MGU-K DEPLOY</div>
          <div className="mguk-modes">
            {['HARVEST', 'BALANCED', 'OVERTAKE', 'HOT LAP'].map(mode => (
              <button
                key={mode}
                className={`mguk-btn ${mgukMode === mode ? 'active' : ''}`}
                onClick={() => setMgukMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Chassis & Tires */}
        <div className="settings-card">
          <div className="card-header">BRAKE BALANCE / DIFF</div>
          <div className="bbal-control">
            <div className="control-header">
              <span>BBAL</span>
              <span className="highlight">{brakeBalance}%</span>
            </div>
            <input 
              type="range" 
              min="50.0" 
              max="62.0" 
              step="0.5"
              value={brakeBalance} 
              onChange={(e) => setBrakeBalance(parseFloat(e.target.value))}
              className="wheel-slider"
            />
          </div>
          <div className="diff-row">
            <div className="diff-col">
              <span>DIFF IN: {diffEntry}</span>
              <input 
                type="range" min="1" max="10" value={diffEntry} 
                onChange={(e) => setDiffEntry(parseInt(e.target.value))}
                className="wheel-slider"
              />
            </div>
            <div className="diff-col">
              <span>DIFF MID: {diffMid}</span>
              <input 
                type="range" min="1" max="10" value={diffMid} 
                onChange={(e) => setDiffMid(parseInt(e.target.value))}
                className="wheel-slider"
              />
            </div>
          </div>
        </div>

        <div className="settings-card flex-card">
          <div className="card-header">TYRES / DRS</div>
          <div className="tyre-grid">
            {['SOFT', 'MEDIUM', 'HARD', 'WET'].map(comp => (
              <button
                key={comp}
                className={`tyre-btn ${comp.toLowerCase()} ${tireCompound === comp ? 'active' : ''}`}
                onClick={() => setTireCompound(comp)}
              >
                {comp}
              </button>
            ))}
          </div>
          <div className="drs-control">
            <button
              className={`drs-btn ${drsStatus ? 'active' : ''}`}
              onClick={() => setDrsStatus(!drsStatus)}
            >
              DRS: {drsStatus ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
