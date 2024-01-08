import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({X:0,O:0,draw:0});

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares).winner || newSquares[index]) {
      return;
    }
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    const winnerInfo = calculateWinner(squares);
    const isWinnerSquare = (winnerInfo.line && winnerInfo.line.includes(index))?true:false;
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        isWinnerSquare={isWinnerSquare}
      />
    );
  };

  const Scores = ({scores}) => {
    return (
        <div>
            <h1>X: {scores.X}</h1>
            <h1>O: {scores.O}</h1>
            <h1>Draw: {scores.draw}</h1>
        </div>
    );
  }

  const renderOptions = () => {
    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo.winner;
    if (winner || squares.every((square) => square)){
        return (
            <div className="try-again" >
                <button onClick={()=>{
                    setSquares(Array(9).fill(null));
                    setXIsNext(true);
                    setScores({X:scores.X + ((winner==='X')?1:0),O:scores.O + ((winner==='O')?1:0), draw:scores.draw + (squares.every((square) => square)?1:0)})
                }}>Volver a jugar!</button>
            </div>);
    }

    return null;    
  }

  const calculateWinner = (squares) => {
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
        return { winner: squares[a], line: lines[i] };
      }
    }
  
    return { winner: null, line: null };
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo.winner;
  const status = winner? `Winner: ${winner}`: squares.every((square) => square) // Check if all squares are filled
    ? 'It\'s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;
  return (
    <div style={{display:'flex'}}>
      <div>
        <div className="status">
            <h1>TIC-TAC-TOE</h1>
        </div>
        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
        <div className="status">
            <h2>{status}</h2>
        </div>
        {renderOptions()}
      </div>
      <div style={{marginLeft:'30px',textAlign:'right'}}>
        <Scores scores={scores}/>
      </div>
    </div>
  );
};

export default Board;