import { useState } from 'react';
import { Card } from '@/components/ui/card';

const QuitDialog = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleQuit = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="text-center mb-4 text-lg">
          Are you sure want to QUIT ?
        </div>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors">
            NO
          </button>
          <button 
            onClick={handleQuit}
            className="px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition-colors">
            YES
          </button>
        </div>
      </Card>
    </div>
  );
};

export default QuitDialog;