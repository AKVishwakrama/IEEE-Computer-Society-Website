import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Users, Calendar, Award, Globe, Cpu, Zap, BookOpen } from 'lucide-react';
import { eventsAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './Home.css';

interface Event {
  id: string;
  title: string;
  short_description: string;
  event_type: string;
  status: string;
  date: string;
  venue: string;
  is_featured: boolean;
}

const STATS = [
  { icon: Users,    value: '500+', label: 'Active Members' },
  { icon: Calendar, value: '40+',  label: 'Events Hosted' },
  { icon: Award,    value: '15+',  label: 'Awards Won' },
  { icon: Globe,    value: '5+',   label: 'Years Active' },
];

const OFFERINGS = [
  { icon: Cpu,      title: 'Technical Workshops',  desc: 'Hands-on sessions on emerging tech — AI, cloud, web, embedded systems and more.' },
  { icon: Zap,      title: 'Hackathons & Contests', desc: '24-hour hackathons and coding competitions to push your limits and build real things.' },
  { icon: BookOpen, title: 'Seminars & Talks',      desc: 'Industry speakers, alumni panels, and research presentations that broaden your horizon.' },
  { icon: Users,    title: 'Networking & Community', desc: 'A tight-knit community of engineers, designers, and leaders who grow together.' },
];

const SAMPLE_EVENTS: Event[] = [
  { id: '1', title: 'Tech Talk: AI & ML Trends 2026', short_description: 'Industry experts on the latest in AI, from LLMs to computer vision.', event_type: 'seminar', status: 'upcoming', date: '2026-06-15', venue: 'Seminar Hall A', is_featured: true },
  { id: '2', title: 'Hackathon 2026: Code for Change', short_description: '24-hour hackathon. Build, compete, and showcase innovative solutions.', event_type: 'hackathon', status: 'upcoming', date: '2026-07-10', venue: 'CS Block', is_featured: true },
  { id: '3', title: 'React & Node.js Full-Stack Workshop', short_description: 'Hands-on workshop covering modern full-stack development from scratch.', event_type: 'workshop', status: 'completed', date: '2026-04-20', venue: 'Lab 301', is_featured: false },
];

export default function Home() {
  const [events, setEvents] = useState<Event[]>(SAMPLE_EVENTS);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    eventsAPI.getAll({ featured: 'true', limit: '3' })
      .then((res) => { if (res.data.events?.length) setEvents(res.data.events); })
      .catch(() => {});
  }, []);

  // Subtle parallax
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.setProperty('--py', `${window.scrollY * 0.35}px`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home page-transition">

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero" ref={heroRef}>
        {/* Animated wave layers */}
        <WaveBackground variant="hero" />

        {/* Grid texture overlay */}
        <div className="hero__grid-texture" />

        {/* Glows */}
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />

        <div className="container hero__body">
          {/* Eyebrow */}
          <div className="hero__eyebrow animate-fade-up">
            <span className="hero__eyebrow-dot" />
            <span>IEEE Computer Society — Student Chapter</span>
          </div>

          {/* Main title — Anubhava style: big Bebas with italic serif mix */}
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--1">Build.</span>
            <span className="hero__title-line hero__title-line--2">
              Inno<em>vate</em>.
            </span>
            <span className="hero__title-line hero__title-line--3">Lead.</span>
          </h1>

          <p className="hero__sub">
            Where computer science students come to learn, compete,<br className="hero__br" />
            and shape the future of technology.
          </p>

          <div className="hero__cta">
            <Link to="/events" className="btn btn-primary hero__cta-main">
              Explore Events <ArrowRight size={17} />
            </Link>
            <Link to="/membership" className="btn btn-outline hero__cta-sec">
              Join IEEE CS
            </Link>
          </div>

          {/* Floating glass stat cards */}
          <div className="hero__stats">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div className="hero__stat-pill" key={label}>
                <Icon size={14} />
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#about" className="hero__scroll-cue">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ══════════════ ABOUT STRIP ══════════════ */}
      <section id="about" className="about-strip section-pad">
        <WaveBackground variant="section" />
        <div className="container about-strip__inner">
          {/* Left text */}
          <div className="about-strip__text">
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="section-title">
              Driven by curiosity.<br />
              <em>Shaped by code.</em>
            </h2>
            <p className="section-body">
              The IEEE Computer Society student chapter is the premier technical community at our college.
              From workshops to hackathons, from research talks to industry visits — we create
              experiences that define careers.
            </p>
            <p className="section-body" style={{ marginTop: '0.85rem' }}>
              Officially affiliated with IEEE — the world's largest technical professional organization
              with 400,000+ members across 160+ countries.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>
              Our Story <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right — glass card like Anubhava "about box" */}
          <div className="about-strip__card-wrap">
            <div className="about-glass-card">
              {/* Top accent bar */}
              <div className="about-glass-card__bar" />

              <div className="about-glass-card__head">
                <div className="about-glass-card__badge-mark">
                  <span>IEEE</span>
                  <span>CS</span>
                </div>
                <div>
                  <p className="about-glass-card__title">Computer Society</p>
                  <p className="about-glass-card__sub">MITS — Student Chapter</p>
                </div>
              </div>

              <p className="about-glass-card__year">Est. 2019 &nbsp;·&nbsp; Tenure 2025–26</p>

              <div className="about-glass-card__tags">
                {['Workshops', 'Hackathons', 'Seminars', 'Research', 'Networking', 'Competitions', 'Webinars', 'Awards'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Hover shimmer line — Anubhava style */}
              <div className="about-glass-card__shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHAT WE OFFER ══════════════ */}
      <section className="offerings section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="section-title">Why Join IEEE CS?</h2>
            <p className="section-body">
              Everything you need to grow as an engineer — under one community.
            </p>
          </div>

          <div className="offerings__grid">
            {OFFERINGS.map(({ icon: Icon, title, desc }, i) => (
              <div className="offering-card" key={title} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="offering-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="offering-card__title">{title}</h3>
                <p className="offering-card__desc">{desc}</p>
                {/* Bottom gradient line on hover — Anubhava style */}
                <div className="offering-card__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED EVENTS ══════════════ */}
      <section className="home-events section-pad">
        <WaveBackground variant="section" />
        <div className="container">
          <div className="section-header--flex">
            <div>
              <span className="section-eyebrow">What's Happening</span>
              <h2 className="section-title">Featured Events</h2>
            </div>
            <Link to="/events" className="btn btn-outline btn--sm">
              All Events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="home-events__grid">
            {events.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">
              Ready to be part of<br />
              <em>something bigger?</em>
            </h2>
            <p className="cta-banner__sub">
              Join hundreds of students building the future of technology.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/membership" className="btn btn-primary">
              Apply for Membership <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="btn btn-outline-gold">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const d = new Date(event.date);
  return (
    <div
      className={`home-ev-card ${event.status === 'completed' ? 'home-ev-card--past' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="home-ev-card__top">
        <span className="home-ev-card__type">{event.event_type}</span>
        <span className={`home-ev-card__status status--${event.status}`}>{event.status}</span>
      </div>

      <div className="home-ev-card__date">
        <span className="home-ev-card__day">{d.getDate()}</span>
        <span className="home-ev-card__month">
          {d.toLocaleString('default', { month: 'short' })} '{d.getFullYear().toString().slice(2)}
        </span>
      </div>

      <h3 className="home-ev-card__title">{event.title}</h3>
      <p className="home-ev-card__desc">{event.short_description}</p>

      <div className="home-ev-card__venue">📍 {event.venue}</div>

      <div className="home-ev-card__footer">
        {event.status !== 'completed' ? (
          <Link to={`/events/${event.id}/register`} className="btn btn-primary btn--sm">
            Register <ArrowRight size={13} />
          </Link>
        ) : (
          <Link to={`/events/${event.id}`} className="btn btn-outline btn--sm">View Details</Link>
        )}
        <Link to={`/events/${event.id}`} className="home-ev-card__more">
          Learn more →
        </Link>
      </div>

      {/* Hover accent line */}
      <div className="home-ev-card__glow" />
    </div>
  );
}
