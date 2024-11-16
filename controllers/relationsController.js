const { loadSales } = require('../models/sale');
const { loadBookstores } = require('../models/bookstore');
const { loadBooks } = require('../models/book');

// 1. Obtener el número de copias vendidas de un libro específico
const getCopiesSold = (req, res) => {
  const { bookId } = req.params;
  const sales = loadSales();
  const copiesSold = sales.reduce((total, sale) => {
    return sale.bookId === bookId ? total + sale.quantity : total;
  }, 0);
  res.json({ bookId, copiesSold });
};

// 2. Obtener librerías con más de una cierta cantidad de copias de un libro
const getBookstoresWithStock = (req, res) => {
  const { bookId, minCopies } = req.query;
  const bookstores = loadBookstores();
  const filteredStores = bookstores.filter(store =>
    store.inventory.some(item => item.bookId === bookId && item.quantity >= parseInt(minCopies))
  );
  res.json(filteredStores);
};

// 3. Calcular los ingresos de una librería específica
const getBookstoreRevenue = (req, res) => {
  const { bookstoreId } = req.params;
  const sales = loadSales();
  const books = loadBooks();

  const revenue = sales.reduce((total, sale) => {
    if (sale.bookstoreId === bookstoreId) {
      const book = books.find(b => b.id === sale.bookId);
      return total + (book ? book.price * sale.quantity : 0);
    }
    return total;
  }, 0);

  res.json({ bookstoreId, revenue });
};

module.exports = { getCopiesSold, getBookstoresWithStock, getBookstoreRevenue };
