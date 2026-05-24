import { useState } from 'react';
import { Linkedin, Github, Mail, ExternalLink } from 'lucide-react';
import WaveBackground from '../components/WaveBackground';
import './OfficeBearers.css';

const LEADERSHIP = [
  { name:'Ayan Ahmed Khan',   position:'Chairperson',      photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/ayan.jpg' },
  { name:'Gagandeep Kushwah', position:'Vice Chairperson', photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/gagandeep.png' },
  { name:'Divita Joshi',      position:'Secretary',        photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/divita-joshi.png' },
  { name:'Devanshu Gupta',    position:'Treasurer',        photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/devanshu.jpg' },
  { name:'Ayush',             position:'Webmaster',        photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/ayush.jpg' },
];

const DIVISIONS = [
  { name:'Technical Development', color:'#F5C518', members:[
    { name:'Amit Vishwakarma', dept:'IT-IoT',  year:'II' ,photo:'d:\New folder\amit_vishwakarma.png'},
    { name:'Amit Manmode',     dept:'CSE',  year:'II' },
    { name:'Aditya Singh',     dept:'AI-DS', year:'II', photo:'https://ieee-cs-mits-du.vercel.app/images-office-bearers/aditya-singh.jpg' },
    { name:'Muhammad Raihaan Musharraf', dept:'AI', year:'III' },
    { name:'Astha Jain',       dept:'CSBS', year:'I' },
  ]},
  { name:'Operations & Management', color:'#E8A020', members:[
    { name:'Radhika Nayak',      dept:'IT',   year:'II' },
    { name:'Animesh Singh',      dept:'AIDS', year:'II' },
    { name:'Bhanuj Hinge',       dept:'ETE',  year:'I' },
    { name:'Khushboo Chourasiya',dept:'CSD',  year:'I' },
    { name:'Bhavya Tiwari',      dept:'IoT',  year:'I' },
    { name:'Yash Panse',         dept:'CSD',  year:'I' },
    { name:'Unnati Sharma',      dept:'CSBS', year:'I' },
  ]},
  { name:'Public Relations & Outreach', color:'#4A9EFF', members:[
    { name:'Anmol Soni',    dept:'AIDS', year:'II' },
    { name:'Aman Sharma',   dept:'IoT',  year:'II' },
    { name:'Shivansh Soni', dept:'CSE',  year:'II' },
    { name:'Lavi Barya',    dept:'CSD',  year:'I' },
    { name:'Shivam Sharma', dept:'ECE',  year:'I' },
  ]},
  { name:'Content & Copywriting', color:'#A855F7', members:[
    { name:'Janya Agrawal',   dept:'ECE', year:'III' },
    { name:'Yashasvi Tomar',  dept:'ECE', year:'II' },
    { name:'Anushka Dhakad',  dept:'CE',  year:'II' },
    { name:'Snehal Bhardwaj', dept:'ECE', year:'II' },
    { name:'Piyush Moonat',   dept:'CSE', year:'I' },
  ]},
  { name:'Creative Design', color:'#EF4444', members:[
    { name:'Dhruv Keshari',    dept:'CSD', year:'II' },
    { name:'Chahat Bhatija',   dept:'AIR', year:'II' },
    { name:'Vaidik Patidar',   dept:'CSE', year:'II' },
    { name:'Aahana Sengar',    dept:'IoT', year:'I' },
    { name:'Gauri Gupta',      dept:'ECE', year:'I' },
    { name:'Disha Prajapati',  dept:'AIDS',year:'I' },
    { name:'Krishna Shrivastava',dept:'ECE',year:'I' },
    { name:'Aditya Mishra',    dept:'ECE', year:'I' },
    { name:'Prabal Jaiswal',   dept:'CSD', year:'I' },
  ]},
];

function getInitials(n: string) { return n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }

function Avatar({ name, photo, size='md' }: { name:string; photo?:string|null; size?:'sm'|'md'|'lg' }) {
  const [err, setErr] = useState(false);
  if (photo && !err) return <img src={photo} alt={name} className={`ob-av ob-av--${size}`} onError={()=>setErr(true)} />;
  return <div className={`ob-av ob-av--${size} ob-av--init`}>{getInitials(name)}</div>;
}

export default function OfficeBearers() {
  const [activeDiv, setActiveDiv] = useState<string|null>(null);

  return (
    <div className="ob-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <span className="section-eyebrow">The Team Behind the Mission</span>
          <h1 className="page-header__title">Our<br />Leadership</h1>
          <p className="page-header__desc">Meet the dedicated students steering the IEEE CS MITS chapter — elected, passionate, and driven.</p>
        </div>
      </section>

      {/* Tenure bar */}
      <div className="ob-tenure">
        <div className="container ob-tenure__inner">
          <div className="ob-tenure__logos">
            <img src="/ieee-cs-logo.png" alt="IEEE CS" className="ob-tenure__logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
            <img src="/mits-logo.png" alt="MITS" className="ob-tenure__logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
          </div>
          <span className="ob-tenure__badge">Tenure 2025 – 2026</span>
          <span className="ob-tenure__text">Madhav Institute of Technology & Science, Gwalior</span>
        </div>
      </div>

      {/* Core Leadership */}
      <section className="section-pad ob-core-section">
        <WaveBackground variant="section" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-header">
            <span className="section-eyebrow">Executive Committee</span>
            <h2 className="section-title">Core Office Bearers</h2>
          </div>
          <div className="ob-core-grid">
            {LEADERSHIP.map((m, i) => (
              <div key={m.name} className={`ob-core-card ${i===0?'ob-core-card--chair':''}`}>
                {i===0 && <div className="ob-core-card__crown">★ Chairperson</div>}
                <div className="ob-core-card__photo-wrap">
                  <Avatar name={m.name} photo={m.photo} size="lg" />
                  <span className="ob-core-card__rank">{i+1}</span>
                </div>
                <h3 className="ob-core-card__name">{m.name}</h3>
                <p className="ob-core-card__pos">{m.position}</p>
                <div className="ob-core-card__socials">
                  <a href="#" className="ob-soc-btn" aria-label="LinkedIn"><Linkedin size={14}/></a>
                  <a href="#" className="ob-soc-btn" aria-label="GitHub"><Github size={14}/></a>
                  <a href="#" className="ob-soc-btn" aria-label="Email"><Mail size={14}/></a>
                </div>
                <div className="ob-core-card__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="section-pad ob-div-section">
        <WaveBackground variant="dark" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-header">
            <span className="section-eyebrow">Specialized Teams</span>
            <h2 className="section-title">Our Divisions</h2>
          </div>

          <div className="ob-div-tabs">
            <button className={`ev-chip ${activeDiv===null?'ev-chip--on':''}`} onClick={()=>setActiveDiv(null)}>All</button>
            {DIVISIONS.map(d=>(
              <button
                key={d.name}
                className={`ev-chip ${activeDiv===d.name?'ev-chip--on':''}`}
                style={activeDiv===d.name?{borderColor:d.color,color:d.color,boxShadow:`0 0 0 1px ${d.color}`}:{}}
                onClick={()=>setActiveDiv(activeDiv===d.name?null:d.name)}
              >{d.name}</button>
            ))}
          </div>

          {DIVISIONS.filter(d=>activeDiv===null||d.name===activeDiv).map(div=>(
            <div key={div.name} className="ob-div">
              <div className="ob-div__head" style={{ borderLeftColor:div.color }}>
                <h3 className="ob-div__title">{div.name}</h3>
                <span className="ob-div__count">{div.members.length} members</span>
              </div>
              <div className="ob-mem-grid">
                {div.members.map(m=>(
                  <div key={m.name} className="ob-mem-card">
                    <Avatar name={m.name} photo={(m as any).photo||null} size="sm" />
                    <div className="ob-mem-card__info">
                      <p className="ob-mem-card__name">{m.name}</p>
                      <p className="ob-mem-card__meta">{m.dept} · {m.year} Year</p>
                    </div>
                    <div className="ob-mem-card__socials">
                      <a href="#" className="ob-soc-btn ob-soc-btn--sm"><Linkedin size={12}/></a>
                      <a href="#" className="ob-soc-btn ob-soc-btn--sm"><Github size={12}/></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <WaveBackground variant="subtle" />
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Want to join the team?</h2>
            <p className="cta-banner__sub">Apply for membership and contribute to building our community.</p>
          </div>
          <div className="cta-banner__actions">
            <a href="/membership" className="btn btn-primary">Apply for Membership <ExternalLink size={15}/></a>
          </div>
        </div>
      </section>
    </div>
  );
}
