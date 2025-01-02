import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Trophy, User2, Crown, Medal } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [messages, setMessages] = useState([
    { text: "I have a question", sender: "user" },
    { text: "What is your question?", sender: "system" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  
  const score = {
    wins: 300,
    losses: 100,
    draws: 50,
    points: 540
  };

  const topPlayers = [
    { rank: 2, name: "Pradeep", points: 750 },
    { rank: 1, name: "Krishna", points: 800 },
    { rank: 3, name: "Arjuna", points: 700 },
  ];
  
  const leaderboard = [
    { rank: 4, name: "Laxman", points: 650 },
    { rank: 5, name: "Ram", points: 600 },
    { rank: 6, name: "Laxman", points: 550 },
    { rank: 7, name: "BHARAT", points: 500 },
    { rank: 8, name: "Ravan", points: 450 },
    { rank: 9, name: "Haluman jee", points: 400 },
    { rank: 734, name: "YOUR RANK", points: 100 }
  ];

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'O' : 'X';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
    }
  };

  const TopPlayerCard = ({ player, position }) => {
    const getPositionStyles = () => {
      const baseStyles = "flex flex-col items-center p-4 rounded-lg backdrop-blur-sm";
      switch (position) {
        case 'first':
          return `${baseStyles} bg-yellow-500/20 transform -translate-y-6`;
        case 'second':
          return `${baseStyles} bg-gray-400/20 transform -translate-y-3`;
        case 'third':
          return `${baseStyles} bg-orange-700/20 transform -translate-y-3`;
        default:
          return baseStyles;
      }
    };

    const getIcon = () => {
      switch (position) {
        case 'first':
          return <Crown className="w-8 h-8 text-yellow-400 mb-2" />;
        case 'second':
          return <Medal className="w-8 h-8 text-gray-300 mb-2" />;
        case 'third':
          return <Medal className="w-8 h-8 text-orange-600 mb-2" />;
        default:
          return null;
      }
    };

    return (
      <div className={getPositionStyles()}>
        {getIcon()}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
          <User2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-white font-semibold">{player.name}</span>
        <span className="text-sm text-gray-300">{player.points}pts</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 flex gap-4 p-4">
        {/* Leaderboard */}
        <Card className="bg-gray-800 text-white w-80 shadow-lg">
          <CardHeader className="bg-yellow-400 text-black">
            <CardTitle className="flex items-center gap-2">
              <Trophy size={20} />
              LEADERBOARD
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Top 3 Players */}
            <div className="relative flex justify-between items-end mb-8 mt-4 px-4">
              <TopPlayerCard player={topPlayers[0]} position="second" />
              <TopPlayerCard player={topPlayers[1]} position="first" />
              <TopPlayerCard player={topPlayers[2]} position="third" />
            </div>
            
            {/* Rest of the leaderboard */}
            <div className="mt-8 space-y-2">
              {leaderboard.map((player) => (
                <div 
                  key={player.rank}
                  className="py-2 px-3 border-b border-gray-700 flex items-center gap-3 hover:bg-gray-700 transition-colors rounded-lg"
                >
                  <span className="w-8 text-right text-gray-400">{player.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User2 size={16} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{player.name}</span>
                    <div className="text-sm text-gray-400">{player.points}pts</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Game Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Game Board */}
          <Card className="bg-gray-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">SITA(500pts)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 w-96 h-96 mx-auto">
                {board.map((square, index) => (
                  <button
                    key={index}
                    className="border-2 border-green-500 bg-gray-900 hover:bg-gray-800 
                             transition-colors rounded-lg h-full w-full flex items-center 
                             justify-center text-6xl font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                    onClick={() => handleClick(index)}
                  >
                    {square && (
                      <span 
                        className={`${
                          square === 'O' 
                            ? 'text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                            : 'text-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.5)]'
                        }`}
                      >
                        {square}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Score Card */}
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">OWN({score.points}pts)</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="flex justify-between text-sm">
                <span>TOTAL WIN: {score.wins}</span>
                <span>TOTAL LOSS: {score.losses}</span>
                <span>Total Draw: {score.draws}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Moves Panel */}
        <Card className="bg-gray-800 text-white w-64 shadow-lg">
          <CardHeader>
            <CardTitle>Moves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-gray-700 rounded">You: 3 -x</div>
              <div className="p-2 bg-gray-700 rounded">HE: 3 -x</div>
              <div className="p-2 bg-gray-700 rounded">You: 3 -x</div>
              <div className="p-2 bg-gray-700 rounded">he: 3 -x</div>
              <div className="p-2 bg-gray-700 rounded">You: 3 -x</div>
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <div className="font-semibold mb-2">Points System:</div>
                <div className="text-sm space-y-1">
                  <div className="text-green-400">WIN: +10 Points</div>
                  <div className="text-red-400">LOSS: -5 Points</div>
                  <div className="text-yellow-400">DRAW: +1 Points</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Box */}
      <div className="h-64 bg-gray-800 p-4 border-t-2 border-gray-700">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              className="flex-1 bg-gray-700 border-gray-600 text-white"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSendMessage}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;