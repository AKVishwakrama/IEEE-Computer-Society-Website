# IEEE Computer Society — College Chapter Website

A full-stack website for your IEEE CS student chapter built with **React + TypeScript** (frontend) and **Node.js + Express + PostgreSQL** (backend).

---

## 🎨 Design

- **Color Palette**: Warm Gold (`#F5C518`) · Cream (`#FDF8EE`) · Charcoal (`#1A1A2E`)
- **Fonts**: Bebas Neue (display) + DM Serif Display (headings) + DM Sans (body)
- **Smooth scrolling**, hover animations, responsive grid layouts

---

## 📁 Project Structure

```
ieee-cs-website/
├── frontend/               # React + TypeScript + Vite
│   └── src/
│       ├── components/     # Navbar, Footer
│       ├── context/        # AuthContext (JWT)
│       ├── pages/          # All route pages
│       ├── services/       # Axios API layer
│       └── styles/         # Global CSS variables
│
└── backend/                # Node.js + Express
    └── src/
        ├── db/             # connection.js, migrate.js, seed.js
        ├── middleware/     # JWT auth middleware
        └── routes/         # auth, events, office-bearers, gallery, membership, contact
```

---

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Setup PostgreSQL Database

Create a database:
```sql
CREATE DATABASE ieee_cs_db;
```

### 3. Configure Environment Variables

**Backend** — copy `.env.example` to `.env`:
```
PORT=5000
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/ieee_cs_db
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend** — copy `.env.example` to `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Database Migrations & Seed

```bash
cd backend
npm run db:migrate   # Creates all tables
npm run db:seed      # Inserts sample data + admin user
```

### 5. Start Development Servers

**Backend** (Terminal 1):
```bash
cd backend && npm run dev
# Runs on http://localhost:5000
```

**Frontend** (Terminal 2):
```bash
cd frontend && npm run dev
# Runs on http://localhost:5173
```

---

## 🔑 Default Admin Login

```
Email:    ieeecsmits@gmail.com
Password: admin@ieee123
```

Visit: http://localhost:5173/admin/login

---

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, Stats, About snippet, Events |
| `/about` | About IEEE CS — Mission, Vision, IEEE global |
| `/events` | Events — Filter by type & status |
| `/events/:id` | Event Detail + Registration Form |
| `/events/:id/register` | Direct Registration |
| `/register` | Register / Participate (redirects to events) |
| `/office-bearers` | Leadership — Core team + All divisions |
| `/membership` | Membership Application |
| `/gallery` | Photo Gallery with lightbox |
| `/contact` | Contact Form |
| `/admin/login` | Admin Login |
| `/admin` | Admin Dashboard |

---

## 🗄️ API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all events (filter: status, type, featured) |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create event (admin) |
| PUT | `/api/events/:id` | Update event (admin) |
| DELETE | `/api/events/:id` | Delete event (admin) |
| POST | `/api/events/:id/register` | Register for event |
| GET | `/api/events/:id/registrations` | Get registrations (admin) |

### Office Bearers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/office-bearers` | List all |
| POST | `/api/office-bearers` | Create (admin) |
| PUT | `/api/office-bearers/:id` | Update (admin) |
| DELETE | `/api/office-bearers/:id` | Delete (admin) |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | List images |
| POST | `/api/gallery` | Add image (admin) |
| DELETE | `/api/gallery/:id` | Delete (admin) |

### Membership
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/membership/apply` | Apply for membership |
| GET | `/api/membership` | List applications (admin) |
| PUT | `/api/membership/:id/status` | Update status (admin) |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Send message |
| GET | `/api/contact` | List messages (admin) |

---

## 🗃️ Database Schema (PostgreSQL)

- `users` — Admin users
- `events` — All chapter events
- `event_registrations` — Event participant registrations
- `office_bearers` — Leadership team
- `gallery` — Photo gallery images
- `memberships` — Membership applications
- `contacts` — Contact form messages
- `achievements` — Awards & achievements

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Routing | React Router v6 |
| Styling | Pure CSS with CSS Variables |
| HTTP Client | Axios |
| Auth | JWT (jsonwebtoken) |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (via `pg`) |
| ORM | Raw SQL queries |
| Notifications | react-hot-toast |

---

## 🌐 Office Bearers (Tenure 2025–2026)

Data sourced from the official IEEE CS MITS chapter:

**Core Leadership:**
- Ayan Ahmed Khan — Chairperson
- Gagandeep Kushwah — Vice Chairperson
- Divita Joshi — Secretary
- Devanshu Gupta — Treasurer

**Divisions:** Technical Development · Operations & Management · Public Relations · Content & Copywriting · Creative Design

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend && npm run build
# Deploy `dist/` to Vercel / Netlify
```

### Backend (Railway / Render)
- Set all environment variables in the platform dashboard
- Use `npm start` as the start command
- Use a managed PostgreSQL service (Railway, Supabase, Neon)

---

## 📝 Customization

1. **Update college name/details** — Search for "Your College" across all files
2. **Replace placeholder photos** — Update `LEADERSHIP` array in `OfficeBearers.tsx` with real photo URLs
3. **Update contact info** — Edit `Footer.tsx` and `Contact.tsx`
4. **Add LinkedIn/GitHub links** — Update social links in `OfficeBearers.tsx`

---

Made with ❤️ for IEEE CS chapters everywhere.
