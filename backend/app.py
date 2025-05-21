from flask import Flask, request, jsonify
from MCTS import MCST
from TicTacToe import TicTacToe

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
