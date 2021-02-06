import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import styles from './BooksList.module.css';

const useStyles = makeStyles({
  booksList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  listItem: {
    width: 350,
    height: '100%',
    margin: '10px',
    cursor: 'pointer',
  },
  title: {
    fontSize: 14,
  },
});

const BooksList = ({ books }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = id => {
    history.push(`/books/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <ul className={classes.booksList}>
        {!!books.length &&
          books.map(({ name, authors, numberOfPages }, index) => {
            return (
              <Card
                component={'li'}
                key={name}
                className={classes.listItem}
                onClick={() => handleClick(index + 1)}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Authors: {authors.join(', ')}
                  </Typography>
                  <Typography>Pages: {numberOfPages}</Typography>
                </CardContent>
              </Card>
            );
          })}
      </ul>
    </Container>
  );
};

BooksList.propTypes = {
  // bla: PropTypes.string,
};

BooksList.defaultProps = {
  // bla: 'test',
};

export default BooksList;
