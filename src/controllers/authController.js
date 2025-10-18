import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Username, email, password, dan role wajib diisi' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Email tidak valid' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role
    `;
    const { rows } = await pool.query(query, [username, email, hashed, role]);

    res.status(201).json({ message: 'User registered', user: rows[0] });

  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Username atau email sudah dipakai' });
    }
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (!rows.length) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: rows[0].id, username: rows[0].username, email: rows[0].email, role: rows[0].role },
      process.env.JWT_SECRET,   // gunakan JWT_SECRET dari index.js
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
