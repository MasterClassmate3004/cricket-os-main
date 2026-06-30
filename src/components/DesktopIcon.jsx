import './DesktopIcon.css';

export default function DesktopIcon({ id, icon: Icon, iconUrl, label, isSelected, onSelect, onOpen }) {
  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(id); }}
    >
      <div className="desktop-icon-image">
        {iconUrl ? (
          <img src={iconUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} />
        ) : (
          Icon && <Icon size={32} />
        )}
      </div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}
