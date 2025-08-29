import PlayGround from './components/player';

const App = () => {
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
          <PlayGround label="Player 1" />
          <PlayGround label="Player 2" />
        </div>
      </div>
    </div>
  );
};

export default App;
