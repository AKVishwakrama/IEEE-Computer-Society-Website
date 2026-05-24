import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-page">
      <div className="al-card">
        {/* Logos */}
        <div className="al-logos">
          <img src="/ieee-cs-logo.png" alt="IEEE CS" className="al-logo al-logo--ieee" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
          <div className="al-logo-divider" />
          <img src="/mits-logo.png" alt="MITS" className="al-logo al-logo--mits" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
        </div>

        <h1 className="al-title">Admin Login</h1>
        <p className="al-sub">Sign in to manage the IEEE CS chapter.</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@ieeecs.edu" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary reg-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="al-hint">Default: admin@ieeecs.edu / admin@ieee123</p>
      </div>
    </div>
  );
}
