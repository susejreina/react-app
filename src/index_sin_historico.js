import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return ( 
        <button 
        className = "square"
        onClick = { props.onClick } > { props.value } 
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return ( 
          <Square 
          value = { this.state.squares[i] }
          onClick = {() => this.handleClick(i)}
          />
        );
    }

    render() {
        return ( 
        <div>
            <div className = "status"> { status } </div> 
            <div className = "board-row"> 
            { this.renderSquare(0) } { this.renderSquare(1) } { this.renderSquare(2) } 
            </div> 
            <div className = "board-row"> 
            { this.renderSquare(3) } { this.renderSquare(4) } { this.renderSquare(5) } 
            </div> 
            <div className = "board-row"> 
            { this.renderSquare(6) } { this.renderSquare(7) } { this.renderSquare(8) } 
            </div> 
        </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isNext: true,
        };
    }
    handleClick(i) {
      let current = this.state.history[this.state.history.length - 1].squares.slice();
      let winner = calculateWinner(current);
      if (winner == null) {
          current[i] = this.state.isNext ? 'X' : 'O';
          this.setState({ history: this.state.history.push({squares:current}), 
                          isNext: !this.state.isNext 
                        });
      }
    }    
    render() {
      let current = this.state.history[this.state.history.length - 1 ].squares.slice();
      let winner = calculateWinner(current)
      let status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
      if (winner != null) {
          status = 'We have a winner ' + winner
      }
      return ( 
        <div className = "game">
          <div className = "game-board">
            <Board 
              squares={current}
              onClick={(i) => this.handleClick(i)}
            />
          </div>  
          <div className = "game-info">
            <div>{status}</div>  
            <ol> { /* TODO */ } </ol>
          </div>  
        </div>
      );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render( <
    Game / > ,
    document.getElementById('root')
);