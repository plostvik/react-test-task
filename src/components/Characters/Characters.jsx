import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const Characters = ({ characters }) => {
  return (
    <List>
      {characters.map(({ name }) => {
        return <ListItemText key={name}>{name}</ListItemText>;
      })}
    </List>
  );
};

Characters.propTypes = {
  characters: PropTypes.array.isRequired,
};

export default Characters;
