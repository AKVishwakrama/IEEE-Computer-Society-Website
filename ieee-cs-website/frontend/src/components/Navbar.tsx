import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',              path: '/' },
  { label: 'About',             path: '/about' },
  { label: 'Events',            path: '/events' },
  {
    label: 'Register / Participate',
    path: '/register',
    highlight: true,
    children: [
      { label: 'Browse All Events',     path: '/events' },
      { label: 'Upcoming Events',       path: '/events?status=upcoming' },
      { label: 'Apply for Membership',  path: '/membership' },
    ],
  },
  { label: 'Office Bearers',    path: '/office-bearers' },
  { label: 'Membership',        path: '/membership' },
  { label: 'Gallery',           path: '/gallery' },
  { label: 'Contact',           path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const { user, logout }  = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">

          {/* ── LEFT: IEEE CS Logo ── */}
          <Link to="/" className="nav__logo-left">
            <img
              src="/ieee-cs-logo.png"
              alt="IEEE Computer Society"
              className="nav__logo-img nav__logo-img--ieee"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="nav__logo-text">
              <span className="nav__logo-name">IEEE Computer Society</span>
              <span className="nav__logo-sub">MITS Gwalior — Student Chapter</span>
            </div>
          </Link>

          {/* ── CENTER: Nav links ── */}
          <nav className="nav__links">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.path}
                  className={`nav__drop-wrap ${dropOpen ? 'open' : ''}`}
                  ref={dropRef}
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                >
                  <button
                    className={`nav__link nav__link--pill ${dropOpen ? 'nav__link--pill-open' : ''}`}
                    onClick={() => setDropOpen(!dropOpen)}
                    aria-expanded={dropOpen}
                  >
                    {link.label}
                    <ChevronDown size={13} style={{ transition: 'transform .25s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  <div className="nav__dropdown">
                    {link.children.map((c) => (
                      <Link key={c.path} to={c.path} className="nav__drop-item">{c.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* ── RIGHT: Controls + MITS Logo ── */}
          <div className="nav__right">
            <button className="nav__icon-btn" onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {user ? (
              <>
                {user.role === 'admin' && <Link to="/admin" className="btn btn-outline btn--sm">Dashboard</Link>}
                <button onClick={logout} className="btn btn-outline btn--sm">Logout</button>
              </>
            ) : (
              <Link to="/admin/login" className="btn btn-primary btn--sm nav__admin-cta">Admin</Link>
            )}

            {/* MITS College Logo */}
            <div className="nav__divider" />
            <Link to="/about" className="nav__logo-right" title="Madhav Institute of Technology & Science">
              <img
                src="/mits-logo.png"
                alt="MITS Gwalior"
                className="nav__logo-img nav__logo-img--mits"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </Link>

            {/* Hamburger */}
            <button
              className="nav__hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div className={`nav__overlay ${mobileOpen ? 'nav__overlay--open' : ''}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`nav__mobile ${mobileOpen ? 'nav__mobile--open' : ''}`}>
        <div className="nav__mob-head">
          <img src="/ieee-cs-logo.png" alt="IEEE CS" className="nav__mob-logo" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          <div>
            <p className="nav__mob-title">IEEE Computer Society</p>
            <p className="nav__mob-sub">MITS Gwalior</p>
          </div>
          <img src="/mits-logo.png" alt="MITS" className="nav__mob-mits" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
        </div>

        <nav className="nav__mob-links">
          {NAV_LINKS.map((link) => (
            <div key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `nav__mob-link ${isActive ? 'nav__mob-link--active' : ''} ${link.highlight ? 'nav__mob-link--pill' : ''}`
                }
              >
                {link.label}
              </NavLink>
              {link.children && (
                <div className="nav__mob-sub-links">
                  {link.children.map((c) => (
                    <Link key={c.path} to={c.path} className="nav__mob-sublink">{c.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav__mob-footer">
          <button className="nav__mob-theme-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          {!user && (
            <Link to="/admin/login" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
