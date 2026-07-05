/*
Authors: [Write your names here]
Date: 2026-07-02
Description: Main Express server for Task Flow. Handles authentication, session management, API routes, and static files.
Imported packages: express, path, express-session
GitHub URL: [Write repository URL here]
*/

const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { initializeDatabase } = require('./database');

const app = express();
const PORT = 3000;

initializeDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'task-flow-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  return res.sendFile(path.join(__dirname, 'public', 'tasks.html'));
});

app.listen(PORT, () => {
  console.log(`Task Flow server running on http://localhost:${PORT}`);
});
