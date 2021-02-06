import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../shared/materialStyles';
import Container from '@material-ui/core/Container';

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
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {name}
                    </Typography>
                    <Typography className={classes.bold}>
                      Authors:{' '}
                      <span className={classes.regular}>
                        {authors.join(', ')}
                      </span>
                    </Typography>
                    <Typography className={classes.bold}>
                      Pages:{' '}
                      <span className={classes.regular}>{numberOfPages}</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </ul>
    </Container>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BooksList;
