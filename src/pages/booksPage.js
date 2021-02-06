import React, { useEffect, useState } from 'react';
import bookService from '../services/booksApi';
import BooksList from '../components/BooksList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getBooks = async function () {
    try {
      const reqBooks = await bookService.getBooks();
      console.log(reqBooks);
      setBooks(books => [...books, ...reqBooks]);
    } catch (err) {
      console.log(err);
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
      ;
    </>
  );
};

BooksPage.propTypes = {
  // bla: PropTypes.string,
};

BooksPage.defaultProps = {
  // bla: 'test',
};

export default BooksPage;
