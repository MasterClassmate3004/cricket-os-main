import { useState, useEffect } from 'react';
import { Settings, Power } from 'lucide-react';
import './TopBar.css';

export default function TopBar({ team, onExit, apps = [], openWindows = [], onOpenApp }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
              <AppIcon size={20} />
              {isOpen && <div className="os-topbar-app-dot"></div>}
            </div>
          );
        })}
      </div>

      <div className="os-topbar-right">
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
