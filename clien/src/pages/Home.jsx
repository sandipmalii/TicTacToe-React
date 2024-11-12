import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleComputer = () => {
    navigate('/board')
  }
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Tic-Tac-Toe Board */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-teal-400 rounded-lg shadow-[0_0_10px_#4fd1c5] flex items-center justify-center"
              >
                {index === 0 && (
                  <div className="w-3/4 h-3/4 rounded-full border-4 border-blue-400 shadow-[0_0_10px_#4299e1]"></div>
                )}
                {index === 4 && (
                  <div className="text-red-500 text-6xl font-bold shadow-[0_0_10px_#f56565]">
                    X
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_10px_#ecc94b]"></div>
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_10px_#ecc94b]"></div>
            <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-yellow-400 shadow-[0_0_10px_#ecc94b]"></div>
            <div className="absolute top-0 bottom-0 right-1/3 w-1 bg-yellow-400 shadow-[0_0_10px_#ecc94b]"></div>
          </div> */}
        </div>

        {/* Text and Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Play TicTacToe
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            #Online
          </h2>

          <div className="space-y-4">
            <button className="w-full py-3 px-6 rounded-full text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold transition duration-300 ease-in-out hover:brightness-110 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] hover:scale-105">
              🌍 PLAY ONLINE
            </button>
            <button onClick={handleComputer}
             className="w-full py-3 px-6 rounded-full text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold transition duration-300 ease-in-out hover:brightness-110 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] hover:scale-105">
              💻 VS COMPUTER
            </button>
            <button className="w-full py-3 px-6 rounded-full text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold transition duration-300 ease-in-out hover:brightness-110 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] hover:scale-105">
              👥 VS FRIENDS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
