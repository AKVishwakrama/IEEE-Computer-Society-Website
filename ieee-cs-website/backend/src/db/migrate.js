const pool = require('./connection');

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users / Admins
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('admin', 'member', 'moderator')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Events
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        short_description VARCHAR(500),
        event_type VARCHAR(100) DEFAULT 'workshop' CHECK (event_type IN ('workshop', 'seminar', 'hackathon', 'competition', 'webinar', 'conference', 'other')),
        status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
        date DATE NOT NULL,
        time TIME,
        end_date DATE,
        venue VARCHAR(255),
        is_online BOOLEAN DEFAULT false,
        meeting_link VARCHAR(500),
        registration_link VARCHAR(500),
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        image_url VARCHAR(500),
        tags TEXT[],
        is_featured BOOLEAN DEFAULT false,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Event Registrations
    await client.query(`
      CREATE TABLE IF NOT EXISTS event_registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id UUID REFERENCES events(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        college VARCHAR(255),
        branch VARCHAR(255),
        year_of_study VARCHAR(20),
        roll_number VARCHAR(100),
        ieee_member_id VARCHAR(100),
        is_ieee_member BOOLEAN DEFAULT false,
        registration_status VARCHAR(50) DEFAULT 'pending' CHECK (registration_status IN ('pending', 'confirmed', 'cancelled', 'waitlisted')),
        payment_status VARCHAR(50) DEFAULT 'free' CHECK (payment_status IN ('free', 'pending', 'paid', 'refunded')),
        notes TEXT,
        registered_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Office Bearers
    await client.query(`
      CREATE TABLE IF NOT EXISTS office_bearers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        department VARCHAR(255),
        year VARCHAR(20),
        email VARCHAR(255),
        linkedin_url VARCHAR(500),
        github_url VARCHAR(500),
        image_url VARCHAR(500),
        bio TEXT,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        tenure_year VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Gallery
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255),
        description TEXT,
        image_url VARCHAR(500) NOT NULL,
        event_id UUID REFERENCES events(id) ON DELETE SET NULL,
        category VARCHAR(100) DEFAULT 'general',
        is_featured BOOLEAN DEFAULT false,
        uploaded_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Memberships
    await client.query(`
      CREATE TABLE IF NOT EXISTS memberships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        college VARCHAR(255),
        branch VARCHAR(255),
        year_of_study VARCHAR(20),
        roll_number VARCHAR(100),
        ieee_membership_id VARCHAR(100),
        membership_type VARCHAR(50) DEFAULT 'student' CHECK (membership_type IN ('student', 'associate', 'full', 'senior')),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'rejected')),
        applied_at TIMESTAMP DEFAULT NOW(),
        approved_at TIMESTAMP,
        approved_by UUID REFERENCES users(id)
      );
    `);

    // Contact / Messages
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        replied_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Achievements / Awards
    await client.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        image_url VARCHAR(500),
        category VARCHAR(100),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query('COMMIT');
    console.log('✅ All tables created successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    process.exit(0);
  }
};

createTables();
