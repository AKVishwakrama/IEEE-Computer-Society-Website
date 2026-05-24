const express = require('express');
const pool = require('../db/connection');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ==================== GALLERY ====================
// GET /api/gallery
router.get('/gallery', async (req, res) => {
  try {
    const { category, event_id, featured, limit = 20, offset = 0 } = req.query;
    let query = 'SELECT g.*, e.title as event_title FROM gallery g LEFT JOIN events e ON g.event_id = e.id WHERE 1=1';
    const params = [];
    let idx = 1;

    if (category) { query += ` AND g.category = $${idx++}`; params.push(category); }
    if (event_id) { query += ` AND g.event_id = $${idx++}`; params.push(event_id); }
    if (featured === 'true') { query += ` AND g.is_featured = true`; }
    query += ` ORDER BY g.created_at DESC LIMIT $${idx++} OFFSET $${idx++}`;
    params.push(Number(limit), Number(offset));

    const result = await pool.query(query, params);
    res.json({ success: true, images: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/gallery (admin only)
router.post('/gallery', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, description, image_url, event_id, category, is_featured } = req.body;
    const result = await pool.query(`
      INSERT INTO gallery (title, description, image_url, event_id, category, is_featured, uploaded_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
    `, [title, description, image_url, event_id, category || 'general', is_featured || false, req.user.id]);
    res.status(201).json({ success: true, image: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// DELETE /api/gallery/:id (admin only)
router.delete('/gallery/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== MEMBERSHIP ====================
// POST /api/membership/apply
router.post('/membership/apply', async (req, res) => {
  try {
    const { name, email, phone, college, branch, year_of_study, roll_number, ieee_membership_id, membership_type } = req.body;

    const existing = await pool.query('SELECT id FROM memberships WHERE email = $1', [email]);
    if (existing.rows[0]) return res.status(400).json({ success: false, message: 'Application already submitted with this email' });

    const result = await pool.query(`
      INSERT INTO memberships (name, email, phone, college, branch, year_of_study, roll_number, ieee_membership_id, membership_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
    `, [name, email, phone, college, branch, year_of_study, roll_number, ieee_membership_id, membership_type || 'student']);

    res.status(201).json({ success: true, membership: result.rows[0], message: 'Membership application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/membership (admin only)
router.get('/membership', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM memberships ORDER BY applied_at DESC');
    res.json({ success: true, memberships: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/membership/:id/status (admin only)
router.put('/membership/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      `UPDATE memberships SET status = $1, approved_at = $2, approved_by = $3 WHERE id = $4 RETURNING *`,
      [status, status === 'active' ? new Date() : null, req.user.id, req.params.id]
    );
    res.json({ success: true, membership: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CONTACT ====================
// POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message required' });

    const result = await pool.query(`
      INSERT INTO contacts (name, email, subject, message) VALUES ($1,$2,$3,$4) RETURNING *
    `, [name, email, subject, message]);

    res.status(201).json({ success: true, contact: result.rows[0], message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/contact (admin only)
router.get('/contact', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ success: true, contacts: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
