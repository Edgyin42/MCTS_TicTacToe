import TicTacToeBoard from './components/TicTacToeBoard';
import CharacterBox from './components/CharacterBox';
import DialogueBox from './components/DialogueBox';

function App() {
  return (
    <div className="flex">
      {/* Header with green background and pixel font */}
      <div className="w-full bg-green-900 py-4 px-6 shadow-md mb-8 flex">
        <h1 className="text-4xl font-pixel tracking-wider uppercase mr-4" style={{color: 'white'}}>
          MCTS Tic Tac Toe visualizer
        </h1>
        <div className="flex-grow">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-pixel border-2 border-blue-400 px-3 py-1 hover:bg-blue-800">GITHUB</a>
        </div>
      </div>

      {/* Main content container with light green semi-transparent background */}
      <div className="bg-green-100 bg-opacity-80 rounded-xl shadow-xl p-8 w-11/12 max-w-7xl">
        <div className="flex flex-row w-full">
          <div id="main-board" className="ml-5">
            <TicTacToeBoard />
          </div>
          <div id="guide" className="ml-5 mr-5 font-mono w-1/2">
            Welcome to the MCTS Tic Tac Toe visualizer. This is a simple visualizer for the MCTS algorithm. It is a work in progress and will be updated soon.
          </div>
        </div>
        
        <div className="flex max-w-3xl mx-auto mt-5 bg-gray-100 rounded-lg p-4 shadow-md">
          <CharacterBox mood="confused-smile" />
          <DialogueBox 
            message="Welcome. To comprehend the unseen forces that guide strategy, you must first understand the foundation!"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
