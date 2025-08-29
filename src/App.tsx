import { useEffect, useRef, useState } from 'react';
import PlayGround from './components/player';

const App = () => {
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);

  const playerOneInputRef = useRef<HTMLInputElement | null>(null);
  const playerTwoInputRef = useRef<HTMLInputElement | null>(null);

  // focus the active player whenever it changes
  useEffect(() => {
    if (activePlayer === 1) {
      playerOneInputRef.current?.focus();
    } else {
      playerTwoInputRef.current?.focus();
    }
  }, [activePlayer]);

  // toggle turn after submit
  const handleTurnSwitch = () => {
    setActivePlayer((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="min-h-svh w-full bg-[#fafafa] relative text-gray-900">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="min-h-svh max-w-7xl  bg-white mx-auto flex flex-col">
        <h1 className="text-3xl font-bold text-center py-6">Shiritori Game</h1>

        <div className="px-10 pb-6 flex-1 grid grid-cols-2 gap-4">
          <PlayGround
            label="Player 1"
            ref={playerOneInputRef}
            disabled={activePlayer !== 1}
            onSubmit={handleTurnSwitch}
          />
          <PlayGround
            label="Player 2"
            ref={playerTwoInputRef}
            disabled={activePlayer !== 2}
            onSubmit={handleTurnSwitch}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
