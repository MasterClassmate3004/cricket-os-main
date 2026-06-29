import { useState, useRef, useEffect } from 'react';
import './Window.css';
import { Terminal } from 'lucide-react';

export default function Window({ 
  id, 
  title = "Welcome", 
  children, 
  onClose, 
  onFocus, 
  zIndex = 10,
  initialPosition = { x: 50, y: 50 },
  width,
  height
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y
    };
    if (onFocus) onFocus(id);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.initX + dx,
        y: dragRef.current.initY + dy
      });
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
  }, [isDragging]);

  const handleWindowClick = () => {
    if (onFocus) onFocus(id);
  };

  return (
    <div 
      className="os-window" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: zIndex,
        ...(width && { width }),
        ...(height && { height })
      }}
      onMouseDown={handleWindowClick}
    >
      <div className="os-window-header" onMouseDown={handleMouseDown}>
        <div className="os-window-controls">
          <div className="os-window-dot close" onClick={(e) => { e.stopPropagation(); if (onClose) onClose(id); }}></div>
          <div className="os-window-dot minimize"></div>
          <div className="os-window-dot maximize"></div>
        </div>
        <div className="os-window-title">{title}</div>
      </div>
      <div className="os-window-content">
        {children || (
          <>
            <Terminal size={48} style={{ color: 'var(--accent-color)', marginBottom: '16px' }} />
            <h1>Welcome to Formula 1 OS</h1>
            <p>
              Your high-performance workspace is ready. <br/>
              Telemetry systems online. Engine parameters optimal.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
