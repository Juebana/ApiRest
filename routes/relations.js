const express = require('express');
const router = express.Router();
const { getCopiesSold, getBookstoresWithStock, getBookstoreRevenue } = require('../controllers/relationsController');

// Número de copias vendidas de un libro específico
router.get('/copies-sold/:bookId', getCopiesSold);

// Librerías con más de una cierta cantidad de copias de un libro
router.get('/bookstores-with-stock', getBookstoresWithStock);

// Ingresos de una librería específica
router.get('/revenue/:bookstoreId', getBookstoreRevenue);

module.exports = router;
