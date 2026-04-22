const express = require('express');
const router = express.Router();
const { getDb } = require('../db/init');

// GET /api/services - Liste publique des services
router.get('/', (req, res) => {
  const db = getDb();
  const services = db.prepare('SELECT * FROM services WHERE active = 1 ORDER BY order_index').all();
  res.json(services);
});

// GET /api/services/:slug
router.get('/:slug', (req, res) => {
  const db = getDb();
  const service = db.prepare('SELECT * FROM services WHERE slug = ? AND active = 1').get(req.params.slug);
  if (!service) return res.status(404).json({ message: 'Service non trouvé.' });
  res.json(service);
});

// GET /api/testimonials - Témoignages publics
router.get('/public/testimonials', (req, res) => {
  const db = getDb();
  const testimonials = db.prepare('SELECT * FROM testimonials WHERE active = 1 ORDER BY id DESC').all();
  res.json(testimonials);
});

// GET /api/settings/public - Paramètres publics
router.get('/public/settings', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(row => { settings[row.key] = row.value; });
  res.json(settings);
});

module.exports = router;
