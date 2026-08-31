import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './PageLoader.css';

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
          onComplete();
        }
      });

      tl.to(carRef.current, { x: -30, duration: 0.5, ease: 'power2.out', delay: 0.2 })
        .to(carRef.current, { x: 10, duration: 0.1, yoyo: true, repeat: 5 })
        .to(carRef.current, { x: window.innerWidth + 300, duration: 0.6, ease: 'power4.in' })
        .to(loaderRef.current, { opacity: 0, duration: 0.4 }, '-=0.2');
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-track">
        <div className="loader-car" ref={carRef}>
           <img src="/assets/loader-car.svg" alt="F1 Loader" style={{ width: '250px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
        </div>
      </div>
      <div className="loader-text">Starting Formula One OS…</div>
    </div>
  );
}
