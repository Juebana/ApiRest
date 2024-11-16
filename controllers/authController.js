const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const { createUser, findUserByUsername } = require('../models/users');

// Registro de usuario
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = await createUser(username, password);
  res.status(201).json({ message: 'User registered', user: newUser.id });
};

// Login de usuario
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};

module.exports = { register, login };
