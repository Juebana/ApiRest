const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, getBook, editBook, removeBook } = require('../controllers/bookController');

router.post('/', addBook);            // Crear libro
router.get('/', getAllBooks);         // Obtener todos los libros
router.get('/:id', getBook);          // Obtener libro por ID
router.put('/:id', editBook);         // Actualizar libro
router.delete('/:id', removeBook);    // Eliminar libro

module.exports = router;
