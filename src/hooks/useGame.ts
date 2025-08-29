import { useEffect, useRef, useState } from 'react';

export type TWord = {
  word: string;
  time: number;
  duration: number;
};

const useGame = () => {
  const [playerData, setPlayerData] = useState({
    player1: [] as TWord[],
    player2: [] as TWord[],
    errors: {
      player1: null as string | null,
      player2: null as string | null,
    },
  });
  const [lastCharacter, setLastCharacter] = useState('');
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const playerOneInputRef = useRef<HTMLInputElement | null>(null);
  const playerTwoInputRef = useRef<HTMLInputElement | null>(null);
  const [turnStartTime, setTurnStartTime] = useState(Date.now());

  useEffect(() => {
    setTurnStartTime(Date.now());
    if (activePlayer === 1) {
      playerOneInputRef.current?.focus();
    } else {
      playerTwoInputRef.current?.focus();
    }
  }, [activePlayer]);

  const handleCheckWord = async (word: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      if (!res.ok) return false;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  };

  const handleTurnSwitch = async (word: string) => {
    const currentKey = activePlayer === 1 ? 'player1' : 'player2';
    const trimmed = word.trim().toLowerCase();

    // check the duration
    const now = Date.now();
    const duration = (now - turnStartTime) / 1000;

    // 1️ At least 4 characters
    if (trimmed.length < 4) {
      setPlayerData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [currentKey]: 'Word must be at least 4 characters long.',
        },
      }));
      return;
    }

    // 2️ Must start with lastCharacter (if exists)
    if (lastCharacter && trimmed[0] !== lastCharacter) {
      setPlayerData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [currentKey]: `Word must start with "${lastCharacter}".`,
        },
      }));
      return;
    }

    // 3️ Must be a single word with only letters
    if (!/^[a-z]+$/i.test(trimmed)) {
      setPlayerData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [currentKey]: 'Word must be a single word with letters only.',
        },
      }));
      return;
    }

    // 4️ Must not repeat the same word
    if (playerData[currentKey].some((w) => w.word === trimmed)) {
      setPlayerData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [currentKey]: 'You cannot repeat the same word.',
        },
      }));
      return;
    }

    // 5️ External dictionary check
    const isValidWord = await handleCheckWord(trimmed);
    if (!isValidWord) {
      setPlayerData((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [currentKey]: 'This is not a valid English word.',
        },
      }));
      return;
    }

    // Passed all validation
    setPlayerData((prev) => ({
      ...prev,
      [currentKey]: [
        ...prev[currentKey],
        { word: trimmed, time: now, duration },
      ],
      errors: {
        ...prev.errors,
        [currentKey]: null,
      },
    }));

    setLastCharacter(trimmed[trimmed.length - 1]);
    setActivePlayer((prev) => (prev === 1 ? 2 : 1));
  };

  return {
    playerOneInputRef,
    playerTwoInputRef,
    handleTurnSwitch,
    playerData,
    setPlayerData,
    activePlayer,
    lastCharacter,
  };
};

export default useGame;
