from TicTacToe import TicTacToe, PLAYER_X, PLAYER_O, EMPTY_SPOT, DRAW_MARKER
import math
import random

EXPLORATION_CONSTANT = math.sqrt(2)
class Node: 
    # A root node is represented as having no parent or parent == None
    def __init__(self, gameState, parent = None, move_that_led_to_this_node = None): 
        """
        Initialize a node in the MCTS.   

        Args: 
            gameState (TicTacToe): The game state that this node represents. 
            parent (Node, optional): The parent node. None for the root node 
            move_that_led_to_this_node(tuple, optional): The move (row, col) that led from the parent to this node. 
                                                          None for the root node. 
        """
        self.gameState = gameState 
        self.parent = parent 

        # MCTS statistics
        self.winCount = 0.0 # number of wins for the node considered. 1 or a win, -1 for a loss and 0.5 for a draw. 
        self.visitCount = 0 # number of times going through this node
        self.children = [] # List of child Node objects

        self.move_that_led_to_this_node = move_that_led_to_this_node
        self.possible_moves_from_the_state = self.gameState.find_possible_moves()
    def is_terminal_node(self):
        """
        Returns whether this is a terminal node in the game
        """
        return self.gameState.is_game_over()
        
    def is_fully_expanded(self): 
        """
        Checks if all possible child nodes from this node has been created. 

        Returns: 
            bool: True if fully expanded, False otherwise
        """ 
        return len(self.children) == len(self.possible_moves_from_the_state)
    
    def get_UBC1(self): 
        """
        Calculate the UBC1 (Upper Confidence Bound) score 1 for this node. 
        This score is used by the parent node to select which child to traverse.
        UCB1 = (wins/visits) + C * sqrt(log(parent_visits)/visits).
        """
        
        if self.visitCount == 0: 
            return float('inf') # prioritize unvisited node
        if self.parent is None: 
            return float('-inf') # either theres's an issue or this is the root node of the MCST

        exploitation_term = self.winCount/self.visitCount
        if self.visitCount == 0: 
            exploration_term = float('inf') # If parent has no visits, should definitely explore this node
        else: 
            exploration_term = EXPLORATION_CONSTANT * math.sqrt(math.log(self.parent.visitCount) / self.visitCount)
        return exploitation_term + exploration_term
        
    def select(self):
        """
        Selects the childnode with the highest UBC1 score. 
        Assume this node is not a teminal node and has children.
        """
        if not self.children: 
            return None
        best_child = None
        best_score = -float('inf')
        
        for child in self.children: 
            score = child.get_UBC()
            if score > best_UBC: 
                best_score = score
                best_child = child 
        return best_child 
        
    def expand(self): 
        """
        Creates a child node from the selected node above and choose one of them. 
        If fully expanded or game over at this node, return None. 

        Returns: 
            Node or None: The new child node if expansion was successful, otherwise None
        """

        if self.is_fully_expanded(): 
            return None

        already_expanded_moves = {child.move_that_led_to_this_node for child in self.children} 
        untried_moves = [move for move in self.possible_moves_from_the_state if move not in already_expanded_moves]

        if not untried_moves: 
            return None 

        move_to_expand = random.choice(untried_moves) 

        new_game_state = self.gameState.copy()
        success = new_game_state.play(move_to_expand[0], move_to_expand[1]) 

        if not success: 
            return None

        new_child_node = Node(
            gameState  = new_game_state, 
            parent = self, 
            move_that_led_to_this_node=move_to_expand
        )
        self.children.append(new_child_node) 
        return new_child_node
        
    def simulate(self): 
        """
        Complete one random playout from the current expanded node. 
        
        Returns:
            str: The winner of the simulation (PLAYER_X, PLAYER_O, or DRAW_MARKER).
        """
        sim_game_state = self.gameState.copy()
        while not sim_game_state.is_game_over(): 
            possible_moves = sim_game_state.find_possible_moves()
            if not possible_moves: 
                if gameStateCopy.winner is None: 
                    return DRAW_MARKER
                break
            chosen_move = random.choice(possible_moves)
            sim_game_state.play(chosen_move[0], chosen_move[1])
        return sim_game_state.winner
        
    def backpropagate(self, simulation_winner): 
        """
        Updates the visit counts and win counts from this node up to the root.
        """
        current_node = self
        while current_node is not None: 
            current_node.visitCount += 1
            score_for_this_node = 0.0

            if current_node.parent is None:
                player_who_just_reached_current_node = current_node.gameState.get_opponent()
                if simulation_winner == player_who_just_reached_current_node: 
                    score_for_this_node += 1.0 
                elif simulation_winner == DRAW_MARKER: 
                    score_for_this_node += 0.5
                else: 
                    score_for_this_node -= 1.0
                    
            current_node.winCount += score_for_this_node
            current_node = current_node.parent
    def print_node(self): 
        """
        Prints the statistic of the node, this includes: 
            current_player: X or O, 
            move: (row, col) or None in case of root node,
            winCount,
            visitCount,
            UBC1,
            is_terminal_node: whether this is a terminal node or not
        """
        print(f"{self.gameState.current_player} | Visits: {self.visitCount} | Wins: {self.winCount:.2f} | UBC1: {self.get_UBC1():.2f} | Move: {self.move_that_led_to_this_node} | End: {self.is_terminal_node()}")