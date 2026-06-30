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

  return (
    <div className="os-interface app-fade-in" onClick={handleDesktopClick}>
      <div className="team-glow"></div>
      <div className="grid-bg"></div>
      {team.logoUrl && (
        <img src={team.logoUrl} alt={`${team.name} Logo`} className="team-watermark" />
      )}
      <TopBar 
        team={team} 
        onExit={onExit} 
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
    </div>
  );
}
