const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const USERS_FILE = './data/users.json';

const createUser = async (username, password) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8') || '[]');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  return newUser;
};

const findUserByUsername = (username) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8') || '[]');
  return users.find(user => user.username === username);
};

module.exports = { createUser, findUserByUsername };
