const express = require('express');
const router = express.Router();
const { getDb } = require('../db/init');

// POST /api/contact - Formulaire de contact
router.post('/', (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Nom et téléphone sont obligatoires.' });
  }

  const db = getDb();
  const result = db.prepare(
    'INSERT INTO contacts (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)'
  ).run(name, phone, email || null, service || null, message || null);

  res.status(201).json({
    message: 'Message envoyé avec succès ! Nous vous contactons dans les plus brefs délais.',
    id: result.lastInsertRowid
  });
});

// POST /api/contact/quote - Demande de devis
router.post('/quote', (req, res) => {
  const { name, phone, email, service, address, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Nom et téléphone sont obligatoires.' });
  }

  const db = getDb();
  const fullMessage = `DEMANDE DE DEVIS\nAdresse: ${address || 'Non précisée'}\n\n${message || ''}`;
  const result = db.prepare(
    'INSERT INTO contacts (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)'
  ).run(name, phone, email || null, service || null, fullMessage);

  res.status(201).json({
    message: 'Votre demande de devis a été envoyée ! Nous vous rappelons sous 30 minutes.',
    id: result.lastInsertRowid
  });
});

module.exports = router;
