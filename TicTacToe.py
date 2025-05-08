PLAYER_X = 'X'
PLAYER_O = 'O'
EMPTY_SPOT = '_'
DRAW_MARKER = 'DRAW'

import numpy as np

class TicTacToe: 
    def __init__(self, board_size): 
        """ 
        Initializes the Tic-Tac-Toe game. 
        """ 
        self.board_size = board_size
        self.current_player = PLAYER_X
        self.board = np.array([[EMPTY_SPOT]*3 for _ in range(3)])
        self.winner = None 

    # This modifies the self.board in-place but in MCST we need a method to create a new game state without altering the original.

    def copy(self): 
        """
        Creates a deep copy of the current game state. 

        Returns: 
            TicTacToe: A new TicTacToe object with the same state as the current one
        """ 
        new_game = TicTacToe(self.board_size)
        new_game.board = np.copy(self.board)
        new_game.current_player = self.current_player
        new_game.winner = self.winner
        return new_game

    def switch_player(self):
        if self.current_player == PLAYER_X: 
            self.current_player = PLAYER_O
        else: 
            self.current_player = PLAYER_X
            

    def _check_line_win(self, line): 
        """"
        A little helper function to check if all elements in a line are the same and not empty

        Args:
            line: A list or NumPy array representing a row, column, or diagonal.
    
        Returns:
            True if all elements in the line are the same and not equal to EMPTY_SPOT,
            False otherwise.
            
        Raises:
            TypeError: If the input 'line' is not a list or a NumPy array.
        """
        if not isinstance(line, (list, np.ndarray)):
            raise TypeError("Input 'line' must be a list or a NumPy array.")
            
        if len(line):
            return False
            
        first_element = line[0]
        if line[0] == EMPTY_SPOT: 
            return False
            
        try:
            return np.all(line == first_element)
        except TypeError as e:
            raise 

    def check_win_or_draw(self): 
        """
        Check if there is a winner of if the gaem is a draw. 
        Set self.winner if the game has concluded. 

        Returns: 
            str or None: The winner (PLAYER_X, PLAYER_O), DRAW_MARKER, or None if ongoing
        """ 

        # Check rows
        for i in range(self.board_size): 
            current_line = self.board[i,:]
            
                
            if self._check_line_win(self.board[i,:]): 
                self.winner = self.board[i,0]
                return self.winner

        # Check columns
        for i in range(self.board_size): 
            current_line = self.board[i,:]
                
            if self._check_line_win(self.board[:, i]): 
                self.winner = self.board[0, i]
                return self.winner

        # Check diagonals (top-left to bottom-right)
        if self._check_line_win(np.diag(self.board)):  
            self.winner = self.board[0][0]

        # Check antidiagonals (top-right to bottom-left)
        if self._check_line_win(np.diag(np.fliplr(self.board))): # np.fliplr reverses columns 
            self.winner = self.board[0][self.board_size]

        # Check draws: 
        if EMPTY_SPOT not in self.board: 
            self.winner = DRAW_MARKER
            return self.winner

        return None
        
    def is_game_over(self):
        """ 
        Checks if the game has ended 
        """ 
        return self.winner is not None
    
    def play(self, r, c): 
        '''Attempted to make a move. 
        Args: 
            r (int): The row index of the move
            c (int): The column index of the move

        Returns: 
            bool: True if the move was successful, False otherwise (e.g., the game has ended, spot taken, invalid coordinates)
        '''
        if self.is_game_over(): 
            return False

        if self.board[r][c] != EMPTY_SPOT: 
            return False

        if not (0 <= r <= self.board_size - 1 and 0 <= c <= self.board_size - 1): 
            return False

        self.board[r][c] = self.current_player

        self.check_win_or_draw() 

        if not self.is_game_over():
            self
        # Turn switching
        self.current_player = PLAYER_O if self.current_player == PLAYER_X else PLAYER_O
        
    def find_possible_moves(self): 
        """Find all empty spots on the board where a move can be made.

        Returns: 
            list of tuples: A list of (rows, cols) tuples representing possible moves. 
                            Return an empty list the game is over or no moves are possible. 
        """
        if self.is_game_over(): 
            return []
            
        possible_moves = []
        for r in range(self.board_size): 
            for c in range(self.board_size):
                if self.board[r][c] == EMPTY_SPOT:
                    possible_moves.append((r, c))
        return possible_moves
        
    def get_opponent(self):
        """
        Returns the opponent of the given player.

        Args:
            player (str): The player (PLAYER_X or PLAYER_O).

        Returns:
            str: The opponent player, or None if the input player is invalid.
        """
        if self.current_player == PLAYER_X:
            return PLAYER_O
        else: 
            return PLAYER_X