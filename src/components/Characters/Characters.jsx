import React from 'react';
import PropTypes from 'prop-types';

const Characters = ({ characters }) => {
  return (
    <ul>
      {characters.map(({ name }) => {
        return <li key={name}>{name}</li>;
      })}
    </ul>
  );
};

Characters.propTypes = {
  // bla: PropTypes.string,
};

Characters.defaultProps = {
  // bla: 'test',
};

export default Characters;
