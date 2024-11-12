// import React, { useState } from 'react';

// const MainBoard = () => {
 
//         const [board, setBoard] = useState(Array(9).fill(null));
//         const [isXNext, setIsXNext] = useState(true);
//         const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
//         const [message, setMessage] = useState('');
//         const [inputValue, setInputValue] = useState('');
    
//         const handleClick = (index) => {
//             if (board[index] || calculateWinner(board)) return;
    
//             const newBoard = board.slice();
//             newBoard[index] = isXNext ? 'X' : 'O';
//             setBoard(newBoard);
//             setIsXNext(!isXNext);
    
//             const winner = calculateWinner(newBoard);
//             if (winner) {
//                 if (winner === 'X') {
//                     setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
//                     setMessage('You win!');
//                 } else if (winner === 'O') {
//                     setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
//                     setMessage('You lose!');
//                 }
//             } else if (newBoard.every((cell) => cell)) {
//                 setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
//                 setMessage('It\'s a draw!');
//             }
//         };
    
//         const calculateWinner = (squares) => {
//             const lines = [
//                 [0, 1, 2],
//                 [3, 4, 5],
//                 [6, 7, 8],
//                 [0, 3, 6],
//                 [1, 4, 7],
//                 [2, 5, 8],
//                 [0, 4, 8],
//                 [2, 4, 6],
//             ];
//             for (let i = 0; i < lines.length; i++) {
//                 const [a, b, c] = lines[i];
//                 if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//                     return squares[a];
//                 }
//             }
//             return null;
//         };
    
//         const handleInputChange = (e) => {
//             setInputValue(e.target.value);
//         };
    
//         const handleSendMessage = (e) => {
//             e.preventDefault();
//             setMessage(inputValue);
//             setInputValue('');
//         };
    
//         return (
//             <div className="flex h-screen bg-gray-900 text-white">
//                 <div className="flex flex-col items-center justify-center w-1/2 p-4">
//                     <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
//                     <div className="grid grid-cols-3 gap-4">
//                         {board.map((cell, index) => (
//                             <button
//                                 key={index}
//                                 className="w-20 h-20 text-4xl border border-gray-700 hover:bg-gray-800 focus:outline-none"
//                                 onClick={() => handleClick(index)}
//                             >
//                                 {cell}
//                             </button>
//                         ))}
//                     </div>
//                     <div className="mt-4">
//                         <h2 className="text-xl">Score</h2>
//                         <p>Wins: {score.wins}</p>
//                         <p>Losses: {score.losses}</p>
//                         <p>Draws: {score.draws}</p>
//                     </div>
//                     {message && <div className="mt-4 p-2 bg-gray-800">{message}</div>}
//                 </div>
//                 <div className="w-1/2 p-4 border-l border-gray-700">
//                     <h2 className="text-2xl mb-4">Chat & Challenges</h2>
//                     <form onSubmit={handleSendMessage} className="mb-4">
//                         <input
//                             type="text"
//                             value={inputValue}
//                             onChange={handleInputChange}
//                             placeholder="Type your message..."
//                             className="w-full p-2 border border-gray-700 bg-gray-800 text-white"
//                         />
//                         <button
//                             type="submit"
//                             className="mt-2 w-full p-2 bg-gray-700 hover:bg-gray-600"
//                         >
//                             Send
//                         </button>
//                     </form>
//                     <div className="h-64 overflow-y-auto bg-gray-800 p-2 border border-gray-700">
//                         {/* Message display can be implemented here */}
//                         <p>{message}</p>
//                     </div>
//                     <div className="mt-4">
//                         <button className="w-full p-2 bg-gray-700 hover:bg-gray-600">Add Friends</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
    
//     const App = () => {
//         return (
//             <div className="App">
//                 <TicTacToe />
//             </div>
//         );
//     };
    
    
// export default MainBoard;


import React, { useState } from 'react';

const MainBoard = () => {
  
  
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isHumanTurn, setIsHumanTurn] = useState(true);
  const [difficulty, setDifficulty] = useState('easy');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Determine the winner
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(Boolean) ? 'draw' : null;
  };

  // Handle player's click
  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isHumanTurn ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      handleGameEnd(winner === 'X' ? 'win' : winner === 'O' ? 'loss' : 'draw');
    } else {
      setIsHumanTurn(!isHumanTurn);
      if (!isHumanTurn) computerMove(newBoard);
    }
  };

  // AI move based on difficulty level
  const computerMove = (newBoard) => {
    let moveIndex;
    if (difficulty === 'easy') {
      moveIndex = easyMove(newBoard);
    } else if (difficulty === 'medium') {
      moveIndex = mediumMove(newBoard);
    } else {
      moveIndex = hardMove(newBoard);
    }
    if (moveIndex !== undefined) {
      handleClick(moveIndex);
    }
  };

  // Easy move: Random
  const easyMove = (newBoard) => {
    const emptySquares = newBoard.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  // Medium move: Mix of random and blocking
  const mediumMove = (newBoard) => {
    const blockMove = findBlockingMove(newBoard, 'X');
    return blockMove !== undefined ? blockMove : easyMove(newBoard);
  };

  // Hard move: Try to win or block
  const hardMove = (newBoard) => {
    const winMove = findBlockingMove(newBoard, 'O');
    if (winMove !== undefined) return winMove;
    const blockMove = findBlockingMove(newBoard, 'X');
    return blockMove !== undefined ? blockMove : easyMove(newBoard);
  };

  // Find a move to block or win
  const findBlockingMove = (newBoard, player) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === null) return c;
      if (newBoard[a] === player && newBoard[c] === player && newBoard[b] === null) return b;
      if (newBoard[b] === player && newBoard[c] === player && newBoard[a] === null) return a;
    }
    return undefined;
  };

  // Restart the game
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsHumanTurn(true);
  };

  const handleGameEnd = (result) => {
    if (result === 'win') setScore({ ...score, wins: score.wins + 1 });
    if (result === 'loss') setScore({ ...score, losses: score.losses + 1 });
    if (result === 'draw') setScore({ ...score, draws: score.draws + 1 });
    handleRestart();
  };

  const renderSquare = (i) => (
    <button
      className="w-24 h-24 bg-red-200 border border-black-400 text-5xl"
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );





  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
<div className="h-screen flex flex-col md:flex-row p-6 text-white" style={{ backgroundColor: '#0D1B2A' }}>

          {/* <div className="h-screen flex flex-col md:flex-row p-6 bg-gradient-to-b from-gray-900 text-white"></div> */}
         

      
      {/* Left side: Tic Tac Toe game */}
      <div className="md:w-2/3 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Array(9).fill(null).map((_, i) => renderSquare(i))}
          </div>
          <button
            onClick={handleRestart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Restart Game
          </button>
          <div className="text-lg">
            <label className="mr-2">Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right side: Scoreboard and Chat */}
      <div className="md:w-1/3 flex flex-col justify-between p-4">
        {/* Scoreboard */}
        <div className="text-right bg-gray-800 shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Scoreboard</h2>
          <p className="mt-2">Wins: {score.wins}</p>
          <p>Losses: {score.losses}</p>
          <p>Draws: {score.draws}</p>
        </div>

        {/* Chatbox */}
        <div className="bg-gray-800 shadow-lg p-6 mt-4 rounded-lg flex-grow">
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto bg-gray-700 p-4 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className="my-2 p-2 bg-blue-500 rounded-lg">
                  {msg}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex">
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg bg-gray-600 text-white"
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


    
export default MainBoard;





