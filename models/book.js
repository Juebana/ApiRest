const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const BOOKS_FILE = './data/books.json';

const loadBooks = () => {
  const data = fs.readFileSync(BOOKS_FILE, 'utf-8');
  const jsonData = JSON.parse(data || '{}');
  return jsonData.books || [];
};

const saveBooks = (books) => {
  const data = {
    createdAt: "2024-01-01T09:00:00Z",
    updatedAt: new Date().toISOString(),
    books: books,
  };
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(data, null, 2));
};

const createBook = (details) => {
  const books = loadBooks();
  const newBook = {
    id: uuidv4(),
    details,
  };
  books.push(newBook);
  saveBooks(books);
  return newBook;
};

const getBookById = (id) => {
  const books = loadBooks();
  return books.find(book => book.id === id);
};

const updateBook = (id, updatedFields) => {
  const books = loadBooks();
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex === -1) return null;

  // Actualizar `details` y `updatedAt`
  books[bookIndex].details = {
    ...books[bookIndex].details,
    ...updatedFields,
  };
  saveBooks(books);
  return books[bookIndex];
};

const deleteBook = (id) => {
  let books = loadBooks();
  const book = books.find(b => b.id === id);
  if (!book) return null;

  books = books.filter(book => book.id !== id);
  saveBooks(books);
  return book;
};

module.exports = { loadBooks, createBook, getBookById, updateBook, deleteBook };
