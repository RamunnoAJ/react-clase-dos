import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useMemotestGameState from './useMemotestGameState.js';
import './Memotest.css';

const Tile = ({ color, onClick, flipped, disabled }) => {
  return (
    <div
      onClick={onClick}
      className={cx('block', color, {
        'block--flipped': flipped,
        disabled: disabled,
      })}
    />
  );
};

Tile.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  flipped: PropTypes.bool,
  disabled: PropTypes.bool,
};

const Memotest = () => {
  const { tiles, flipped, onClickTile, wonPairs, onRestart, gameEnded } =
    useMemotestGameState();

  const renderTiles = () => {
    const rows = [];

    for (let i = 0; i < tiles.length; i += 4) {
      const rowElements = tiles.slice(i, i + 4).map((tile, index) => (
        <div className="memotest-col" key={index}>
          <Tile
            color={tile.color}
            key={tile.key}
            onClick={() => onClickTile(tile.key)}
            flipped={flipped.includes(tile.key)}
            disabled={wonPairs.includes(tile.color)}
          />
        </div>
      ));

      const $row = (
        <div className="memotest-row" key={i}>
          {rowElements}
        </div>
      );
      rows.push($row);
    }

    return rows;
  };

  return (
    <div className="memotest-board">
      {gameEnded && (
        <div className="memotest-end">Felicitaciones! Has ganado!</div>
      )}
      {renderTiles()}

      <button className="memotest-button" onClick={onRestart}>
        Volver a jugar
      </button>
    </div>
  );
};
export default Memotest;
