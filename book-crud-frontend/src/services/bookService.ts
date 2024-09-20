import axios from 'axios';

const apiUrl = 'http://localhost:3000/books'; // Ensure the URL is correct

export const getBooks = () => axios.get(apiUrl);

export const createBook = (book: any) => axios.post(apiUrl, book);

export const updateBook = (id: number, book: any) => axios.put(`${apiUrl}/${id}`, book);

export const deleteBook = (id: number) => axios.delete(`${apiUrl}/${id}`);
