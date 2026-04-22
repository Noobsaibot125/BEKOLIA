const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../db/init');
const { verifyToken } = require('../middleware/auth');

// Config upload
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|mov|avi/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error('Type de fichier non autorisé'));
  }
});

// Toutes les routes admin nécessitent le token
router.use(verifyToken);

// ===== DASHBOARD =====
router.get('/dashboard', (req, res) => {
  const db = getDb();
  const stats = {
    contacts: db.prepare('SELECT COUNT(*) as c FROM contacts').get().c,
    newContacts: db.prepare("SELECT COUNT(*) as c FROM contacts WHERE status = 'nouveau'").get().c,
    services: db.prepare('SELECT COUNT(*) as c FROM services WHERE active = 1').get().c,
    testimonials: db.prepare('SELECT COUNT(*) as c FROM testimonials WHERE active = 1').get().c,
    gallery: db.prepare('SELECT COUNT(*) as c FROM gallery WHERE active = 1').get().c,
    visitors: db.prepare('SELECT COUNT(*) as c FROM stats').get().c,
    visitorsToday: db.prepare("SELECT COUNT(*) as c FROM stats WHERE date(visited_at) = date('now')").get().c,
  };
  res.json(stats);
});

// ===== MESSAGES / CONTACTS =====
router.get('/contacts', (req, res) => {
  const db = getDb();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

router.patch('/contacts/:id/status', (req, res) => {
  const { status } = req.body;
  const db = getDb();
  db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ message: 'Statut mis à jour.' });
});

router.delete('/contacts/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ message: 'Message supprimé.' });
});

// ===== SERVICES =====
router.get('/services', (req, res) => {
  const db = getDb();
  const services = db.prepare('SELECT * FROM services ORDER BY order_index').all();
  res.json(services);
});

router.put('/services/:id', (req, res) => {
  const { name, description, price, active } = req.body;
  const db = getDb();
  db.prepare('UPDATE services SET name = ?, description = ?, price = ?, active = ? WHERE id = ?')
    .run(name, description, price, active ? 1 : 0, req.params.id);
  res.json({ message: 'Service mis à jour.' });
});

// ===== TÉMOIGNAGES =====
router.get('/testimonials', (req, res) => {
  const db = getDb();
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY id DESC').all();
  res.json(testimonials);
});

router.post('/testimonials', (req, res) => {
  const { name, location, rating, comment } = req.body;
  const db = getDb();
  const result = db.prepare('INSERT INTO testimonials (name, location, rating, comment) VALUES (?, ?, ?, ?)')
    .run(name, location, rating || 5, comment);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Témoignage ajouté.' });
});

router.put('/testimonials/:id', (req, res) => {
  const { name, location, rating, comment, active } = req.body;
  const db = getDb();
  db.prepare('UPDATE testimonials SET name = ?, location = ?, rating = ?, comment = ?, active = ? WHERE id = ?')
    .run(name, location, rating, comment, active ? 1 : 0, req.params.id);
  res.json({ message: 'Témoignage mis à jour.' });
});

router.delete('/testimonials/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ message: 'Témoignage supprimé.' });
});

// ===== GALERIE =====
router.get('/gallery', (req, res) => {
  const db = getDb();
  const images = db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
  res.json(images);
});

router.post('/gallery', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Fichier manquant.' });
  const { title, category } = req.body;
  const db = getDb();
  const result = db.prepare('INSERT INTO gallery (title, filename, category) VALUES (?, ?, ?)')
    .run(title || '', req.file.filename, category || 'intervention');
  res.status(201).json({ id: result.lastInsertRowid, filename: req.file.filename, message: 'Fichier uploadé.' });
});

router.put('/gallery/:id', (req, res) => {
  const { title, category } = req.body;
  const db = getDb();
  db.prepare('UPDATE gallery SET title = ?, category = ? WHERE id = ?').run(title || '', category || 'intervention', req.params.id);
  res.json({ message: 'Galerie mise à jour.' });
});

router.delete('/gallery/:id', (req, res) => {
  const db = getDb();
  const image = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (image) {
    const filePath = path.join(uploadDir, image.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  }
  res.json({ message: 'Image supprimée.' });
});

// ===== PARAMÈTRES =====
router.get('/settings', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(row => { settings[row.key] = row.value; });
  res.json(settings);
});

router.put('/settings', (req, res) => {
  const db = getDb();
  const update = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
  const updateMany = db.transaction((entries) => {
    entries.forEach(([key, value]) => update.run(key, value));
  });
  updateMany(Object.entries(req.body));
  res.json({ message: 'Paramètres sauvegardés.' });
});

// ===== STATISTIQUES =====
router.get('/stats/visits', (req, res) => {
  const db = getDb();
  const byDay = db.prepare(`
    SELECT date(visited_at) as date, COUNT(*) as count
    FROM stats
    WHERE visited_at >= datetime('now', '-30 days')
    GROUP BY date(visited_at)
    ORDER BY date
  `).all();
  res.json(byDay);
});

module.exports = router;
