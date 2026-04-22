const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'bekolia.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

function initDb() {
  const database = getDb();

  database.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service TEXT,
      message TEXT,
      status TEXT DEFAULT 'nouveau',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      price TEXT,
      active INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      rating INTEGER DEFAULT 5,
      comment TEXT NOT NULL,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      filename TEXT NOT NULL,
      category TEXT DEFAULT 'intervention',
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT,
      ip TEXT,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Admin par défaut
  const existingAdmin = database.prepare('SELECT id FROM admins WHERE email = ?').get(process.env.ADMIN_EMAIL || 'admin@bekolia.ci');
  if (!existingAdmin) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Bekolia@2024', 10);
    database.prepare('INSERT INTO admins (email, password) VALUES (?, ?)').run(
      process.env.ADMIN_EMAIL || 'admin@bekolia.ci',
      hash
    );
  }

  // Services par défaut
  const servicesCount = database.prepare('SELECT COUNT(*) as c FROM services').get();
  if (servicesCount.c === 0) {
    const services = [
      { slug: 'desinsectisation', name: 'Désinsectisation', description: 'Élimination complète de tous les insectes nuisibles : fourmis, blattes, punaises de lit, moustiques, mouches. Traitement professionnel avec produits homologués.', icon: 'FaBug', price: 'À partir de 25 000 FCFA', order_index: 1 },
      { slug: 'deratisation', name: 'Dératisation', description: 'Éradication efficace des rongeurs (rats, souris) par poses de pièges et appâts sécurisés. Traitement préventif et curatif pour tous types de locaux.', icon: 'GiRat', price: 'À partir de 30 000 FCFA', order_index: 2 },
      { slug: 'desinfection', name: 'Désinfection', description: 'Assainissement complet de vos locaux par brumisation ou pulvérisation de produits bactéricides et virucides. Idéal après infestation ou épidémie.', icon: 'FaSprayCan', price: 'À partir de 20 000 FCFA', order_index: 3 },
      { slug: 'anti-moustiques', name: 'Traitement Anti-Moustiques', description: 'Brumisation thermique et ULV contre les moustiques. Protection durable pour jardins, terrasses, hôtels, campements et zones humides.', icon: 'GiMosquito', price: 'À partir de 15 000 FCFA', order_index: 4 },
      { slug: 'cafards', name: 'Traitement des Cafards', description: 'Élimination radicale des blattes et cafards par gel insecticide, poudres et spray. Résultats visibles en 24-48h. Garantie 3 mois.', icon: 'GiCockroach', price: 'À partir de 20 000 FCFA', order_index: 5 },
      { slug: 'termites', name: 'Traitement des Termites', description: 'Protection anti-termites pour bâtiments, mobiliers et structures en bois. Traitement curatif et barrière préventive autour des fondations.', icon: 'GiWorm', price: 'Sur devis', order_index: 6 },
      { slug: 'fumigation', name: 'Fumigation', description: 'Traitement par fumigation pour désinfecter et désinfecter des espaces clos : conteneurs, entrepôts, véhicules, bateaux. Efficacité garantie.', icon: 'MdOutlineSmoke', price: 'Sur devis', order_index: 7 },
      { slug: 'assainissement', name: 'Assainissement', description: 'Nettoyage complet et assainissement de vos locaux après intervention. Élimination des cadavres, déjections et odeurs. Locaux propres et sains.', icon: 'FaBroom', price: 'Sur devis', order_index: 8 }
    ];
    const insertService = database.prepare('INSERT INTO services (slug, name, description, icon, price, order_index) VALUES (?, ?, ?, ?, ?, ?)');
    services.forEach(s => insertService.run(s.slug, s.name, s.description, s.icon, s.price, s.order_index));
  }

  // Témoignages par défaut
  const testimonialsCount = database.prepare('SELECT COUNT(*) as c FROM testimonials').get();
  if (testimonialsCount.c === 0) {
    const testimonials = [
      { name: 'Kouassi Jean-Marc', location: 'Cocody, Abidjan', rating: 5, comment: 'Excellent service ! L\'équipe est venue en moins de 2 heures après mon appel. Les cafards ont totalement disparu. Je recommande vivement BEKOLIA à tous.' },
      { name: 'Madame Traoré', location: 'Plateau, Abidjan', rating: 5, comment: 'Après plusieurs tentatives avec d\'autres sociétés, BEKOLIA a enfin résolu notre problème de rats. Personnel professionnel et produits efficaces. Merci !' },
      { name: 'Restaurant Le Saveur', location: 'Marcory, Abidjan', rating: 5, comment: 'Nous faisons appel à BEKOLIA chaque trimestre pour la désinsectisation de notre restaurant. Impeccable, sérieux et discret. Notre restaurant est certifié propre !' },
      { name: 'Koné Ibrahim', location: 'Yopougon, Abidjan', rating: 5, comment: 'Service rapide et efficace pour les termites qui rongeaient ma maison. Le traitement préventif était très professionnel. Prix correct pour la qualité offerte.' },
      { name: 'Hôtel Palm Beach', location: 'Treichville, Abidjan', rating: 5, comment: 'BEKOLIA est notre partenaire depuis 2 ans. Traitement régulier anti-moustiques pour nos jardins. Nos clients sont enfin tranquilles le soir. Excellent partenaire !' }
    ];
    const insertTestimonial = database.prepare('INSERT INTO testimonials (name, location, rating, comment) VALUES (?, ?, ?, ?)');
    testimonials.forEach(t => insertTestimonial.run(t.name, t.location, t.rating, t.comment));
  }

  // Paramètres par défaut
  const defaultSettings = [
    ['company_name', 'BEKOLIA'],
    ['company_tagline', 'Expert en Fumigation et Brumisation'],
    ['company_phone', '+225 07 19 00 87 66'],
    ['company_whatsapp', '+2250719008766'],
    ['company_email', 'contact@bekolia.ci'],
    ['company_address', 'Abidjan, Côte d\'Ivoire'],
    ['company_hours', '7j/7 - 24h/24'],
    ['hero_title', 'Élimination Rapide des Nuisibles en Côte d\'Ivoire'],
    ['hero_subtitle', 'Experts en fumigation, brumisation et traitement anti-nuisibles. Intervention rapide 7j/7. Résultats garantis.'],
  ];
  const insertSetting = database.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  defaultSettings.forEach(([key, value]) => insertSetting.run(key, value));

  console.log('✅ Base de données initialisée avec succès');
  return database;
}

module.exports = { getDb, initDb };
