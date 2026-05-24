import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Globe, Users, BookOpen, Award } from 'lucide-react';
import WaveBackground from '../components/WaveBackground';
import './About.css';

const IEEE_STATS = [
  { value: '400K+', label: 'IEEE Members Worldwide' },
  { value: '160+',  label: 'Countries' },
  { value: '39',    label: 'Technical Societies' },
  { value: '1884',  label: 'Year Founded' },
];

export default function About() {
  return (
    <div className="about-page page-transition">

      {/* ── Header ── */}
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <span className="section-eyebrow">Who We Are</span>
          <h1 className="page-header__title">About<br />IEEE CS</h1>
          <p className="page-header__desc">
            A community of engineers, innovators and leaders, officially affiliated with IEEE — the world's largest technical professional organisation.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section-pad abt-story">
        <WaveBackground variant="section" />
        <div className="container abt-story__inner">
          <div className="abt-story__text">
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title">Building tomorrow's<br /><em>engineers, today.</em></h2>
            <p className="section-body" style={{ marginBottom:'1rem' }}>
              Founded in 2019, the IEEE Computer Society student chapter at MITS Gwalior has grown from a small group of passionate students into a thriving community of 500+ members.
            </p>
            <p className="section-body" style={{ marginBottom:'1rem' }}>
              We provide a platform for students to engage with cutting-edge technology, develop professional skills, and connect with industry experts through workshops, hackathons, technical talks, and competitions.
            </p>
            <p className="section-body">
              Whether you're a curious fresher or a final-year researcher, IEEE CS is where you level up your skills and build lasting connections.
            </p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'2rem' }}>
              <Link to="/membership" className="btn btn-primary">Join IEEE CS <ArrowRight size={15}/></Link>
              <Link to="/events"     className="btn btn-outline">See Events</Link>
            </div>
          </div>

          {/* Glass card — Anubhava about-box style */}
          <div className="abt-story__visual">
            <div className="abt-glass">
              <div className="abt-glass__bar" />
              <div className="abt-glass__shimmer" />

              <div className="abt-glass__logo-row">
                <img src="/ieee-cs-logo.png" alt="IEEE CS" className="abt-glass__ieee-img"
                  onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
                <img src="/mits-logo.png" alt="MITS" className="abt-glass__mits-img"
                  onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
              </div>

              <p className="abt-glass__title">IEEE CS — MITS Gwalior</p>
              <p className="abt-glass__year">Established 2019 &nbsp;·&nbsp; Tenure 2025–26</p>

              <div className="abt-glass__stats">
                {[['500+','Members'],['40+','Events'],['5+','Years'],['15+','Awards']].map(([v,l])=>(
                  <div key={l} className="abt-glass__stat">
                    <span className="abt-glass__stat-val">{v}</span>
                    <span className="abt-glass__stat-lbl">{l}</span>
                  </div>
                ))}
              </div>

              <div className="abt-glass__tags">
                {['Workshops','Hackathons','Seminars','Research','Networking','Webinars','Competitions','Awards'].map(t=>(
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Vision Values ── */}
      <section className="section-pad abt-mvv">
        <WaveBackground variant="dark" />
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Purpose</span>
            <h2 className="section-title">Mission, Vision & Values</h2>
          </div>
          <div className="abt-mvv__grid">
            {[
              { icon: Target, title: 'Mission', body: 'To foster technical excellence, innovation, and leadership among computer science students through collaborative learning, competitions, and professional development.' },
              { icon: Eye,    title: 'Vision',  body: 'To be the most impactful student-led technology organisation in our region — producing graduates who are technically skilled, ethically grounded, and globally competitive.', gold: true },
              { icon: Heart,  title: 'Values',  body: 'Inclusivity, curiosity, collaboration, integrity, and continuous learning form the core of everything we do as a community.' },
            ].map(({ icon: Icon, title, body, gold }) => (
              <div key={title} className={`abt-mvv__card ${gold ? 'abt-mvv__card--gold' : ''}`}>
                <div className="abt-mvv__card-icon"><Icon size={26}/></div>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="abt-mvv__card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IEEE Global ── */}
      <section className="section-pad abt-global">
        <WaveBackground variant="section" />
        <div className="container abt-global__inner">
          <div>
            <span className="section-eyebrow">Part of Something Global</span>
            <h2 className="section-title">IEEE — World's Largest<br /><em>Technical Organisation</em></h2>
            <p className="section-body" style={{ marginBottom:'1.5rem' }}>
              As an IEEE student chapter, we're part of a global network of 400,000+ professionals across 160+ countries. Members gain access to IEEE's vast resources — publications, certifications, and a professional network that spans the globe.
            </p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <a href="https://www.ieee.org" target="_blank" rel="noreferrer" className="btn btn-outline">Visit IEEE.org <ArrowRight size={15}/></a>
              <a href="https://www.computer.org" target="_blank" rel="noreferrer" className="btn btn-outline">Computer Society <ArrowRight size={15}/></a>
            </div>
          </div>
          <div className="abt-global__stats">
            {IEEE_STATS.map(({ value, label }) => (
              <div key={label} className="abt-global__stat">
                <span className="abt-global__stat-val">{value}</span>
                <span className="abt-global__stat-lbl">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <WaveBackground variant="subtle" />
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Want to be part of our story?</h2>
            <p className="cta-banner__sub">Apply for membership or come to our next event.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/membership" className="btn btn-primary">Apply for Membership <ArrowRight size={17}/></Link>
            <Link to="/events" className="btn btn-outline-gold">See Events</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
