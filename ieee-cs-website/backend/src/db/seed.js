const pool = require('./connection');
const bcrypt = require('bcryptjs');

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Admin user
    const passwordHash = await bcrypt.hash('admin@ieee123', 12);
    await client.query(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `, ['IEEE CS Admin', 'ieeecsmits@gmail.com', passwordHash, 'admin']);

    // Sample events
    const events = [
      {
        title: 'Career Insights:  Blueprint 2026',
        description: 'Join us for an enlightening session on career roadmap. Industry experts will share in career opportunities in the field.',
        short_description: 'Explore the latest AI & ML trends with industry experts.',
        event_type: 'seminar',
        status: 'completed',
        date: '2026-03-26',
        time: '04:00:00',
        venue: 'Student Activity Center (SAC)',
        is_online: false,
        max_participants: 200,
        tags: ['Roadmap', 'AI impact on career', 'Tech Talk'],
        is_featured: true,
      },
      {
        title: 'Hackathon 2026: Code for Change',
        description: 'A 24-hour hackathon where teams compete to build innovative solutions for real-world problems. This year\'s theme is "Sustainable Technology for a Better Tomorrow".',
        short_description: '24-hour hackathon to build innovative tech solutions.',
        event_type: 'hackathon',
        status: 'upcoming',
        date: '2026-07-10',
        time: '09:00:00',
        end_date: '2026-07-11',
        venue: 'Computer Science Block',
        is_online: false,
        max_participants: 150,
        tags: ['Hackathon', 'Coding', 'Innovation'],
        is_featured: true,
      },
      {
        title: 'Workshop: Web Development with React & Node.js',
        description: 'A hands-on workshop covering modern web development practices using React.js for frontend and Node.js for backend development.',
        short_description: 'Hands-on full-stack web development workshop.',
        event_type: 'workshop',
        status: 'completed',
        date: '2026-04-20',
        time: '11:00:00',
        venue: 'Lab 301',
        is_online: false,
        max_participants: 60,
        current_participants: 58,
        tags: ['Web Dev', 'React', 'Node.js'],
        is_featured: false,
      },
    ];

    for (const event of events) {
      await client.query(`
        INSERT INTO events (title, description, short_description, event_type, status, date, time, end_date, venue, is_online, max_participants, current_participants, tags, is_featured)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT DO NOTHING
      `, [
        event.title, event.description, event.short_description,
        event.event_type, event.status, event.date, event.time,
        event.end_date || null, event.venue, event.is_online,
        event.max_participants, event.current_participants || 0,
        event.tags, event.is_featured
      ]);
    }

    // Office bearers
    const bearers = [
      { name: 'Ayan Ahmad Khan', position: 'Chairperson', department: 'Computer Science', year: '3rd Year', order_index: 1 },
      { name: 'Gagandeep Kushwaah', position: 'Vice Chairperson', department: 'Computer Science', year: '3rd Year', order_index: 2 },
      { name: 'Divita Joshi', position: 'Secretary', department: 'Information Technology', year: '3rd Year', order_index: 3 },
      { name: 'Devanshu Gupta', position: 'Treasurer', department: 'Computer Science', year: '2nd Year', order_index: 4 },
      { name: 'Ayush Gupta', position: 'Webmaster', department: 'CSE', year: '2nd Year', order_index: 7 },
    ];

    for (const bearer of bearers) {
      await client.query(`
        INSERT INTO office_bearers (name, position, department, year, order_index, tenure_year)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT DO NOTHING
      `, [bearer.name, bearer.position, bearer.department, bearer.year, bearer.order_index, '2025-2026']);
    }

    await client.query('COMMIT');
    console.log(' Database seeded successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(' Seeding failed:', err);
    throw err;
  } finally {
    client.release();
    process.exit(0);
  }
};

seed();
