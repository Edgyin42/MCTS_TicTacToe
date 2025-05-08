# Monte Carlo Tree Search for Tic-Tac-Toe

This project implements a Monte Carlo Tree Search (MCTS) algorithm to play Tic-Tac-Toe. The implementation uses the UCB1 (Upper Confidence Bound) formula for node selection and includes a complete game engine.

## Project Structure

- `main.py`: Entry point of the application
- `MCTS.py`: Implementation of the Monte Carlo Tree Search algorithm
- `Node.py`: Node class for the MCTS tree structure
- `TicTacToe.py`: Tic-Tac-Toe game engine

## Features

- Complete MCTS implementation with UCB1 selection
- 3x3 Tic-Tac-Toe game board
- Tree visualization capabilities
- Configurable number of MCTS iterations
- Support for both X and O players
- Win/Draw detection

## How to Run

1. Ensure you have Python 3.x installed
2. Install required dependencies:
   ```bash
   pip install numpy
   ```
3. Run the main script:
   ```bash
   python main.py
   ```

## Implementation Details

### MCTS Algorithm Components

1. **Selection**: Uses UCB1 formula to select the most promising node
2. **Expansion**: Creates new child nodes for unexplored moves
3. **Simulation**: Performs random playouts from the selected node
4. **Backpropagation**: Updates node statistics based on simulation results

### Key Parameters

- `EXPLORATION_CONSTANT`: Set to √2 for balanced exploration/exploitation
- Default board size: 3x3
- Default iterations: 1000 (configurable in main.py)

## Code Structure

### TicTacToe Class
- Handles game state and rules
- Manages board operations and move validation
- Tracks game progress and winner detection

### Node Class
- Represents a node in the MCTS tree
- Stores game state, statistics, and child nodes
- Implements UCB1 calculation and node selection

### MCST Class
- Implements the MCTS algorithm
- Manages tree traversal and node expansion
- Handles simulation and backpropagation

## Example Usage

```python
from MCTS import MCST
from TicTacToe import TicTacToe

# Create a new game
game = TicTacToe(board_size=3)
mcts = MCST(initial_game=game)

# Run MCTS for 1000 iterations
mcts.update(iterations=1000)

# Print the resulting tree
mcts.print_tree()
```

## Future Improvements

- Add interactive gameplay
- Implement different board sizes
- Add visualization of the game board
- Optimize performance for larger trees
- Add support for different MCTS variants

## License

This project is open source and available under the MIT License. 