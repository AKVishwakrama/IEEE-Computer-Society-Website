import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Linkedin, Github, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';
import WaveBackground from '../components/WaveBackground';
import './Contact.css';

export default function Contact() {
  const [success, setSuccess]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactAPI.send(form);
      setSuccess(true);
      toast.success('Message sent! We\'ll get back to you soon.');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page page-transition">
      <section className="page-header">
        <div className="page-header__bg" />
        <WaveBackground variant="hero" />
        <div className="container page-header__content">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="page-header__title">Contact Us</h1>
          <p className="page-header__desc">Have questions, ideas, or want to collaborate? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section-pad contact-body">
        <WaveBackground variant="section" />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="contact-layout">

            {/* Info card */}
            <div className="contact-info-card">
              <div className="contact-info-card__logos">
                <img src="/ieee-cs-logo.png" alt="IEEE CS" className="contact-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                <img src="/mits-logo.png"    alt="MITS"    className="contact-logo" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
              </div>

              <h3>Reach Out</h3>
              <p>We're always open to new ideas, partnerships, and conversations. Drop us a message — we'll respond within 48-72 hours!</p>

              <div className="contact-details">
                {[
                  { icon: Mail,    label:'Email',     content:<a href="mailto:contact@ieee-cs.org">contact@ieee-cs.org</a> },
                  { icon: Phone,   label:'Phone',     content:<span>+91 92445 24591</span> },
                  { icon: MapPin,  label:'Address',   content:<span>IEEE CS Chapter, CSE Dept,<br />MITS Gwalior — 474005</span> },
                  { icon: Clock,   label:'Response',  content:<span>Usually within 48-72 hours</span> },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="contact-detail">
                    <div className="contact-detail__icon"><Icon size={17}/></div>
                    <div>
                      <p className="contact-detail__label">{label}</p>
                      <div className="contact-detail__value">{content}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-socials">
                <p className="contact-socials__label">Follow us</p>
                <div className="contact-socials__row">
                  {[{icon:Linkedin,href:'#'},{icon:Github,href:'#'},{icon:Instagram,href:'#'}].map(({icon:Icon,href},i)=>(
                    <a key={i} href={href} className="contact-social-btn"><Icon size={17}/></a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {success ? (
                <div className="reg-success__card">
                  <div className="reg-success__icon"><CheckCircle size={56}/></div>
                  <h2>Message Sent!</h2>
                  <p>Thanks for reaching out. We'll respond to your inquiry as soon as possible.</p>
                </div>
              ) : (
                <div className="reg-form-card">
                  <h2 className="reg-form-title">Send a Message</h2>
                  <p className="reg-form-sub">Fill out the form and we'll get back to you shortly.</p>
                  <form onSubmit={submit}>
                    <div className="form-row">
                      <div className="form-group"><label>Your Name *</label><input name="name" value={form.name} onChange={handle} required placeholder="Full name" /></div>
                      <div className="form-group"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" /></div>
                    </div>
                    <div className="form-group"><label>Subject</label><input name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" /></div>
                    <div className="form-group"><label>Message *</label><textarea name="message" value={form.message} onChange={handle} required rows={6} placeholder="Write your message here…" /></div>
                    <button type="submit" className="btn btn-primary reg-submit" disabled={submitting}>
                      {submitting ? 'Sending…' : <><Send size={16}/> Send Message</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
