import React from 'react';

export default function PickTeam({ teams, currentTeam, onSelect }) {
  return (
    <section id="team-selection" style={{ padding: '6rem 4rem', background: '#050505', textAlign: 'center' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>CHOOSE YOUR TEAM</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Pick your team to change the dashboard styling.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {teams.map(team => {
          const isActive = team.id === currentTeam.id;
          return (
            <div 
              key={team.id}
              onClick={() => onSelect(team)}
              style={{
                background: 'var(--bg-panel)',
                padding: '2rem',
                border: `1px solid ${isActive ? team.accent : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                transform: isActive ? 'translateY(-5px)' : 'none',
                boxShadow: isActive ? `0 10px 20px rgba(0,0,0,0.5)` : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = team.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <div style={{
                width: '50px', height: '50px',
                borderRadius: '50%',
                background: team.primary,
                border: `2px solid ${team.accent}`
              }}></div>
              <h3 style={{ fontSize: '1.2rem' }}>{team.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
