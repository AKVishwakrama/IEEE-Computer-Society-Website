import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Users, Calendar, Mail, Image, ExternalLink, Bell, Download, ListChecks } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, membershipAPI, contactAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './AdminDashboard.css';

type Membership = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year_of_study: string;
  roll_number: string;
  ieee_membership_id: string;
  membership_type: string;
  status?: string;
  applied_at?: string;
};

type EventItem = {
  id: string;
  title: string;
  event_type: string;
  status: string;
  date: string;
  current_participants: number;
  max_participants: number;
};

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year_of_study: string;
  roll_number: string;
  ieee_member_id: string;
  is_ieee_member: boolean;
  notes: string;
  registered_at: string;
};

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const [stats, setStats] = useState({ events: 0, memberships: 0, contacts: 0 });
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingMemberships, setLoadingMemberships] = useState(false);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);

  if (!user) return <Navigate to="/admin/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  useEffect(() => {
    const loadAdminData = async () => {
      setLoadingEvents(true);
      setLoadingMemberships(true);
      try {
        const [eventsRes, membershipRes, contactsRes] = await Promise.all([
          eventsAPI.getAll({ limit: '100' }),
          membershipAPI.getAll(),
          contactAPI.getAll(),
        ]);

        setEvents(eventsRes.data.events || []);
        setMemberships(membershipRes.data.memberships || []);
        setStats({
          events: eventsRes.data.total || 0,
          memberships: membershipRes.data.memberships?.length || 0,
          contacts: contactsRes.data.contacts?.length || 0,
        });

        if (eventsRes.data.events?.[0]) {
          setSelectedEventId(eventsRes.data.events[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingEvents(false);
        setLoadingMemberships(false);
      }
    };

    loadAdminData();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchRegistrations(selectedEventId);
    }
  }, [selectedEventId]);

  const fetchRegistrations = async (eventId: string) => {
    if (!eventId) return;
    setLoadingRegistrations(true);
    try {
      const res = await eventsAPI.getRegistrations(eventId);
      setRegistrations(res.data.registrations || []);
    } catch (err) {
      console.error(err);
      setRegistrations([]);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const downloadCSV = (rows: any[], headers: { key: string; label: string; }[], filename: string) => {
    const csv = [headers.map((h) => h.label).join(','), ...rows.map((row) =>
      headers.map((h) => {
        const value = row[h.key] ?? '';
        const formatted = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
        return `"${formatted.replace(/"/g, '""')}"`;
      }).join(',')
    )].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const membershipColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'college', label: 'College' },
    { key: 'branch', label: 'Branch' },
    { key: 'year_of_study', label: 'Year' },
    { key: 'roll_number', label: 'Roll No' },
    { key: 'membership_type', label: 'Type' },
    { key: 'ieee_membership_id', label: 'IEEE ID' },
    { key: 'applied_at', label: 'Applied At' },
  ];

  const registrationColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'college', label: 'College' },
    { key: 'branch', label: 'Branch' },
    { key: 'year_of_study', label: 'Year' },
    { key: 'roll_number', label: 'Roll No' },
    { key: 'ieee_member_id', label: 'IEEE ID' },
    { key: 'is_ieee_member', label: 'IEEE Member' },
    { key: 'registered_at', label: 'Registered At' },
  ];

  const STAT_CARDS = [
    { icon: Calendar, label: 'Total Events', value: stats.events, color: '#F5C518' },
    { icon: Users, label: 'Membership Applications', value: stats.memberships, color: '#4A9EFF' },
    { icon: Mail, label: 'Contact Messages', value: stats.contacts, color: '#A855F7' },
    { icon: Image, label: 'Gallery Images', value: '—', color: '#EF4444' },
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
              <h1 className="page-header__title" style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)' }}>Dashboard</h1>
              <p className="page-header__desc">Welcome back, {user.name}. Manage your IEEE CS chapter.</p>
            </div>
            <div className="adm-header-actions">
              <div className="adm-logos">
                <img src="/ieee-cs-logo.png" alt="IEEE CS" className="adm-logo" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <img src="/mits-logo.png" alt="MITS" className="adm-logo" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <button onClick={logout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <WaveBackground variant="subtle" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="adm-stats">
            {STAT_CARDS.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="adm-stat-card" style={{ '--c': color } as React.CSSProperties}>
                <div className="adm-stat-card__icon" style={{ background: `${color}18`, color }}>
                  <Icon size={22} />
                </div>
                <div className="adm-stat-card__val">{value}</div>
                <div className="adm-stat-card__lbl">{label}</div>
                <div className="adm-stat-card__line" style={{ background: color }} />
              </div>
            ))}
          </div>

          <div className="adm-section">
            <h2 className="adm-section-title">Membership Applications</h2>
            <div className="adm-table-toolbar">
              <p>{loadingMemberships ? 'Loading membership applications…' : `${memberships.length} application(s) received.`}</p>
              <button
                className="btn btn-outline btn--sm"
                disabled={memberships.length === 0}
                onClick={() => downloadCSV(memberships, membershipColumns, 'membership-applications.csv')}
              >
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>College</th><th>Branch</th><th>Year</th><th>Roll No</th><th>Membership</th><th>Applied At</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((app) => (
                    <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.college}</td>
                      <td>{app.branch}</td>
                      <td>{app.year_of_study}</td>
                      <td>{app.roll_number}</td>
                      <td>{app.membership_type}</td>
                      <td>{app.applied_at ? new Date(app.applied_at).toLocaleString('en-IN') : '-'}</td>
                    </tr>
                  ))}
                  {memberships.length === 0 && !loadingMemberships && (
                    <tr><td colSpan={8} className="adm-table-empty">No membership applications yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="adm-section">
            <div className="adm-section-header-row">
              <div>
                <h2 className="adm-section-title">Event Registrations</h2>
                <p className="adm-section-sub">Select an event to view current student registrations and export them for Excel.</p>
              </div>
              <div className="adm-event-actions">
                <select
                  className="adm-event-select"
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  disabled={loadingEvents || events.length === 0}
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>{event.title}</option>
                  ))}
                </select>
                <button
                  className="btn btn-primary btn--sm"
                  onClick={() => fetchRegistrations(selectedEventId)}
                  disabled={!selectedEventId || loadingRegistrations}
                >
                  Refresh
                </button>
                <button
                  className="btn btn-outline btn--sm"
                  disabled={registrations.length === 0}
                  onClick={() => downloadCSV(registrations, registrationColumns, 'event-registrations.csv')}
                >
                  <Download size={16} /> Export CSV
                </button>
              </div>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>College</th><th>Branch</th><th>Year</th><th>Roll No</th><th>IEEE Member</th><th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id}>
                      <td>{reg.name}</td>
                      <td>{reg.email}</td>
                      <td>{reg.college}</td>
                      <td>{reg.branch}</td>
                      <td>{reg.year_of_study}</td>
                      <td>{reg.roll_number}</td>
                      <td>{reg.is_ieee_member ? 'Yes' : 'No'}</td>
                      <td>{new Date(reg.registered_at).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {registrations.length === 0 && !loadingRegistrations && (
                    <tr><td colSpan={8} className="adm-table-empty">No registrations for the selected event yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="adm-note">
            <Bell size={16} />
            <p><strong>Storage:</strong> event entries are saved in the backend <code>event_registrations</code> table, and membership forms are saved in <code>memberships</code>. Use the Export CSV buttons to get Excel-friendly data.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
