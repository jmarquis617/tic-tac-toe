import { useState } from 'react';

// Square component to read the 'value' and 'onSquareClick' props that you'll pass from the Board
function Square({ value, onSquareClick }) {    

    // const [value, setValue] = useState(null);   // Call useState with a return state variable of 'value' && set initial state to null 

    // Add onClick to the props of the button JSX element returned from fxn Square
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>        
    );
}


function Board({ xIsNext, squares, onPlay }){
// Declares state variable 'square' that defaults to an array of 9 nulls corresponding to the 9 squares
    // const [squares, setSquares] = useState(Array(9).fill(null));   
    // const [xIsNext, setXIsNext] = useState(true); 


    // Event handler fxn
    function handleClick(i){

        // Check if square already has and X or O || for game winner
        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const nextSquares = squares.slice();    // Creates copy of array
        // Each move will be flipped to determine which player goes next
        if(xIsNext){
            nextSquares[i] = "X";   // update nextSquares array(copy)

        } else{
            nextSquares[i] = "O"
        }
        onPlay(nextSquares);    // So game component can update the board when user clicks a square
        // setValue(nextSquares);  // Re-renders Square wherever <button> is clicked
        // setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = 'Winner: ' + winner;
    } else{
        status ='Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
            {/* Render Square component using JSX && Add value prop to each Square fxn component rendered by Board state component. 
            The arrow fxn shorthands what would be multiple functions for each square to handle their separate click events. */}
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />                  
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />                                
            </div>

            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>

            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />                                
            </div>
        </>
    );
} 

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);  // Step the user is currently viewing  
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]; // Read last squares array from history

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];    // To keep certain portions of old history
        setHistory(nextHistory);  // Creates new array that contains all items in history
        setCurrentMove(nextHistory.length - 1); // Latest history entry
    }

    function jumpTo(nextMove){
        setCurrentMove(nextMove);
    }
    
    // Square goes through each element of history whereas the move goes through each array index
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
    });

    return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>

        <div className="game-info">
            <ol>{/*TODO*/}</ol>
          </div>
        </div>
    );
} 

function calculateWinner(squares){

    // Winning lines on the array board
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // Check for winning lines
    for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
}