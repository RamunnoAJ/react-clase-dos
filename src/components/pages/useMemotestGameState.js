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

  const onClickTile = (key) => {
    if (!flipped.includes(key) && flipped.length < MAXIMUM_FLIPPED) {
      setFlipped([...flipped, key]);

      const newLength = flipped.length + 1;

      if (newLength === MAXIMUM_FLIPPED) {
        const firstColor = flipped[0].split('-')[0];
        const secondColor = key.split('-')[0];

        if (firstColor === secondColor) {
          setWonPairs([...wonPairs, firstColor]);
          setFlipped([]);
        } else {
          setTimeout(() => {
            setFlipped([]);
          }, 1000);
        }
      }
    }
  };

  const onRestart = () => {
    setTiles(createTiles);
    setFlipped([]);
    setWonPairs([]);
  };

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
