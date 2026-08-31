import { useState, useEffect } from 'react';
import { Settings, Power, Thermometer } from 'lucide-react';
import './Taskbar.css';

export default function Taskbar({ team, onExit, apps = [], openWindows = [], onOpenApp }) {
  const [time, setTime] = useState(new Date());
  const [machineTemp, setMachineTemp] = useState(55);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    const tempTimer = setInterval(() => {
      setMachineTemp(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newTemp = prev + change;
        if (newTemp > 75) return 74;
        if (newTemp < 45) return 46;
        return newTemp;
      });
    }, 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(tempTimer);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = time.toLocaleDateString([], {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="os-topbar">
      <div className="os-topbar-left">
        <div className="os-topbar-brand">
          <Settings size={18} style={{ color: 'var(--accent-color)' }} />
          <span>Formula 1 OS</span>
        </div>
      </div>
      
      <div className="os-topbar-center">
        {apps.map(app => {
          const AppIcon = app.icon;
          const isOpen = openWindows.some(w => w.id === app.id);
          return (
            <div 
              key={app.id} 
              className={`os-topbar-app ${isOpen ? 'active' : ''}`}
              onClick={() => onOpenApp(app.id)}
              title={app.label}
            >
              {app.iconUrl ? (
                <img src={app.iconUrl} alt={app.label} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} />
              ) : (
                <AppIcon size={20} />
              )}
              {isOpen && <div className="os-topbar-app-dot"></div>}
            </div>
          );
        })}
      </div>

      <div className="os-topbar-right">
        <div className="os-topbar-temp">
          <Thermometer size={14} style={{ color: machineTemp >= 70 ? '#ff4d4d' : 'var(--text-main)' }} />
          <span>{machineTemp}°C</span>
        </div>
        <div className="os-topbar-time">
          {formattedDate} {formattedTime}
        </div>
        <button className="os-topbar-btn danger" onClick={onExit}>
          <Power size={16} />
        </button>
      </div>
    </div>
  );
}
