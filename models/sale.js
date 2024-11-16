const fs = require('fs');
const SALES_FILE = './data/sales.json';

const loadSales = () => {
  const data = fs.readFileSync(SALES_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
};

module.exports = { loadSales };
