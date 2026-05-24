import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventRegister from './pages/EventRegister';
import OfficeBearers from './pages/OfficeBearers';
import Membership from './pages/Membership';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles/globals.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const hideNav = pathname === '/admin/login';
  return (
    <>
      {!hideNav && <Navbar />}
      <main>{children}</main>
      {!hideNav && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      background: 'var(--bg-primary)', paddingTop: 'var(--nav-height)',
    }}>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '10rem', color: 'var(--gold)', lineHeight: 1 }}>404</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>This page doesn't exist.</p>
      <a href="/" className="btn btn-primary">← Go Home</a>
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/"                      element={<Home />} />
        <Route path="/about"                 element={<About />} />
        <Route path="/events"                element={<Events />} />
        <Route path="/events/:id"            element={<EventRegister />} />
        <Route path="/events/:id/register"   element={<EventRegister />} />
        <Route path="/register"              element={<Events />} />
        <Route path="/office-bearers"        element={<OfficeBearers />} />
        <Route path="/membership"            element={<Membership />} />
        <Route path="/gallery"               element={<Gallery />} />
        <Route path="/contact"               element={<Contact />} />
        <Route path="/admin/login"           element={<AdminLogin />} />
        <Route path="/admin"                 element={<AdminDashboard />} />
        <Route path="*"                      element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          {loading && <LoadingScreen onDone={() => setLoading(false)} />}
          {!loading && (
            <>
              <ScrollToTop />
              <AppRoutes />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: 'var(--surface-card)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '10px',
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: '0.88rem',
                    boxShadow: 'var(--shadow-lg)',
                  },
                  success: { iconTheme: { primary: '#F5C518', secondary: '#0D0D12' } },
                  error:   { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
                }}
              />
            </>
          )}
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
