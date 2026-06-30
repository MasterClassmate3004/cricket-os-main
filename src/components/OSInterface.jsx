import { useState } from 'react';
import TopBar from './TopBar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import TelemetryApp from './apps/TelemetryApp';
import CalendarApp from './apps/CalendarApp';
import TeamInfoApp from './apps/TeamInfoApp';
import { Activity, Calendar } from 'lucide-react';
import './OSInterface.css';

export default function OSInterface({ team, onExit }) {
  const APPS = [
    { id: 'telemetry', label: 'Live Timing', icon: Activity, component: TelemetryApp, defaultPos: {x: 100, y: 50}, defaultSize: {width: 900, height: 600} },
    { id: 'calendar', label: 'Calendar', icon: Calendar, component: CalendarApp, defaultPos: {x: 150, y: 150}, defaultSize: {width: 500, height: 400} },
    { id: 'teaminfo', label: 'Team Info', iconUrl: team.logoUrl, component: TeamInfoApp, defaultPos: {x: 200, y: 100}, defaultSize: {width: 700, height: 500} }
  ];

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [showPowerDialog, setShowPowerDialog] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);

  const handleIconSelect = (id) => {
    setSelectedIcon(selectedIcon === id ? null : id);
  };

  const handleOpenApp = (id) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, zIndex: maxZIndex + 1 }]);
      setMaxZIndex(maxZIndex + 1);
    } else {
      handleWindowFocus(id);
    }
  };

  const handleWindowFocus = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(maxZIndex + 1);
  };

  const handleWindowClose = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  const handleReboot = () => {
    setShowPowerDialog(false);
    setIsRebooting(true);
    setOpenWindows([]);
    setSelectedIcon(null);

    // Play startup chime
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const playOscillator = (freq, type, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      };

      // F Major 9 chord (Apple-like warmth)
      playOscillator(174.61, 'sine', 3.5); // F3
      playOscillator(261.63, 'sine', 3.5); // C4
      playOscillator(349.23, 'sine', 3.0); // F4
      playOscillator(440.00, 'sine', 3.0); // A4
      playOscillator(587.33, 'sine', 3.0); // D5
    } catch (e) {
      console.log('Audio not supported or blocked');
    }

    setTimeout(() => {
      setIsRebooting(false);
    }, 2800);
  };

  return (
    <div className="os-interface app-fade-in" onClick={handleDesktopClick}>
      <div className="team-glow"></div>
      <div className="grid-bg"></div>
      {team.logoUrl && (
        <img src={team.logoUrl} alt={`${team.name} Logo`} className="team-watermark" />
      )}
      <TopBar 
        team={team} 
        onExit={() => setShowPowerDialog(true)} 
        apps={APPS} 
        openWindows={openWindows} 
        onOpenApp={handleOpenApp} 
      />
      
      <div className="desktop-area">
        {APPS.map(app => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            icon={app.icon}
            iconUrl={app.iconUrl}
            label={app.label}
            isSelected={selectedIcon === app.id}
            onSelect={handleIconSelect}
            onOpen={handleOpenApp}
          />
        ))}
      </div>

      {openWindows.map(windowState => {
        const app = APPS.find(a => a.id === windowState.id);
        const AppContent = app.component;
        return (
          <Window
            key={windowState.id}
            id={windowState.id}
            title={app.label}
            zIndex={windowState.zIndex}
            initialPosition={app.defaultPos}
            width={app.defaultSize?.width}
            height={app.defaultSize?.height}
            onClose={handleWindowClose}
            onFocus={handleWindowFocus}
          >
            <AppContent team={team} />
          </Window>
        );
      })}

      {showPowerDialog && (
        <div className="power-dialog-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000
        }}>
          <div className="power-dialog" style={{
            backgroundColor: 'rgba(20,20,20,0.85)',
            border: '1px solid var(--accent-color)',
            padding: '32px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ marginBottom: '16px', color: '#fff' }}>Power Options</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>What would you like to do?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={onExit}
                style={{ padding: '12px', backgroundColor: 'rgba(255,77,77,0.15)', border: '1px solid #ff4d4d', color: '#ff4d4d', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 'bold' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.3)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.15)'}
              >
                Retire the Car
              </button>
              <button 
                onClick={handleReboot}
                style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              >
                Go for a Pitstop
              </button>
              <button 
                onClick={() => setShowPowerDialog(false)}
                style={{ padding: '12px', backgroundColor: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '8px' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isRebooting && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#000',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px'
        }}>
          <style>{`
            @keyframes reboot-load {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0); }
            }
          `}</style>
          {team.logoUrl ? (
            <img src={team.logoUrl} alt="Boot Logo" style={{ width: '120px', filter: 'brightness(0) invert(1)' }} />
          ) : (
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold' }}>F1 OS</div>
          )}
          <div style={{
            width: '200px',
            height: '4px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              animation: 'reboot-load 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
