import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function checkLine(a, b, c, d) {
  return a !== null && a === b && a === c && a === d;
}

function checkWinner(bs) {
  for (let c = 0; c < 7; c++)
    for (let r = 0; r < 4; r++)
      if (checkLine(bs[c][r], bs[c][r + 1], bs[c][r + 2], bs[c][r + 3]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 4; c++)
      if (checkLine(bs[c][r], bs[c + 1][r], bs[c + 2][r], bs[c + 3][r]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++)
      if (
        checkLine(
          bs[c][r],
          bs[c + 1][r + 1],
          bs[c + 2][r + 2],
          bs[c + 3][r + 3]
        )
      )
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 4; r++)
    for (let c = 3; c < 6; c++)
      if (
        checkLine(
          bs[c][r],
          bs[c - 1][r + 1],
          bs[c - 2][r + 2],
          bs[c - 3][r + 3]
        )
      )
        return bs[c][r] + ' wins!';

  return '';
}

function Hole(props) {
  return (
    <div className="Hole">
      <div className={props.value}></div>
    </div>
  );
}

function Slat(props) {
  return (
    <div className="Slat" onClick={() => props.handleClick()}>
      {[...Array(props.holes.length)].map((x, j) => (
        <Hole key={j} value={props.holes[j]}></Hole>
      ))}
    </div>
  );
}

function Board(props) {
  const [boardState, setBoardState] = useState(
    new Array(7).fill(new Array(6).fill(null))
  );
  const [winner, setWinner] = useState('');
  const [playerTurn, setPlayTurn] = useState('Red');
  const [gameSelected, setGameSelected] = useState(false);

  const selectedGame = () => {
    setGameSelected(true);
    setBoardState(new Array(7).fill(new Array(6).fill(null)));
  };

  const makeMove = (slatID) => {
    const boardCopy = boardState.map(function (arr) {
      return arr.slice();
    });
    if (boardCopy[slatID].indexOf(null) !== -1) {
      let newSlat = boardCopy[slatID].reverse();
      newSlat[newSlat.indexOf(null)] = playerTurn;
      newSlat.reverse();
      setPlayTurn(playerTurn === 'Red' ? 'Blue' : 'Red');
      setBoardState(boardCopy);
    }
  };

  const handleClick = (slatID) => {
    if (winner === '') {
      makeMove(slatID);
    }
  };

  useEffect(() => {
    let check_winner = checkWinner(boardState);
    if (winner !== check_winner) {
      setWinner(check_winner);
    }
  }, [boardState, winner]);

  let winnerMessageStyle;
  if (winner !== '') {
    winnerMessageStyle = 'winnerMessage appear';
  } else {
    winnerMessageStyle = 'winnerMessage';
  }

  /*Contruct slats allocating column from board*/
  let slats = [...Array(boardState.length)].map((x, i) => (
    <Slat
      key={i}
      holes={boardState[i]}
      handleClick={() => handleClick(i)}
    ></Slat>
  ));

  return (
    <div>
      {gameSelected && <div className="Board">{slats}</div>}
      <div className={winnerMessageStyle}>{winner}</div>
      {(!gameSelected || winner !== '') && (
        <div>
          <button onClick={() => selectedGame()}>Play</button>
        </div>
      )}
    </div>
  );
}

function App(props) {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>This is mine</h4>
      </div>
      <div className="Game">
        <Board></Board>
      </div>
    </div>
  );
}

export default App;
