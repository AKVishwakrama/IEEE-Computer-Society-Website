import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Users, Calendar, Mail, Image, ExternalLink, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, membershipAPI, contactAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const [stats, setStats] = useState({ events:0, memberships:0, contacts:0 });

  if (!user)    return <Navigate to="/admin/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  useEffect(() => {
    Promise.allSettled([eventsAPI.getAll(), membershipAPI.getAll(), contactAPI.getAll()])
      .then(([ev, mem, con]) => setStats({
        events:       ev.status==='fulfilled'  ? ev.value.data.total||0      : 0,
        memberships:  mem.status==='fulfilled' ? mem.value.data.memberships?.length||0 : 0,
        contacts:     con.status==='fulfilled' ? con.value.data.contacts?.length||0 : 0,
      }));
  }, []);

  const STAT_CARDS = [
    { icon:Calendar, label:'Total Events',           value:stats.events,       color:'#F5C518' },
    { icon:Users,    label:'Membership Applications', value:stats.memberships,  color:'#4A9EFF' },
    { icon:Mail,     label:'Contact Messages',        value:stats.contacts,     color:'#A855F7' },
    { icon:Image,    label:'Gallery Images',          value:'—',                color:'#EF4444' },
  ];

  return (
    <div className="adm-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <div className="adm-header-row">
            <div>
              <span className="section-eyebrow">Admin Panel</span>
              <h1 className="page-header__title" style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)' }}>Dashboard</h1>
              <p className="page-header__desc">Welcome back, {user.name}. Manage your IEEE CS chapter.</p>
            </div>
            <div className="adm-header-actions">
              <div className="adm-logos">
                <img src="/ieee-cs-logo.png" alt="IEEE CS" className="adm-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                <img src="/mits-logo.png" alt="MITS" className="adm-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
              </div>
              <button onClick={logout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
        <WaveBackground variant="subtle" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>

          {/* Stats */}
          <div className="adm-stats">
            {STAT_CARDS.map(({ icon:Icon, label, value, color }) => (
              <div key={label} className="adm-stat-card" style={{ '--c': color } as React.CSSProperties}>
                <div className="adm-stat-card__icon" style={{ background:`${color}18`, color }}>
                  <Icon size={22}/>
                </div>
                <div className="adm-stat-card__val">{value}</div>
                <div className="adm-stat-card__lbl">{label}</div>
                <div className="adm-stat-card__line" style={{ background:color }} />
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="adm-section">
            <h2 className="adm-section-title">Quick Actions</h2>
            <div className="adm-actions">
              {[
                { label:'View All Events', to:'/events', icon:Calendar },
                { label:'Office Bearers',  to:'/office-bearers', icon:Users },
                { label:'Gallery',         to:'/gallery', icon:Image },
                { label:'IEEE Portal',     href:'https://www.ieee.org', icon:ExternalLink },
              ].map(({ label, to, href, icon:Icon }) =>
                href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="adm-action-card">
                    <Icon size={22}/><span>{label}</span>
                  </a>
                ) : (
                  <Link key={label} to={to!} className="adm-action-card">
                    <Icon size={22}/><span>{label}</span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Note */}
          <div className="adm-note">
            <Bell size={16}/>
            <p><strong>Note:</strong> The backend API is fully set up at <code>/api/*</code>. All CRUD operations for events, office bearers, gallery, memberships and contacts are available. Extend this dashboard with full admin tables as needed.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
