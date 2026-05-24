import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Search, ArrowRight, Clock, Filter } from 'lucide-react';
import { eventsAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './Events.css';

interface Event {
  id: string; title: string; description: string; short_description: string;
  event_type: string; status: string; date: string; time: string;
  venue: string; is_online: boolean; current_participants: number;
  max_participants: number; tags: string[];
}

const TYPES    = ['All','workshop','seminar','hackathon','webinar','competition','conference'];
const STATUSES = ['All','upcoming','ongoing','completed'];

const SAMPLES: Event[] = [
  { id:'1', title:'Career Blueprint: Insights from Deolite MD', description:'', short_description:'Industry experts on Career Guidance & how aAI impact or career.', event_type:'seminar', status:'completed', date:'2026-03-26', time:'4:00', venue:'SAC', is_online:false, current_participants:45, max_participants:200, tags:['Career Guidance'] },
  { id:'2', title:'Frontend Battle 2026: Code for Change', description:'', short_description:' Frontend Battle 2K26 is a competitive web development event hosted by the IEEE Computer Society at MITS Gwalior, built around the core theme of "Design. Code. Deploy." The competition is structured into two main stages: a free-to-enter Round 1 (Portfolio Showdown) focused on building and showcasing a personal developer portfolio, followed by a Round 2 (Pixel Perfect Battle) where qualifiers must code a specific frontend interface layout on the spot. Open to both solo and duo participants, the event uniquely permits the use of AI tools and offers a lucrative 10K+ prize pool filled with cash awards, goodies, and refreshments, alongside hardcopy certificates for all Round 2 finalists. It is scheduled to take place on March 28th at 11:00 AM at the Student Activity Center (SAC) campus venue, and interested students can quickly register', event_type:'hackathon', status:'completed', date:'2026-03-28', time:'11:00', venue:'Seminar Hall(8-9-10)', is_online:false, total_participants: 500, tags:['Mini-Hackathon','Coding'] },
];

export default function Events() {
  const [events, setEvents]       = useState<Event[]>(SAMPLES);
  const [loading, setLoading]     = useState(true);
  const [type, setType]           = useState('All');
  const [status, setStatus]       = useState('All');
  const [search, setSearch]       = useState('');

  useEffect(() => {
    setLoading(true);
    const p: Record<string,string> = {};
    if (type !== 'All')   p.type   = type;
    if (status !== 'All') p.status = status;
    eventsAPI.getAll(p)
      .then(r => setEvents(r.data.events?.length ? r.data.events : SAMPLES))
      .catch(() => setEvents(SAMPLES))
      .finally(() => setLoading(false));
  }, [type, status]);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.short_description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="events-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <span className="section-eyebrow">What's Happening</span>
          <h1 className="page-header__title">Events</h1>
          <p className="page-header__desc">Workshops, hackathons, seminars and more. Find your next opportunity to learn and grow.</p>
        </div>
      </section>

      <section className="section-pad" style={{ background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
        <WaveBackground variant="subtle" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>

          {/* Filters */}
          <div className="ev-filters">
            <div className="ev-search">
              <Search size={15} />
              <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="ev-filter-row">
              <Filter size={14} />
              <span className="ev-filter-label">Type:</span>
              {TYPES.map(t => (
                <button key={t} className={`ev-chip ${type===t?'ev-chip--on':''}`} onClick={() => setType(t)}>{t}</button>
              ))}
            </div>
            <div className="ev-filter-row">
              <span className="ev-filter-label">Status:</span>
              {STATUSES.map(s => (
                <button key={s} className={`ev-chip ${status===s?'ev-chip--on':''}`} onClick={() => setStatus(s)}>{s}</button>
              ))}
            </div>
          </div>

          <p className="ev-count">{loading ? 'Loading…' : `${filtered.length} event${filtered.length!==1?'s':''} found`}</p>

          {loading ? (
            <div className="ev-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="ev-card ev-card--skeleton">
                  <div className="skeleton" style={{height:'140px',borderRadius:'10px',marginBottom:'1rem'}} />
                  <div className="skeleton skeleton--tag" style={{marginBottom:'0.75rem'}} />
                  <div className="skeleton skeleton--title" style={{marginBottom:'0.5rem'}} />
                  <div className="skeleton skeleton--body" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="ev-empty">No events found. Try adjusting your filters.</div>
          ) : (
            <div className="ev-grid">
              {filtered.map((ev, i) => <EvCard key={ev.id} ev={ev} idx={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function EvCard({ ev, idx }: { ev: Event; idx: number }) {
  const d = new Date(ev.date);
  return (
    <div className={`ev-card ${ev.status==='completed'?'ev-card--past':''}`} style={{ animationDelay:`${idx*0.06}s` }}>
      <div className="ev-card__header">
        <span className="ev-card__type">{ev.event_type}</span>
        <span className={`ev-card__status status--${ev.status}`}>{ev.status}</span>
      </div>
      <div className="ev-card__date">
        <span className="ev-card__day">{d.getDate()}</span>
        <span className="ev-card__month">{d.toLocaleString('default',{month:'short'})} '{d.getFullYear().toString().slice(2)}</span>
      </div>
      <h3 className="ev-card__title">{ev.title}</h3>
      <p className="ev-card__desc">{ev.short_description || ev.description?.slice(0,120)}</p>
      <div className="ev-card__meta">
        {ev.time && <span><Clock size={12}/> {ev.time.slice(0,5)}</span>}
        <span><MapPin size={12}/> {ev.is_online ? 'Online' : ev.venue || 'TBA'}</span>
        {ev.max_participants && <span><Users size={12}/> {ev.current_participants||0}/{ev.max_participants}</span>}
      </div>
      {ev.tags?.length > 0 && (
        <div className="ev-card__tags">{ev.tags.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}</div>
      )}
      <div className="ev-card__footer">
        <Link to={`/events/${ev.id}`} className="btn btn-outline btn--sm">Details</Link>
        {ev.status !== 'completed' && ev.status !== 'cancelled' && (
          <Link to={`/events/${ev.id}/register`} className="btn btn-primary btn--sm">Register <ArrowRight size={13}/></Link>
        )}
      </div>
      <div className="ev-card__glow" />
    </div>
  );
}
