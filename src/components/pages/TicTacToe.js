import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const checkLine = (a, b, c) => {
  return a !== '' && a === b && b === c;
};

const getWinner = (tiles, currentPlayer) => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (const condition of WIN_CONDITIONS) {
    const [a, b, c] = condition;
    if (checkLine(tiles[a], tiles[b], tiles[c])) {
      return [true, currentPlayer === 'X' ? 'O' : 'X'];
    }
  }

  if (tiles.every((tile) => tile !== '')) {
    return [true, null];
  }

  return [false, null];
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [gameEnded, winner] = getWinner(tiles, currentPlayer);

  const setTileTo = (tileIndex, player) => {
    const newTiles = [...tiles];
    if (newTiles[tileIndex] === '') newTiles[tileIndex] = player;
    setTiles(newTiles);
    setCurrentPlayer(player === 'X' ? 'O' : 'X');
  };

  const restart = () => {
    setTiles(Array(9).fill(''));
    setCurrentPlayer(initialPlayer);
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState('X');

  return (
    <div className="tictactoe">
      {!gameEnded && <div>Current player: {currentPlayer}</div>}
      {gameEnded && (
        <WinnerCard show={true} winner={winner} onRestart={restart} />
      )}
      <div className="tictactoe-row">
        <Square value={tiles[0]} onClick={() => setTileTo(0, currentPlayer)} />
        <Square value={tiles[1]} onClick={() => setTileTo(1, currentPlayer)} />
        <Square value={tiles[2]} onClick={() => setTileTo(2, currentPlayer)} />
      </div>
      <div className="tictactoe-row">
        <Square value={tiles[3]} onClick={() => setTileTo(3, currentPlayer)} />
        <Square value={tiles[4]} onClick={() => setTileTo(4, currentPlayer)} />
        <Square value={tiles[5]} onClick={() => setTileTo(5, currentPlayer)} />
      </div>
      <div className="tictactoe-row">
        <Square value={tiles[6]} onClick={() => setTileTo(6, currentPlayer)} />
        <Square value={tiles[7]} onClick={() => setTileTo(7, currentPlayer)} />
        <Square value={tiles[8]} onClick={() => setTileTo(8, currentPlayer)} />
      </div>
    </div>
  );
};
export default TicTacToe;
