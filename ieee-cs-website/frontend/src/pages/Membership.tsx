import { useState } from 'react';
import { CheckCircle, BookOpen, Users, Star, Globe, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { membershipAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './Membership.css';

const BENEFITS = [
  { icon: BookOpen, title: 'IEEE Digital Library',    desc: 'Access thousands of technical papers, journals and magazines from IEEE Xplore.' },
  { icon: Users,    title: 'Global Network',           desc: 'Connect with 400,000+ IEEE professionals across 160+ countries.' },
  { icon: Star,     title: 'Exclusive Events',         desc: 'Priority registration for all chapter workshops, hackathons and seminars.' },
  { icon: Globe,    title: 'Career Resources',         desc: 'Job board, resume reviews, interview prep and career development tools.' },
];

export default function Membership() {
  const [success, setSuccess]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name:'', email:'', phone:'', college:'', branch:'',
    year_of_study:'', roll_number:'', ieee_membership_id:'', membership_type:'student',
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await membershipAPI.apply(form);
      setSuccess(true);
      toast.success('Application submitted! ✅');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Submission failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="membership-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <span className="section-eyebrow">Be Part of the Community</span>
          <h1 className="page-header__title">Membership</h1>
          <p className="page-header__desc">Join IEEE CS and become part of the world's most impactful student technical community.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad mem-benefits-section">
        <WaveBackground variant="section" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-header">
            <span className="section-eyebrow">Why Join?</span>
            <h2 className="section-title">Member Benefits</h2>
          </div>
          <div className="mem-benefits-grid">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="mem-benefit-card">
                <div className="mem-benefit-card__icon"><Icon size={22}/></div>
                <div>
                  <h4 className="mem-benefit-card__title">{title}</h4>
                  <p className="mem-benefit-card__desc">{desc}</p>
                </div>
                <div className="mem-benefit-card__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-pad mem-form-section">
        <WaveBackground variant="dark" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="mem-layout">
            <div>
              {success ? (
                <div className="reg-success__card">
                  <div className="reg-success__icon"><CheckCircle size={56}/></div>
                  <h2>Application Submitted!</h2>
                  <p>Thank you for applying. Our team will review your application and get back to you within 2–3 working days.</p>
                  <a href="/" className="btn btn-primary" style={{ marginTop:'1.5rem', display:'inline-flex' }}>Back to Home</a>
                </div>
              ) : (
                <div className="reg-form-card">
                  <h2 className="reg-form-title">Membership Application</h2>
                  <p className="reg-form-sub">Fill in your details to apply for IEEE CS chapter membership.</p>
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
                      <div className="form-group"><label>Year of Study *</label>
                        <select name="year_of_study" value={form.year_of_study} onChange={handle} required>
                          <option value="">Select year</option>
                          <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>Alumni</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label>Roll Number *</label><input name="roll_number" value={form.roll_number} onChange={handle} required placeholder="Enrollment/Roll number" /></div>
                      <div className="form-group"><label>Membership Type</label>
                        <select name="membership_type" value={form.membership_type} onChange={handle}>
                          <option value="student">Student Member</option>
                          <option value="associate">Associate Member</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label>IEEE Membership ID (if any)</label><input name="ieee_membership_id" value={form.ieee_membership_id} onChange={handle} placeholder="IEEE Member ID (optional)" /></div>
                    <button type="submit" className="btn btn-primary reg-submit" disabled={submitting}>
                      {submitting ? 'Submitting…' : <>Submit Application <ArrowRight size={16}/></>}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="mem-sidebar">
              <div className="mem-info-card">
                <div className="mem-info-card__logos">
                  <img src="/ieee-cs-logo.png" alt="IEEE CS" className="mem-info-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                  <img src="/mits-logo.png" alt="MITS" className="mem-info-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                </div>
                <h4>Student Membership</h4>
                <p>Open to all enrolled students. Get access to all chapter events and resources at MITS Gwalior.</p>
                <ul className="mem-checklist">
                  {['All chapter events','IEEE digital resources','Certification workshops','Networking opportunities','Letter of appreciation','Certificate of membership'].map(i=>(
                    <li key={i}><CheckCircle size={13}/> {i}</li>
                  ))}
                </ul>
              </div>

              <div className="mem-info-card mem-info-card--dark">
                <h4>IEEE Global Membership</h4>
                <p>Upgrade to official IEEE global membership for worldwide network access and publications.</p>
                <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noreferrer" className="btn btn-outline-gold" style={{ marginTop:'1rem', width:'100%', justifyContent:'center' }}>
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
