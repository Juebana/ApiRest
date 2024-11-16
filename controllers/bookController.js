const { loadBooks, createBook, getBookById, updateBook, deleteBook } = require('../models/book');

// Crear libro
const addBook = (req, res) => {
  const { title, author, price } = req.body;
  if (!title || !author || price == null) {
    return res.status(400).json({ message: 'Title, author, and price are required' });
  }
  const newBook = createBook(title, author, price);
  res.status(201).json(newBook);
};

// Obtener todos los libros con filtros y ordenamiento
const getAllBooks = (req, res) => {
  let books = loadBooks();

  // Filtrado
  const { author, title } = req.query;
  if (author) {
    books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (title) {
    books = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  // Ordenamiento
  const { sortBy, order } = req.query;
  if (sortBy) {
    books = books.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === 'desc' ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  res.json(books);
};

// Obtener libro por ID
const getBook = (req, res) => {
  const book = getBookById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

// Actualizar libro
const editBook = (req, res) => {
  const updatedBook = updateBook(req.params.id, req.body);
  if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
  res.json(updatedBook);
};

// Eliminar libro
const removeBook = (req, res) => {
  const deletedBook = deleteBook(req.params.id);
  if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
  res.json(deletedBook);
};

module.exports = { addBook, getAllBooks, getBook, editBook, removeBook };
