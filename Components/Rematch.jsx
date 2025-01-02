import { Card } from '@/components/ui/card';

const WinPopup = ({ onRematch, onNewGame }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="bg-gray-100 p-6 rounded-lg shadow-lg w-64">
        <h2 className="text-2xl font-bold text-center mb-6">X - Wins</h2>
        <div className="flex flex-col gap-3">
          <button 
            onClick={onRematch}
            className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors">
            REMATCH
          </button>
          <button 
            onClick={onNewGame}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors">
            New Game
          </button>
        </div>
      </Card>
    </div>
  );
};

export default WinPopup;