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

import { useStyles } from '../shared/materialStyles';

const BookDetailsPage = () => {
  const [book, setBook] = useState({});
  const [characters, setCharacters] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { bookId } = useParams();
  const classes = useStyles();

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
      ? (target.textContent = 'Show characters as a table')
      : (target.textContent = 'Show characters as a list');

    setShowTable(showTable => !showTable);
  };

  const { name, authors, numberOfPages, mediaType, publisher } = book;
  const shouldRenderCharacters = !!characters ? (
    <>
      <Button variant="contained" onClick={toggleTable} disableElevation>
        Show characters as a table
      </Button>
      {!showTable && <Characters characters={characters} />}
      {!!showTable && <CharactersTable characters={characters} />}
    </>
  ) : (
    <>
      {!isLoading && (
        <p>Unfortunately, we don't have characters list for this book!</p>
      )}
    </>
  );
  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <CardContent>
          {!!Object.keys(book).length && (
            <>
              <Box mb="10px">
                <Typography gutterBottom variant="h2">
                  {name}
                </Typography>
                <Typography className={classes.bold}>
                  Authors: <span className={classes.regular}>{authors}</span>
                </Typography>
                <Typography className={classes.bold}>
                  Pages:{' '}
                  <span className={classes.regular}>{numberOfPages}</span>
                </Typography>
                <Typography className={classes.bold}>
                  Publisher:{' '}
                  <span className={classes.regular}>{publisher}</span>
                </Typography>
                <Typography className={classes.bold}>
                  Type: <span className={classes.regular}> {mediaType}</span>
                </Typography>
              </Box>
              {shouldRenderCharacters}
            </>
          )}
          {isLoading && (
            <Box textAlign="center" className={classes.loader}>
              <CircularProgress />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetailsPage;
