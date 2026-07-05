/*
Authors: [Write your names here]
Date: 2026-07-02
Description: Authentication routes for register, login, logout, and current user.
Imported packages: express, bcrypt
*/

const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../database');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    function handleInsert(error) {
      if (error) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
      return res.status(201).json({ message: 'Registration completed successfully.' });
    }
  );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (error, user) => {
      if (error || !user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      return res.json({ message: 'Login successful.' });
    }
  );
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logout successful.' });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  return res.json({
    userId: req.session.userId,
    username: req.session.username
  });
});

module.exports = router;
