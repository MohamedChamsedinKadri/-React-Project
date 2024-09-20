import { Router } from 'express';
const router = Router();

let books = [
  { id: 1, title: 'Sample Book', ISBN: '123456', publishedDate: '2021-01-01', author: 'Author Name' },
  // Other sample books
];

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Create a new book
router.post('/', (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = { id: parseInt(id), ...req.body };
  const index = books.findIndex(book => book.id === parseInt(id));

  if (index !== -1) {
    books[index] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).send('Book not found');
  }
});

// Delete a book
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id !== parseInt(id));
  res.status(204).send();
});

export default router;
