require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { initDb } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialiser la DB
initDb();

// Middlewares de sécurité
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { message: 'Trop de demandes, veuillez réessayer dans 1 heure.' } });
app.use('/api', limiter);
app.use('/api/contact', contactLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques (uploads + images frontend)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../Frontend/Images')));

// Tracking des visites
const { getDb } = require('./db/init');
app.use((req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/api/public')) {
    try {
      const db = getDb();
      db.prepare('INSERT INTO stats (page, ip) VALUES (?, ?)').run(req.path, req.ip);
    } catch {}
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));
app.use('/api/admin', require('./routes/admin'));

// Routes publiques séparées
const { getDb: db } = require('./db/init');
app.get('/api/public/settings', (req, res) => {
  const database = getDb();
  const rows = database.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(row => { settings[row.key] = row.value; });
  res.json(settings);
});

app.get('/api/public/testimonials', (req, res) => {
  const database = getDb();
  const testimonials = database.prepare('SELECT * FROM testimonials WHERE active = 1 ORDER BY id DESC').all();
  res.json(testimonials);
});

app.get('/api/public/gallery', (req, res) => {
  const database = getDb();
  const gallery = database.prepare("SELECT * FROM gallery WHERE active = 1 ORDER BY created_at DESC").all();
  res.json(gallery);
});

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'BEKOLIA API en ligne' }));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur interne.' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur BEKOLIA démarré sur http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/api/admin`);
  console.log(`📝 Logs: ${new Date().toLocaleString('fr-FR')}\n`);
});
