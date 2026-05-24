import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface Props { onDone: () => void; }

export default function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('out'), 2400);
    const t3 = setTimeout(() => onDone(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`ls ls--${phase}`}>
      {/* Bold wave layers */}
      <div className="ls__waves">
        <div className="ls__wave ls__wave--1" />
        <div className="ls__wave ls__wave--2" />
        <div className="ls__wave ls__wave--3" />
      </div>

      {/* Glow */}
      <div className="ls__glow" />

      <div className="ls__center">
        {/* Real IEEE CS logo with ring animation */}
        <div className="ls__logo-wrap">
          <svg className="ls__ring" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
            <circle className="ls__ring-track" cx="70" cy="70" r="64" />
            <circle className="ls__ring-fill" cx="70" cy="70" r="64" />
          </svg>
          <div className="ls__logo-img-wrap">
            <img
              src="/ieee-cs-logo.png"
              alt="IEEE Computer Society"
              className="ls__logo-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = document.querySelector('.ls__logo-fallback') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback if image fails */}
            <div className="ls__logo-fallback">
              <span className="ls__ieee">IEEE</span>
              <span className="ls__cs">CS</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="ls__text">
          <p className="ls__title">Computer Society</p>
          <p className="ls__subtitle">MITS Gwalior — Student Chapter</p>
        </div>

        {/* Animated progress bar */}
        <div className="ls__bar-wrap">
          <div className="ls__bar" />
        </div>
      </div>
    </div>
  );
}
