import { useState, useEffect } from 'react';
import { Sliders, Settings, ShieldAlert, Zap, Compass, Disc } from 'lucide-react';
import './SettingsApp.css';

export default function SettingsApp({ team }) {
  // State for simulated ECU parameters
  const [stratMode, setStratMode] = useState('STRAT 2');
  const [mgukMode, setMgukMode] = useState('BALANCED');
  const [brakeBalance, setBrakeBalance] = useState(54.5);
  const [diffEntry, setDiffEntry] = useState(6);
  const [diffMid, setDiffMid] = useState(5);
  const [tireCompound, setTireCompound] = useState('MEDIUM');
  const [drsStatus, setDrsStatus] = useState(false);
  const [engineTemp, setEngineTemp] = useState(105);
  const [ersStore, setErsStore] = useState(88);

  // Simulated live telemetric variation
  useEffect(() => {
    const interval = setInterval(() => {
      // Vary engine temp slightly depending on Strat mode
      const targetTemp = 
        stratMode === 'STRAT 1' ? 112 : 
        stratMode === 'STRAT 3' ? 98 : 105;
      
      setEngineTemp(prev => {
        const diff = targetTemp - prev;
        const change = Math.sign(diff) * (Math.random() * 0.5 + 0.1);
        return parseFloat((prev + change).toFixed(1));
      });

      // Vary ERS depending on MGU-K mode
      setErsStore(prev => {
        if (mgukMode === 'HOT LAP' || mgukMode === 'OVERTAKE') {
          const consume = Math.random() * 1.5 + 0.5;
          return Math.max(0, parseFloat((prev - consume).toFixed(1)));
        } else if (mgukMode === 'HARVEST') {
          const gain = Math.random() * 1.2 + 0.6;
          return Math.min(100, parseFloat((prev + gain).toFixed(1)));
        } else {
          // Balanced: stays relatively stable
          const drift = (Math.random() - 0.5) * 0.4;
          return Math.max(0, Math.min(100, parseFloat((prev + drift).toFixed(1))));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stratMode, mgukMode]);

  return (
    <div className="settings-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      {/* Steering Wheel Display Panel */}
      <div className="wheel-display">
        <div className="display-row">
          <div className="display-stat">
            <span className="stat-label">ENG TEMP</span>
            <span className={`stat-val ${engineTemp > 110 ? 'alert' : ''}`}>{engineTemp}°C</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">ERS STORE</span>
            <span className="stat-val highlight">{ersStore}%</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">DRS</span>
            <span className={`stat-val ${drsStatus ? 'active' : 'inactive'}`}>
              {drsStatus ? 'ENABLED' : 'CLOSED'}
            </span>
          </div>
        </div>

        {/* LED Rev Indicator */}
        <div className="rev-lights">
          <span className="light green active"></span>
          <span className="light green active"></span>
          <span className="light green active"></span>
          <span className="light red active"></span>
          <span className="light red active"></span>
          <span className="light red active"></span>
          <span className="light blue active"></span>
          <span className="light blue"></span>
          <span className="light blue"></span>
        </div>
      </div>

      {/* Main Parameters Grid */}
      <div className="settings-grid">
        {/* Left Side: Powertrain Configurations */}
        <div className="settings-card">
          <h3><Zap size={16} /> POWERTRAIN CONFIG</h3>
          
          {/* Strat mode */}
          <div className="config-item">
            <label className="config-label">ICE Map (Engine Mode)</label>
            <div className="strat-buttons">
              {['STRAT 1', 'STRAT 2', 'STRAT 3', 'STRAT 4'].map(mode => (
                <button
                  key={mode}
                  className={`strat-btn ${stratMode === mode ? 'active' : ''}`}
                  onClick={() => setStratMode(mode)}
                >
                  {mode === 'STRAT 1' ? 'STRAT 1 (QUALY)' : 
                   mode === 'STRAT 2' ? 'STRAT 2 (RACE)' : 
                   mode === 'STRAT 3' ? 'STRAT 3 (ECO)' : 'STRAT 4 (SC)'}
                </button>
              ))}
            </div>
          </div>

          {/* MGU-K mode */}
          <div className="config-item">
            <label className="config-label">MGU-K Deployment</label>
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
        </div>

        {/* Right Side: Dynamics & Aero */}
        <div className="settings-card">
          <h3><Sliders size={16} /> VEHICLE DYNAMICS</h3>

          {/* Brake Balance */}
          <div className="config-item">
            <div className="slider-header">
              <label className="config-label">Brake Balance (BBAL)</label>
              <span className="slider-value">{brakeBalance}% FRONT</span>
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
            <div className="slider-endpoints">
              <span>50% REAR</span>
              <span>62% FRONT</span>
            </div>
          </div>

          {/* Differential Controls */}
          <div className="diff-controls-row">
            <div className="diff-item">
              <label className="config-label">Diff Entry</label>
              <div className="dial-container">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={diffEntry} 
                  onChange={(e) => setDiffEntry(parseInt(e.target.value))}
                  className="wheel-slider mini"
                />
                <span className="dial-val">{diffEntry}</span>
              </div>
            </div>
            <div className="diff-item">
              <label className="config-label">Diff Mid</label>
              <div className="dial-container">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={diffMid} 
                  onChange={(e) => setDiffMid(parseInt(e.target.value))}
                  className="wheel-slider mini"
                />
                <span className="dial-val">{diffMid}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Aero / Chassis */}
        <div className="settings-card full-width">
          <h3><Compass size={16} /> AERO &amp; CHASSIS MODES</h3>
          
          <div className="bottom-layout">
            {/* Tire selector */}
            <div className="compound-selector">
              <label className="config-label">Active Tyre Compound</label>
              <div className="tyre-buttons">
                {['SOFT', 'MEDIUM', 'HARD', 'WET'].map(comp => (
                  <button
                    key={comp}
                    className={`tyre-btn ${comp.toLowerCase()} ${tireCompound === comp ? 'active' : ''}`}
                    onClick={() => setTireCompound(comp)}
                  >
                    <Disc size={12} className="tyre-icon" />
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            {/* DRS Wing Flap */}
            <div className="drs-toggle-container">
              <label className="config-label">DRS Rear Wing Flap</label>
              <div className="drs-switch-wrap">
                <button
                  className={`drs-switch-btn ${!drsStatus ? 'active' : ''}`}
                  onClick={() => setDrsStatus(false)}
                >
                  CLOSED
                </button>
                <button
                  className={`drs-switch-btn enabled ${drsStatus ? 'active' : ''}`}
                  onClick={() => setDrsStatus(true)}
                >
                  OPEN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-footer">
        <ShieldAlert size={12} /> ECU parameters sync directly to car telemetry. Adjust wheel dials to modulate chassis behavior.
      </div>
    </div>
  );
}
