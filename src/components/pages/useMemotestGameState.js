import { useState } from 'react';

const COLORS = ['black', 'red', 'blue', 'green', 'yellow', 'violet'];

const createTiles = () => {
  let initialColors = [];
  COLORS.forEach((color) => {
    initialColors.push({ color, key: `${color}-1` });
  });
  COLORS.forEach((color) => {
    initialColors.push({ color, key: `${color}-2` });
  });

  initialColors.sort(() => Math.random() - 0.5);

  return initialColors;
};

const useMemotestGameState = () => {
  const MAXIMUM_FLIPPED = 2;

  const [tiles, setTiles] = useState(createTiles);
  const [flipped, setFlipped] = useState([]);
  const [wonPairs, setWonPairs] = useState([]);
  const gameEnded = wonPairs.length === tiles.length / 2;

  return {
    tiles,
    flipped,
    onClickTile,
    wonPairs,
    onRestart,
    gameEnded,
  };
};

export default useMemotestGameState;
