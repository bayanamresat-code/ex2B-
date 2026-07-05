/*
Authors: [Write your names here]
Date: 2026-07-02
Description: Task CRUD routes for authenticated users only.
Imported packages: express
*/

const express = require('express');
const { db } = require('../database');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }
  return next();
});

router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
    [req.session.userId],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to load tasks.' });
      }
      return res.json(rows);
    }
  );
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
    [req.session.userId, title, description || ''],
    function handleInsert(error) {
      if (error) {
        return res.status(500).json({ message: 'Failed to add task.' });
      }
      return res.status(201).json({ id: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  db.get(
    'SELECT status FROM tasks WHERE id = ? AND user_id = ?',
    [req.params.id, req.session.userId],
    (error, task) => {
      if (error || !task) {
        return res.status(404).json({ message: 'Task not found.' });
      }

      const nextStatus = task.status === 'done' ? 'pending' : 'done';
      db.run(
        'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
        [nextStatus, req.params.id, req.session.userId],
        (updateError) => {
          if (updateError) {
            return res.status(500).json({ message: 'Failed to update task.' });
          }
          return res.json({ message: 'Task updated.' });
        }
      );
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [req.params.id, req.session.userId],
    (error) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to delete task.' });
      }
      return res.json({ message: 'Task deleted.' });
    }
  );
});

module.exports = router;
