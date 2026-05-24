import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, MapPin, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { eventsAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './EventRegister.css';

interface Event { id:string; title:string; short_description:string; event_type:string; status:string; date:string; time:string; venue:string; is_online:boolean; max_participants:number; current_participants:number; description:string; tags:string[]; }

export default function EventRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent]     = useState<Event|null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', college:'', branch:'', year_of_study:'', roll_number:'', ieee_member_id:'', is_ieee_member:false, notes:'' });

  useEffect(() => {
    if (!id) return;
    eventsAPI.getOne(id)
      .then(r => setEvent(r.data.event))
      .catch(() => navigate('/events'))
      .finally(() => setLoading(false));
  }, [id]);

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(p => ({ ...p, [name]: type==='checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    try {
      await eventsAPI.register(id, form);
      setSuccess(true);
      toast.success('Registration successful! 🎉');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="reg-loading">Loading…</div>;
  if (!event)  return null;

  if (success) return (
    <div className="reg-success">
      <div className="reg-success__card">
        <div className="reg-success__icon"><CheckCircle size={56}/></div>
        <h2>You're Registered!</h2>
        <p>Thank you for registering for <strong>{event.title}</strong>. A confirmation will be sent to your email.</p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2rem' }}>
          <Link to="/events" className="btn btn-outline">Back to Events</Link>
          <Link to="/"       className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="er-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <Link to="/events" className="reg-back-link"><ArrowLeft size={15}/> Back to Events</Link>
          <span className="section-eyebrow">Event Registration</span>
          <h1 className="page-header__title" style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>{event.title}</h1>
        </div>
      </section>

      <section className="section-pad" style={{ background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
        <WaveBackground variant="subtle" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="er-layout">
            <div className="reg-form-card">
              <h2 className="reg-form-title">Registration Form</h2>
              <p className="reg-form-sub">Fill in your details to secure your spot.</p>
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group"><label>Full Name *</label><input name="name" value={form.name} onChange={handle} required placeholder="Your full name" /></div>
                  <div className="form-group"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="form-group"><label>College *</label><input name="college" value={form.college} onChange={handle} required placeholder="Your college name" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Branch *</label><input name="branch" value={form.branch} onChange={handle} required placeholder="e.g. CSE, IT, ECE" /></div>
                  <div className="form-group"><label>Year *</label>
                    <select name="year_of_study" value={form.year_of_study} onChange={handle} required>
                      <option value="">Select year</option>
                      <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Alumni</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Roll Number</label><input name="roll_number" value={form.roll_number} onChange={handle} placeholder="Enrollment / Roll number" /></div>
                  <div className="form-group"><label>IEEE Member ID (if any)</label><input name="ieee_member_id" value={form.ieee_member_id} onChange={handle} placeholder="IEEE Member ID" /></div>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="is_ieee_member" checked={form.is_ieee_member} onChange={handle} style={{ width:'auto' }} />
                    I am an IEEE Member
                  </label>
                </div>
                <div className="form-group"><label>Notes / Queries</label><textarea name="notes" value={form.notes} onChange={handle} rows={3} placeholder="Any specific queries or requirements…" /></div>
                <button type="submit" className="btn btn-primary reg-submit" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Complete Registration'}
                </button>
              </form>
            </div>

            {/* Event sidebar */}
            <div className="er-sidebar">
              <div className="er-event-card">
                <div className="er-event-card__bar" />
                <span className="er-event-card__type">{event.event_type}</span>
                <h3 className="er-event-card__title">{event.title}</h3>
                <p className="er-event-card__desc">{event.short_description || event.description?.slice(0,180)}</p>
                <div className="er-event-card__meta">
                  <div className="er-meta-row"><Calendar size={14}/><span>{new Date(event.date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span></div>
                  {event.time && <div className="er-meta-row"><Clock size={14}/><span>{event.time.slice(0,5)}</span></div>}
                  <div className="er-meta-row"><MapPin size={14}/><span>{event.is_online ? 'Online Event' : event.venue}</span></div>
                  {event.max_participants && <div className="er-meta-row"><Users size={14}/><span>{event.current_participants}/{event.max_participants} registered</span></div>}
                </div>
                {event.tags?.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginTop:'1rem' }}>
                    {event.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
