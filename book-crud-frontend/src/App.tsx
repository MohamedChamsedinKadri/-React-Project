import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from './services/bookService';

interface Book {
  id: number;
  title: string;
  ISBN: string;
  publishedDate: string;
  author: string;
}

interface NewBook {
  title: string;
  ISBN: string;
  publishedDate: string;
  author: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<NewBook>({
    title: '',
    ISBN: '',
    publishedDate: '',
    author: ''
  });

  useEffect(() => {
    // Fetch all books on component mount
    async function fetchBooks() {
      const response = await getBooks();
      setBooks(response.data);
    }
    fetchBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook(newBook);
    const response = await getBooks();
    setBooks(response.data);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    const response = await getBooks();
    setBooks(response.data);
  };

  const handleUpdate = async (id: number) => {
    await updateBook(id, newBook);
    const response = await getBooks();
    setBooks(response.data);
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} - ISBN: {book.ISBN}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add/Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleChange}
        />
        <input
          name="ISBN"
          placeholder="ISBN"
          value={newBook.ISBN}
          onChange={handleChange}
        />
        <input
          name="publishedDate"
          placeholder="Published Date"
          value={newBook.publishedDate}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>

      <h2>Update a Book</h2>
      <button onClick={() => handleUpdate(1)}>Update Book with ID 1</button>
    </div>
  );
}

export default App;
