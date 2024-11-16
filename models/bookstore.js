const fs = require('fs');
const BOOKSTORES_FILE = './data/bookstores.json';

const loadBookstores = () => {
  const data = fs.readFileSync(BOOKSTORES_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
};

module.exports = { loadBookstores };
