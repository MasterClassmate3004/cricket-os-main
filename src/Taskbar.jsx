import { useState, useEffect } from 'react';
import { Heart, Power } from 'lucide-react';
import './Taskbar.css';

export default function Taskbar({ team, onExit, apps = [], openWindows = [], onOpenApp }) {
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
          <Heart size={17} style={{ color: 'var(--accent-color)' }} />
          <span>Race Day</span>
          <span className="os-topbar-following">{team.name}</span>
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
                <img src={app.iconUrl} alt={app.label} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.15)' }} />
              ) : (
                <AppIcon size={20} />
              )}
              {isOpen && <div className="os-topbar-app-dot"></div>}
              <span className="os-topbar-app-label">{app.label}</span>
            </div>
          );
        })}
      </div>

      <div className="os-topbar-right">
        <div className="os-topbar-time">
          {formattedDate} · {formattedTime}
        </div>
        <button className="os-topbar-btn danger" onClick={onExit}>
          <Power size={16} />
          <span>Leave</span>
        </button>
      </div>
    </div>
  );
}
