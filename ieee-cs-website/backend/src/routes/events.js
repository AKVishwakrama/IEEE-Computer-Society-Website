const express = require('express');
const pool = require('../db/connection');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const { status, type, featured, limit = 20, offset = 0 } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];
    let idx = 1;

    if (status) { query += ` AND status = $${idx++}`; params.push(status); }
    if (type) { query += ` AND event_type = $${idx++}`; params.push(type); }
    if (featured === 'true') { query += ` AND is_featured = true`; }

    query += ` ORDER BY date DESC LIMIT $${idx++} OFFSET $${idx++}`;
    params.push(Number(limit), Number(offset));

    const result = await pool.query(query, params);
    const countResult = await pool.query('SELECT COUNT(*) FROM events');

    res.json({ success: true, events: result.rows, total: parseInt(countResult.rows[0].count) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/events - Create event (admin only)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const {
      title, description, short_description, event_type, status,
      date, time, end_date, venue, is_online, meeting_link,
      registration_link, max_participants, image_url, tags, is_featured
    } = req.body;

    const result = await pool.query(`
      INSERT INTO events (title, description, short_description, event_type, status, date, time,
        end_date, venue, is_online, meeting_link, registration_link, max_participants,
        image_url, tags, is_featured, created_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING *
    `, [title, description, short_description, event_type, status, date, time,
        end_date, venue, is_online, meeting_link, registration_link, max_participants,
        image_url, tags, is_featured, req.user.id]);

    res.status(201).json({ success: true, event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PUT /api/events/:id - Update event (admin only)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const fields = req.body;
    const setClause = Object.keys(fields).map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = [req.params.id, ...Object.values(fields)];
    const result = await pool.query(
      `UPDATE events SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      values
    );
    res.json({ success: true, event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// DELETE /api/events/:id (admin only)
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/events/:id/register - Register for event
router.post('/:id/register', async (req, res) => {
  try {
    const { name, email, phone, college, branch, year_of_study, roll_number, ieee_member_id, is_ieee_member, notes } = req.body;

    // Check event exists
    const eventRes = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (!eventRes.rows[0]) return res.status(404).json({ success: false, message: 'Event not found' });

    // Check already registered
    const existing = await pool.query(
      'SELECT id FROM event_registrations WHERE event_id = $1 AND email = $2',
      [req.params.id, email]
    );
    if (existing.rows[0]) return res.status(400).json({ success: false, message: 'Already registered with this email' });

    const result = await pool.query(`
      INSERT INTO event_registrations
        (event_id, name, email, phone, college, branch, year_of_study, roll_number, ieee_member_id, is_ieee_member, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *
    `, [req.params.id, name, email, phone, college, branch, year_of_study, roll_number, ieee_member_id, is_ieee_member || false, notes]);

    // Increment participant count
    await pool.query('UPDATE events SET current_participants = current_participants + 1 WHERE id = $1', [req.params.id]);

    res.status(201).json({ success: true, registration: result.rows[0], message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/events/:id/registrations (admin only)
router.get('/:id/registrations', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM event_registrations WHERE event_id = $1 ORDER BY registered_at DESC',
      [req.params.id]
    );
    res.json({ success: true, registrations: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
