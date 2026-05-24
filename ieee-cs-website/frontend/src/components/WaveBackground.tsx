import './WaveBackground.css';

interface Props {
  variant?: 'hero' | 'section' | 'dark' | 'subtle';
}

export default function WaveBackground({ variant = 'section' }: Props) {
  return (
    <div className={`wb wb--${variant}`} aria-hidden="true">
      <div className="wb__l wb__l--a" />
      <div className="wb__l wb__l--b" />
      <div className="wb__l wb__l--c" />
      <div className="wb__grid" />
    </div>
  );
}
