import { useState, useRef, useEffect } from 'react';

export default function DesktopIcon({ 
  id, 
  icon: Icon, 
  iconUrl, 
  label, 
  isSelected, 
  position = { x: 0, y: 0 }, 
  onSelect, 
  onOpen, 
  onDrag 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0, moved: false });

  const handleMouseDown = (e) => {
    e.stopPropagation();
    if (onSelect) onSelect(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
      moved: false
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragRef.current.moved = true;
      }

      const nextX = Math.max(10, Math.min(window.innerWidth - 100, dragRef.current.initX + dx));
      const nextY = Math.max(10, Math.min(window.innerHeight - 150, dragRef.current.initY + dy));

      if (onDrag) {
        onDrag(id, nextX, nextY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, id, onDrag]);

  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      style={{ 
        position: 'absolute', 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: isDragging ? 100 : 2,
        transition: isDragging ? 'none' : 'box-shadow 0.2s, border-color 0.2s, background-color 0.2s, transform 0.2s'
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (!dragRef.current.moved && onOpen) {
          onOpen(id);
        }
      }}
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
