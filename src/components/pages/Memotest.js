import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Memotest.css';

const COLORS = ['black', 'red', 'blue', 'green', 'yellow', 'violet'];

const Square = ({ color, onClick = () => {} }) => {
  const [active, setActive] = useState(true);

  return (
    <div
      onClick={onClick}
      className={cx('block', { 'block--inactive': !active })}
      style={{ backgroundColor: color }}
    />
  );
};

Square.propTypes = {
  color: PropTypes.oneOf(COLORS),
  onClick: PropTypes.func,
  active: PropTypes.bool.isRequired,
};

const useMemotestGameState = () => {
  const [tiles, setTiles] = useState([...COLORS, ...COLORS]);
  const [gameEnded, setGameEnded] = useState(false);

  const shuffleTiles = () => {
    const newTiles = [...tiles];
    for (let i = newTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    }
    setTiles(newTiles);
  };

  return { tiles, shuffleTiles, gameEnded };
};
