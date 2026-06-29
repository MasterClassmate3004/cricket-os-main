import './DesktopIcon.css';

export default function DesktopIcon({ id, icon: Icon, label, isSelected, onSelect, onOpen }) {
  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(id); }}
    >
      <div className="desktop-icon-image">
        {Icon && <Icon size={32} />}
      </div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}
