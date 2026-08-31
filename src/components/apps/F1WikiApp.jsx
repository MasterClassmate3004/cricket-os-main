import { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, RefreshCw, BookOpen, User, Shield, Info } from 'lucide-react';
import { wikiData } from '../../data/wikiData';
import './F1WikiApp.css';

export default function F1WikiApp({ team }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(null); // null means landing page
  const [history, setHistory] = useState([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Filter suggestions based on query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const matches = Object.entries(wikiData).filter(([key, value]) => {
      return (
        value.name.toLowerCase().includes(query) ||
        (value.fullName && value.fullName.toLowerCase().includes(query)) ||
        key.toLowerCase().includes(query) ||
        (value.code && value.code.toLowerCase().includes(query))
      );
    }).map(([key, value]) => ({ id: key, ...value }));
    setSuggestions(matches);
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
      // Look for exact matches
      const query = searchQuery.toLowerCase().trim();
      const exactMatch = Object.keys(wikiData).find(key => key === query || wikiData[key].name.toLowerCase() === query);
      if (exactMatch) {
        navigateTo(exactMatch);
      }
    }
  };

  const currentArticle = currentPage ? wikiData[currentPage] : null;

  return (
    <div className="wiki-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      {/* Mock Browser Header / Controls */}
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

        {/* Address Bar */}
        <div className="wiki-address-bar">
          <div className="wiki-address-protocol">f1://</div>
          <div className="wiki-address-url">
            {currentPage ? `wiki/database/${currentPage}` : 'wiki/home'}
          </div>
        </div>

        {/* Search Input Box */}
        <form className="wiki-search-form" onSubmit={handleSearchSubmit}>
          <div className="wiki-search-wrapper">
            <Search className="wiki-search-icon" size={14} />
            <input
              type="text"
              placeholder="Search teams or drivers..."
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

      {/* Main Browser Content Area */}
      <div className="wiki-browser-content">
        {!currentPage ? (
          /* Landing/Home Page */
          <div className="wiki-home-page">
            <div className="wiki-home-hero">
              <BookOpen size={48} className="wiki-hero-icon" />
              <h1>F1 GRID ARCHIVE</h1>
              <p>Search and retrieve comprehensive wiki articles for all 2026 constructors and drivers.</p>
            </div>

            <div className="wiki-home-sections">
              <div className="wiki-home-section">
                <h3><Shield size={16} /> Constructors</h3>
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
                <h3><User size={16} /> Featured Drivers</h3>
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
              <Info size={12} /> Live telemetry database powered by F1 OS. Select a constructor from the links above or use the top search bar to start browsing.
            </div>
          </div>
        ) : (
          /* Wikipedia Article Page */
          <div className="wiki-article-container">
            {/* Left Column: Main Body */}
            <div className="wiki-article-main">
              <h1 className="wiki-article-title">{currentArticle.name}</h1>
              {currentArticle.fullName && (
                <div className="wiki-article-fullname">{currentArticle.fullName}</div>
              )}
              
              <div className="wiki-divider"></div>

              {/* Bio Section */}
              <div className="wiki-section">
                <p className="wiki-paragraph lead">{currentArticle.bio}</p>
              </div>

              {/* History Section */}
              <div className="wiki-section">
                <h2>History &amp; Regulations Cycle</h2>
                <p className="wiki-paragraph">{currentArticle.history}</p>
              </div>

              {/* Stats Table */}
              <div className="wiki-section">
                <h2>Historic Achievements</h2>
                <div className="wiki-stats-table">
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">World Championships</div>
                    <div className="wiki-table-value">{currentArticle.championships}</div>
                  </div>
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">Grand Prix Wins</div>
                    <div className="wiki-table-value">{currentArticle.stats.wins}</div>
                  </div>
                  <div className="wiki-table-row">
                    <div className="wiki-table-label">Podium Finishes</div>
                    <div className="wiki-table-value">{currentArticle.stats.podiums}</div>
                  </div>
                  {currentArticle.stats.poles && (
                    <div className="wiki-table-row">
                      <div className="wiki-table-label">Pole Positions</div>
                      <div className="wiki-table-value">{currentArticle.stats.poles}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Wikipedia Stats Sidebar Info-Box */}
            <div className="wiki-article-sidebar">
              <div className="wiki-sidebar-header" style={{ borderBottomColor: currentArticle.accentColor }}>
                {currentArticle.type === 'driver' ? 'DRIVER PROFILE' : 'CONSTRUCTOR PROFILE'}
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
                  /* Driver Details */
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
                  /* Team Details */
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
