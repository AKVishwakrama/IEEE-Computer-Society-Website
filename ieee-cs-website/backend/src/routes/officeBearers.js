const express = require('express');
const pool = require('../db/connection');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/office-bearers
router.get('/', async (req, res) => {
  try {
    const { tenure_year, active } = req.query;
    let query = 'SELECT * FROM office_bearers WHERE 1=1';
    const params = [];
    let idx = 1;

    if (active !== 'false') { query += ` AND is_active = true`; }
    if (tenure_year) { query += ` AND tenure_year = $${idx++}`; params.push(tenure_year); }

    query += ' ORDER BY order_index ASC';
    const result = await pool.query(query, params);
    res.json({ success: true, bearers: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST /api/office-bearers (admin only)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, position, department, year, email, linkedin_url, github_url, image_url, bio, order_index, tenure_year } = req.body;
    const result = await pool.query(`
      INSERT INTO office_bearers (name, position, department, year, email, linkedin_url, github_url, image_url, bio, order_index, tenure_year)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
    `, [name, position, department, year, email, linkedin_url, github_url, image_url, bio, order_index || 0, tenure_year]);
    res.status(201).json({ success: true, bearer: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PUT /api/office-bearers/:id (admin only)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const fields = req.body;
    const setClause = Object.keys(fields).map((k, i) => `${k} = $${i + 2}`).join(', ');
    const result = await pool.query(
      `UPDATE office_bearers SET ${setClause} WHERE id = $1 RETURNING *`,
      [req.params.id, ...Object.values(fields)]
    );
    res.json({ success: true, bearer: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/office-bearers/:id (admin only)
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM office_bearers WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
