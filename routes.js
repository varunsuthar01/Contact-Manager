const express = require('express');
const router = express.Router();
const db = require('./db');

// CREATE
router.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ error: 'All fields required' });

  const sql = `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, phone], function (err) {
    if (err) return res.status(400).json({ error: 'Email already exists' });
    res.status(201).json({ id: this.lastID });
  });
});

// READ ALL
router.get('/contacts', (req, res) => {
  db.all(`SELECT * FROM contacts WHERE deleted=0 ORDER BY name`, [], (err, rows) => {
    res.json(rows);
  });
});

// READ ONE
router.get('/contacts/:id', (req, res) => {
  db.get(
    `SELECT * FROM contacts WHERE id=? AND deleted=0`,
    [req.params.id],
    (err, row) => res.json(row)
  );
});

// UPDATE
router.put('/contacts/:id', (req, res) => {
  const { name, email, phone } = req.body;
  db.run(
    `UPDATE contacts SET name=?, email=?, phone=? WHERE id=?`,
    [name, email, phone, req.params.id],
    () => res.json({ message: 'Updated successfully' })
  );
});

// DELETE (SOFT DELETE)
router.delete('/contacts/:id', (req, res) => {
  db.run(
    `UPDATE contacts SET deleted=1 WHERE id=?`,
    [req.params.id],
    () => res.json({ message: 'Deleted successfully' })
  );
});

module.exports = router;
