import { Link } from 'react-router-dom';
import { Linkedin, Github, Instagram, Twitter, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Wave separator */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="var(--bg-secondary)"
          />
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__brand-logo">
                <div className="footer__logo-mark">
                  <span>IEEE</span>
                  <span>CS</span>
                </div>
                <div>
                  <p className="footer__brand-name">Computer Society</p>
                  <p className="footer__brand-chapter">Student Chapter</p>
                </div>
              </div>
              <p className="footer__brand-desc">
                Empowering the next generation of computer scientists through innovation, education, and an unbreakable community.
              </p>
              <div className="footer__socials">
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/' },
                  { icon: Instagram,label: 'Instagram', href: 'https://www.instagram.com/ieeecomputersocietymits/' },
                  { icon: Twitter,  label: 'Twitter',  href: 'https://twitter.com/ieeecomputersocietymits' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer__social-btn">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h4 className="footer__col-head">Quick Links</h4>
              <ul className="footer__col-list">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About IEEE CS', to: '/about' },
                  { label: 'Events', to: '/events' },
                  { label: 'Register / Participate', to: '/register' },
                  { label: 'Office Bearers', to: '/office-bearers' },
                  { label: 'Membership', to: '/membership' },
                  { label: 'Gallery', to: '/gallery' },
                  { label: 'Contact', to: '/contact' },
                ].map(({ label, to }) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div className="footer__col">
              <h4 className="footer__col-head">Events & Programs</h4>
              <ul className="footer__col-list">
                {[
                  ['Workshops', '/events?type=workshop'],
                  ['Hackathons', '/events?type=hackathon'],
                  ['Seminars', '/events?type=seminar'],
                  ['Webinars', '/events?type=webinar'],
                  ['Upcoming', '/events?status=upcoming'],
                  ['Past Events', '/events?status=completed'],
                ].map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__col-head">Contact</h4>
              <div className="footer__contact-list">
                <a href="mailto:contact@ieee-cs.org" className="footer__contact-item">
                  <Mail size={14} />
                  <span>contact@ieee-cs.org</span>
                </a>
                <div className="footer__contact-item">
                  <Phone size={14} />
                  <span>+91 92445 24591</span>
                </div>
                <div className="footer__contact-item">
                  <MapPin size={14} />
                  <span>IEEE CS Chapter, CSE Dept,<br />MITS-DU Gwalior — 474005</span>
                </div>
              </div>

              <div className="footer__ieee-links">
                <p className="footer__col-head" style={{ marginTop: '1.25rem' }}>IEEE Official</p>
                <a href="https://www.ieee.org" target="_blank" rel="noreferrer" className="footer__ext-link">
                  IEEE.org <ExternalLink size={11} />
                </a>
                <a href="https://www.computer.org" target="_blank" rel="noreferrer" className="footer__ext-link">
                  Computer Society <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} IEEE Computer Society — MITS Student Chapter. All rights reserved.</p>
          <p>
            Made with ❤️ by IEEE CS Web Team &nbsp;·&nbsp;
            <a href="https://www.ieee.org" target="_blank" rel="noreferrer">IEEE.org</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
