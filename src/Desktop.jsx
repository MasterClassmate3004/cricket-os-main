import { useState, useEffect, useMemo, useRef } from 'react';
import TopBar from './Taskbar';
import WindowFrame from './WindowFrame';
import DesktopIcon from './Shortcut';
import TelemetryApp from './TelemetryApp';
import CalendarApp from './CalendarApp';
import TeamInfoApp from './TeamInfoApp';
import CalculatorApp from './CalculatorApp';
import Startup from './Startup';
import { Gauge, Flag, Calculator, Search, Sliders, ArrowLeft, ArrowRight, RefreshCw, BookOpen, User, Shield, Info } from 'lucide-react';
import { wikiData } from './wikiData';
import './Desktop.css';

export default function Desktop({ team, onExit, initialApp = 'telemetry' }) {
  const APPS = [
    { id: 'telemetry', label: 'Who’s quickest', icon: Gauge, component: TelemetryApp, defaultPos: {x: 100, y: 50}, defaultSize: {width: 900, height: 600} },
    { id: 'calendar', label: 'Next race', icon: Flag, component: CalendarApp, defaultPos: {x: 150, y: 150}, defaultSize: {width: 500, height: 400} },
    { id: 'teaminfo', label: 'My team', iconUrl: team.logoUrl, component: TeamInfoApp, defaultPos: {x: 200, y: 100}, defaultSize: {width: 700, height: 500} },
    { id: 'calculator', label: 'Car numbers', icon: Calculator, component: CalculatorApp, defaultPos: {x: 250, y: 100}, defaultSize: {width: 400, height: 550} },
    { id: 'wiki', label: 'Learn', icon: Search, component: F1WikiApp, defaultPos: {x: 180, y: 120}, defaultSize: {width: 750, height: 500} },
    { id: 'settings', label: 'Driving feel', icon: Sliders, component: SettingsApp, defaultPos: {x: 220, y: 150}, defaultSize: {width: 600, height: 480} }
  ];

  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [showPowerDialog, setShowPowerDialog] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const initialAppOpened = useRef(false);
  const [iconPositions, setIconPositions] = useState({
    telemetry: { x: 20, y: 20 },
    calendar: { x: 20, y: 150 },
    teaminfo: { x: 20, y: 280 },
    calculator: { x: 20, y: 410 },
    wiki: { x: 140, y: 20 },
    settings: { x: 140, y: 150 }
  });

  const handleDragIcon = (id, x, y) => {
    setIconPositions(prev => ({
      ...prev,
      [id]: { x, y }
    }));
  };

  const handleIconSelect = (id) => {
    setSelectedIcon(selectedIcon === id ? null : id);
  };

  const handleOpenApp = (id) => {
    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, { id, zIndex: maxZIndex + 1, minimized: false }]);
      setMaxZIndex(maxZIndex + 1);
    } else {
      handleWindowFocus(id);
    }
  };

  useEffect(() => {
    if (!initialApp || initialAppOpened.current) return;
    initialAppOpened.current = true;
    setOpenWindows([{ id: initialApp, zIndex: 11, minimized: false }]);
    setMaxZIndex(11);
  }, [initialApp]);

  const handleWindowFocus = (id) => {
    setOpenWindows(openWindows.map(w =>
      w.id === id ? { ...w, zIndex: maxZIndex + 1, minimized: false } : w
    ));
    setMaxZIndex(maxZIndex + 1);
  };

  const handleWindowMinimize = (id) => {
    setOpenWindows(openWindows.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
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
  };

  const handleFreshStart = () => {
    setIsRebooting(false);
    setOpenWindows([{ id: initialApp, zIndex: 11, minimized: false }]);
    setMaxZIndex(11);
  };

  const findApp = (id) => {
    for (let i = 0; i < APPS.length; i++) {
      if (APPS[i].id === id) {
        return APPS[i];
      }
    }
    return null;
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
            position={iconPositions[app.id]}
            onSelect={handleIconSelect}
            onOpen={handleOpenApp}
            onDrag={handleDragIcon}
          />
        ))}
      </div>

      <div className="desktop-welcome" onClick={(event) => event.stopPropagation()}>
        <div className="desktop-welcome-mark" style={{ backgroundColor: team.accent }}>
          {team.name.charAt(0)}
        </div>
        <p className="desktop-welcome-kicker">Your race day</p>
        <h1>Hey, {team.name} is ready.</h1>
        <p className="desktop-welcome-copy">Pick something to look at. There’s no wrong place to start.</p>
        <div className="desktop-quick-actions">
          <button onClick={() => handleOpenApp('telemetry')}>See the order <ArrowRight size={14} /></button>
          <button onClick={() => handleOpenApp('teaminfo')}>Open my team <ArrowRight size={14} /></button>
        </div>
      </div>

      {openWindows.map(windowState => {
        const app = findApp(windowState.id);
        const AppContent = app.component;
        return (
          <WindowFrame
            key={windowState.id}
            id={windowState.id}
            title={app.label}
            zIndex={windowState.zIndex}
            initialPosition={app.defaultPos}
            width={app.defaultSize?.width}
            height={app.defaultSize?.height}
            onClose={handleWindowClose}
            onFocus={handleWindowFocus}
            isMinimized={windowState.minimized}
            onMinimize={handleWindowMinimize}
          >
            <AppContent team={team} />
          </WindowFrame>
        );
      })}

      {showPowerDialog && (
        <div className="power-dialog-overlay">
          <div className="power-dialog">
            <p className="power-dialog-kicker">Before you go</p>
            <h2>Take a breather?</h2>
            <p className="power-dialog-copy">You can head back to your choices or start this corner fresh.</p>
            <div className="power-dialog-actions">
              <button className="power-dialog-primary" onClick={onExit}>Back to choosing</button>
              <button className="power-dialog-secondary" onClick={handleReboot}>Start fresh</button>
              <button className="power-dialog-cancel" onClick={() => setShowPowerDialog(false)}>Stay here</button>
            </div>
          </div>
        </div>
      )}

      {isRebooting && (
        <Startup team={team} onComplete={handleFreshStart} />
      )}
    </div>
  );
}

function F1WikiApp({ team }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(null);
  const [history, setHistory] = useState([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matches = [];
    
    Object.entries(wikiData).forEach(([key, value]) => {
      const nameMatch = value.name.toLowerCase().includes(query);
      const fullNameMatch = value.fullName && value.fullName.toLowerCase().includes(query);
      const keyMatch = key.toLowerCase().includes(query);
      const codeMatch = value.code && value.code.toLowerCase().includes(query);
      
      if (nameMatch || fullNameMatch || keyMatch || codeMatch) {
        matches.push({ id: key, ...value });
      }
    });
    
    return matches;
  }, [searchQuery]);

  const navigateTo = (pageId) => {
    if (pageId === currentPage) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(pageId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPage(pageId);
    setSearchQuery('');
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPage(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPage(history[historyIndex + 1]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      navigateTo(suggestions[0].id);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const exactMatch = Object.keys(wikiData).find(key => key === query || wikiData[key].name.toLowerCase() === query);
      if (exactMatch) {
        navigateTo(exactMatch);
      }
    }
  };

  const currentArticle = currentPage ? wikiData[currentPage] : null;
  const stats = currentArticle?.stats || {
    wins: currentArticle?.wins || '0',
    podiums: currentArticle?.podiums || '0',
    poles: currentArticle?.poles || null
  };

  return (
    <div className="wiki-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      <div className="wiki-browser-header">
        <div className="wiki-nav-buttons">
          <button 
            className="wiki-nav-btn" 
            onClick={handleBack} 
            disabled={historyIndex === 0}
            title="Back"
          >
            <ArrowLeft size={16} />
          </button>
          <button 
            className="wiki-nav-btn" 
            onClick={handleForward} 
            disabled={historyIndex === history.length - 1}
            title="Forward"
          >
            <ArrowRight size={16} />
          </button>
          <button 
            className="wiki-nav-btn" 
            onClick={() => setSearchQuery('')}
            title="Refresh"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <div className="wiki-address-bar">
          <div className="wiki-address-protocol">learn://</div>
          <div className="wiki-address-url">
            {currentPage ? `stories/${currentPage}` : 'start here'}
          </div>
        </div>

        <form className="wiki-search-form" onSubmit={handleSearchSubmit}>
          <div className="wiki-search-wrapper">
            <Search className="wiki-search-icon" size={14} />
            <input
              type="text"
              placeholder="Try a team or driver…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="wiki-search-input"
            />
            {suggestions.length > 0 && (
              <div className="wiki-suggestions-dropdown">
                {suggestions.map(suggestion => (
                  <div 
                    key={suggestion.id} 
                    className="wiki-suggestion-item"
                    onClick={() => navigateTo(suggestion.id)}
                  >
                    {suggestion.type === 'driver' ? (
                      <User size={12} className="suggestion-type-icon" />
                    ) : (
                      <Shield size={12} className="suggestion-type-icon" />
                    )}
                    <span className="suggestion-name">{suggestion.name}</span>
                    <span className="suggestion-info">
                      {suggestion.type === 'driver' ? `Driver - ${suggestion.teamName}` : 'Constructor'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="wiki-browser-content">
        {!currentPage ? (
          <div className="wiki-home-page">
            <div className="wiki-home-hero">
              <BookOpen size={48} className="wiki-hero-icon" />
              <h1>Learn something new</h1>
              <p>A friendly place to look up teams, drivers, and the stories behind the race.</p>
            </div>

            <button className="wiki-following-choice" onClick={() => navigateTo(team?.id || 'mclaren')}>
              <span>Start with the team you’re following</span>
              <strong>{team?.name || 'McLaren'}</strong>
              <ArrowRight size={16} />
            </button>

            <div className="wiki-home-sections">
              <div className="wiki-home-section">
                <h3><Shield size={16} /> Teams</h3>
                <div className="wiki-home-links">
                  <button onClick={() => navigateTo('mclaren')}>McLaren</button>
                  <button onClick={() => navigateTo('ferrari')}>Ferrari</button>
                  <button onClick={() => navigateTo('mercedes')}>Mercedes</button>
                  <button onClick={() => navigateTo('redbull')}>Red Bull</button>
                  <button onClick={() => navigateTo('aston')}>Aston Martin</button>
                  <button onClick={() => navigateTo('audi')}>Audi</button>
                  <button onClick={() => navigateTo('alpine')}>Alpine</button>
                  <button onClick={() => navigateTo('williams')}>Williams</button>
                  <button onClick={() => navigateTo('racingbulls')}>Racing Bulls</button>
                  <button onClick={() => navigateTo('haas')}>Haas</button>
                  <button onClick={() => navigateTo('cadillac')}>Cadillac</button>
                </div>
              </div>

              <div className="wiki-home-section">
                <h3><User size={16} /> Drivers you might enjoy</h3>
                <div className="wiki-home-links">
                  <button onClick={() => navigateTo('norris')}>Lando Norris</button>
                  <button onClick={() => navigateTo('hamilton')}>Lewis Hamilton</button>
                  <button onClick={() => navigateTo('verstappen')}>Max Verstappen</button>
                  <button onClick={() => navigateTo('antonelli')}>Kimi Antonelli</button>
                  <button onClick={() => navigateTo('leclerc')}>Charles Leclerc</button>
                  <button onClick={() => navigateTo('alonso')}>Fernando Alonso</button>
                  <button onClick={() => navigateTo('sainz')}>Carlos Sainz</button>
                  <button onClick={() => navigateTo('piastri')}>Oscar Piastri</button>
                  <button onClick={() => navigateTo('albon')}>Alex Albon</button>
                  <button onClick={() => navigateTo('bortoleto')}>Gabriel Bortoleto</button>
                  <button onClick={() => navigateTo('ocon')}>Esteban Ocon</button>
                  <button onClick={() => navigateTo('bearman')}>Oliver Bearman</button>
                </div>
              </div>
            </div>

            <div className="wiki-home-footer">
              <Info size={12} /> Start wherever you like. Search is here if you already have someone in mind.
            </div>
          </div>
        ) : (
          <div className="wiki-article-container">
            <div className="wiki-article-main">
              <h1 className="wiki-article-title">{currentArticle.name}</h1>
              {currentArticle.fullName && (
                <div className="wiki-article-fullname">{currentArticle.fullName}</div>
              )}
              
              <div className="wiki-divider"></div>

              <div className="wiki-section">
                <p className="wiki-paragraph lead">{currentArticle.bio}</p>
              </div>

              <div className="wiki-section">
                <h2>The story so far</h2>
                <p className="wiki-paragraph">{currentArticle.history}</p>
              </div>

              <div className="wiki-section">
                <h2>What they’ve done</h2>
                <div className="wiki-stats-table">
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">World Championships</div>
                    <div className="wiki-table-value">{currentArticle.championships}</div>
                  </div>
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">Grand Prix Wins</div>
                    <div className="wiki-table-value">{stats.wins}</div>
                  </div>
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">Podium Finishes</div>
                    <div className="wiki-table-value">{stats.podiums}</div>
                  </div>
                  {stats.poles && (
                    <div className="wiki-table-row">
                      <div className="wiki-table-label">Pole Positions</div>
                      <div className="wiki-table-value">{stats.poles}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="wiki-article-sidebar">
              <div className="wiki-sidebar-header" style={{ borderBottomColor: currentArticle.accentColor }}>
                {currentArticle.type === 'driver' ? 'DRIVER' : 'TEAM'}
              </div>
              
              <div className="wiki-sidebar-logo-container">
                {currentArticle.type === 'driver' ? (
                  <div className="wiki-sidebar-number" style={{ color: currentArticle.accentColor }}>
                    #{currentArticle.number}
                  </div>
                ) : (
                  <div className="wiki-sidebar-logo-wrap">
                    <Shield size={64} style={{ color: currentArticle.accentColor }} />
                  </div>
                )}
              </div>

              <div className="wiki-sidebar-title">{currentArticle.name}</div>

              <div className="wiki-sidebar-info">
                {currentArticle.type === 'driver' ? (
                  <>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Active Team</span>
                      <span className="wiki-info-val">{currentArticle.teamName}</span>
                    </div>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Driver Code</span>
                      <span className="wiki-info-val highlight">{currentArticle.code}</span>
                    </div>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Country</span>
                      <span className="wiki-info-val">{currentArticle.country}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Headquarters</span>
                      <span className="wiki-info-val">{currentArticle.base}</span>
                    </div>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Team Principal</span>
                      <span className="wiki-info-val">{currentArticle.principal}</span>
                    </div>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">First Entered</span>
                      <span className="wiki-info-val">{currentArticle.established}</span>
                    </div>
                    <div className="wiki-info-item">
                      <span className="wiki-info-label">Active Drivers</span>
                      <span className="wiki-info-val">
                        {currentArticle.drivers.join(', ')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsApp({ team }) {
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
      let targetTemp = 105;
      if (stratMode === 'STRAT 1') {
        targetTemp = 112;
      } else if (stratMode === 'STRAT 3') {
        targetTemp = 98;
      }

      setEngineTemp(prev => {
        const tempDifference = targetTemp - prev;
        const adjustmentSpeed = 0.1;
        const driftAmount = (Math.random() - 0.5) * 0.2;
        const nextTemp = prev + (tempDifference * adjustmentSpeed) + driftAmount;
        const roundedTemp = parseFloat(nextTemp.toFixed(1));
        return roundedTemp;
      });

      setErsStore(prev => {
        let newErs;
        if (mgukMode === 'HOT LAP' || mgukMode === 'OVERTAKE') {
          const dischargeRate = Math.random() * 0.5 + 0.2;
          newErs = prev - dischargeRate;
        } else if (mgukMode === 'HARVEST') {
          const chargeRate = Math.random() * 0.4 + 0.2;
          newErs = prev + chargeRate;
        } else {
          const standardDrift = (Math.random() - 0.5) * 0.1;
          newErs = prev + standardDrift;
        }

        if (newErs < 0) {
          newErs = 0;
        }
        if (newErs > 100) {
          newErs = 100;
        }

        const finalErs = parseFloat(newErs.toFixed(1));
        return finalErs;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [stratMode, mgukMode]);

  return (
    <div className="settings-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      <div className="settings-intro">
        <p>Make the car feel like your kind of lap.</p>
        <span>These are just choices — you can change them whenever you like.</span>
      </div>
      <div className="rev-lights">
        {[...Array(15)].map((_, i) => {
          const color = i < 5 ? 'green' : i < 10 ? 'red' : 'blue';
          return <span key={i} className={`light ${color} active`} />;
        })}
      </div>

      <div className="wheel-display">
        <div className="display-grid">
          <div className="display-stat">
            <span className="stat-label">Engine temp</span>
            <span className={`stat-val ${engineTemp > 110 ? 'alert' : ''}`}>{engineTemp}°C</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">Battery</span>
            <span className="stat-val highlight">{ersStore}%</span>
          </div>
          <div className="display-stat">
            <span className="stat-label">DRS</span>
            <span className={`stat-val ${drsStatus ? 'active' : 'inactive'}`}>
              {drsStatus ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header">Power delivery</div>
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
          <div className="card-header">Battery assist</div>
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

        <div className="settings-card">
          <div className="card-header">Corner balance</div>
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
          <div className="card-header">Tyres and DRS</div>
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
