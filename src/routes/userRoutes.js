import express from 'express';
import { getUsers, uploadAvatar } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);

router.post('/', verifyToken, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role
    `;
    const { rows } = await pool.query(query, [username, email, hashed, role]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const existing = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    let hashed = existing.rows[0].password;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    await pool.query(
      'UPDATE users SET username=$1, email=$2, password=$3, role=$4, updated_at=NOW() WHERE id=$5',
      [username, email, hashed, role, id]
    );

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM users');
    res.json({ message: 'All users deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting all users', error: err.message });
  }
});

export default router;
