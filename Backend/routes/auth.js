const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db/init');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  const db = getDb();
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);

  if (!admin) {
    return res.status(401).json({ message: 'Identifiants incorrects.' });
  }

  const isValid = bcrypt.compareSync(password, admin.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Identifiants incorrects.' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ token, email: admin.email });
});

// POST /api/auth/change-password
router.post('/change-password', require('../middleware/auth').verifyToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Le nouveau mot de passe doit avoir au moins 6 caractères.' });
  }

  const db = getDb();
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id);

  const isValid = bcrypt.compareSync(currentPassword, admin.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Mot de passe actuel incorrect.' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hash, req.admin.id);

  res.json({ message: 'Mot de passe modifié avec succès.' });
});

module.exports = router;
