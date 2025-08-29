import { useState } from 'react';

type TWord = {
  word: string;
  time: number;
};

const useGame = () => {
  const [playerData, setPlayerData] = useState({
    player1: {
      words: [],
    },
    player2: {
      words: [],
    },
  });
};

export default useGame;
