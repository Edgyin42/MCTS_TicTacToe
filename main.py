from MCTS import MCST
from TicTacToe import TicTacToe

def main():
    game = TicTacToe(board_size = 3)
    mcts = MCST(initial_game = game)
    mcts.update(iterations = 1000)
    mcts.print_tree()

if __name__ == "__main__":
    main()