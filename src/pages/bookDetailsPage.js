import React, { useEffect, useState } from 'react';
import bookService from '../services/booksApi';
import { useParams } from 'react-router-dom';
import Characters from '../components/Characters';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import CharactersTable from '../components/CharactersTable';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
// import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const BookDetailsPage = () => {
  const [book, setBook] = useState({});
  const [characters, setCharacters] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { bookId } = useParams();

  useEffect(() => {
    const getBook = async function () {
      try {
        setLoading(true);
        const reqBook = await bookService.getMovieDetails(bookId);
        setBook(reqBook);
        if (!reqBook.povCharacters.length) {
          setLoading(false);
          return;
        }
        //делаем запросы на персонажей после получения текущей книги
        const requestedCharacters = await Promise.allSettled(
          reqBook.povCharacters.map(link => bookService.getCharacters(link)),
        );
        const succesedCharecters = requestedCharacters
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => value);
        setCharacters(succesedCharecters);
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };

    getBook();
  }, [bookId]);

  const toggleTable = ({ target }) => {
    showTable
      ? (target.textContent = 'Show as table')
      : (target.textContent = 'Show as list');

    setShowTable(showTable => !showTable);
  };

  const { name, authors, numberOfPages, mediaType, publisher } = book;
  const shouldRenderCharacters = !!characters ? (
    <>
      <Button variant="contained" color="primary" onClick={toggleTable}>
        Show as table
      </Button>
      {!showTable && <Characters characters={characters} />}
      {!!showTable && <CharactersTable characters={characters} />}
    </>
  ) : (
    <>
      {!isLoading && (
        <p>Unfortunately, we don't have character list for this book!</p>
      )}
    </>
  );
  //не забудь центрировать лоадер
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          {!!Object.keys(book).length && (
            <>
              <Typography gutterBottom variant="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Authors: {authors}
              </Typography>
              <Typography>Pages: {numberOfPages}</Typography>
              <Typography>Publisher: {publisher}</Typography>
              <Typography>Type: {mediaType}</Typography>
              {shouldRenderCharacters}
            </>
          )}
          {isLoading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

BookDetailsPage.propTypes = {
  // bla: PropTypes.string,
};

BookDetailsPage.defaultProps = {
  // bla: 'test',
};

export default BookDetailsPage;
