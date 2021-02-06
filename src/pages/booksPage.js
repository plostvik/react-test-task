import React, { useEffect, useState } from 'react';
import bookService from '../services/booksApi';
import BooksList from '../components/BooksList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getBooks = async function () {
    try {
      const reqBooks = await bookService.getBooks();
      setBooks(reqBooks);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  return (
    <>
      <BooksList books={books} />
      <Backdrop open={isLoading} color="primary">
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default BooksPage;
