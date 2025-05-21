from backend.Node import Node
from backend.TicTacToe import TicTacToe
from collections import deque

class MCST: 
    def __init__(self, initial_game = None):
        if initial_game is None: 
            self.rootNode = Node(parent = None, gameState = TicTacToe(board_size = 3))
        else: 
            self.rootNode = Node(parent = None, gameState = initial_game)

    def _select(self, node):
        """
        Selects a leaf node to expand based on the UCB1 score.
        """
        current_node = node
        
        # Keep selecting children while the node is not fully expanded
        while not current_node.gameState.is_game_over() and not current_node.is_fully_expanded():
            next_node = current_node.select()
            if next_node is None:
                break
            current_node = next_node
        return current_node

    def update(self, iterations): 
        """
        Each time calling this, the MCST object will be updated (e.g. having new node represented possible moves 
                                                                or update the winCount and visitCount of nodes already in the tree) 
        """ 
        for _ in range(iterations): 
            leaf_node = self._select(self.rootNode)

            if leaf_node.gameState.is_game_over():
                 simulation_winner = leaf_node.gameState.winner
                 leaf_node.backpropagate(simulation_winner) 
                 continue

            new_child_node = leaf_node.expand()

            if new_child_node is None:
                simulation_node = leaf_node
            else:
                simulation_node = new_child_node

            simulation_winner = simulation_node.simulate()
            simulation_node.backpropagate(simulation_winner) 
    
            
    def print_tree(self):
        """
        Performs a breadth-first traversal of the MCTS tree and prints each layer.
        For each node, prints its state and children.
        """
        if not self.rootNode:
            print("Tree is empty")
            return
            
        layer = 1
        queue = deque([self.rootNode])
        
        while queue:
            level_size = len(queue)
            print(f"\nLayer {layer}:")
            print("-" * 20)
            
            for _ in range(level_size):
                node = queue.popleft()
                print(f"\nNode:")
                node.print_node()
                print(f"Children: {len(node.children)}")
                for child in node.children:
                    queue.append(child)
            
            layer += 1       