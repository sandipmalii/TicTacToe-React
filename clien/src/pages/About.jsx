import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">
          About Tic Tac Toe
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          

          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              Gameplay
            </h2>
            <p className="text-gray-300">
              Tic Tac Toe, also known as Noughts and Crosses, is a classic
              paper-and-pencil game enjoyed by people of all ages around the
              world. This digital adaptation brings the timeless fun of Tic Tac
              Toe to your fingertips, allowing you to play against friends or
              challenge the computer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              Features
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <span className="font-semibold">Single Player Mode:</span> Play
                against an AI opponent with adjustable difficulty levels,
                providing an engaging challenge for players of all skill levels.
              </li>
              <li>
                <span className="font-semibold">Two Player Mode:</span> Compete
                against a friend on the same device, taking turns to outmaneuver
                each other and claim victory.
              </li>
              <li>
                <span className="font-semibold">Customization Options:</span>{" "}
                Tailor your gaming experience by choosing your preferred symbol,
                adjusting AI difficulty, and selecting from different grid
                themes.
              </li>
              <li>
                <span className="font-semibold">Game Statistics:</span> Track
                your wins, losses, and draws to monitor your progress and
                improve your skills over time.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              Organization
            </h2>
            <ul className="list-decimal list-inside text-gray-300 space-y-2">
              <li>
                <span className="font-semibold">Main Menu:</span> The central
                hub where players can access different game modes, settings, and
                view their game statistics.
              </li>
              <li>
                <span className="font-semibold">Game Interface:</span> A clean
                and intuitive interface displaying the Tic Tac Toe grid, player
                symbols, and options for making moves.
              </li>
              <li>
                <span className="font-semibold">Settings:</span> Allows players
                to customize their gameplay experience, including AI difficulty,
                symbol selection, and grid themes.
              </li>
              <li>
                <span className="font-semibold">Statistics:</span> Provides
                players with an overview of their performance, including the
                number of wins, losses, and draws.
              </li>
              <li>
                <span className="font-semibold">Help & Support:</span> Access
                resources such as rules of the game, gameplay tips, and customer
                support for any inquiries or issues.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              Conclusion
            </h2>
            <p className="text-gray-300">
              Whether you're looking to pass the time, hone your strategic
              skills, or engage in friendly competition with friends, this
              digital rendition of Tic Tac Toe offers a convenient and enjoyable
              way to experience this beloved game anytime, anywhere.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
