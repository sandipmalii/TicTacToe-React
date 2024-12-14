import React, { useEffect, useState } from "react";
import {
	CHAT_MESSAGE,
	GAME_OVER,
	INIT_GAME,
	INIT_GAME_RESPONSE,
	PLACE,
} from "../config.js";
import useSocket from "../hooks/useSocket.jsx";
import UserLogo from "../assets/images/user.svg";
import TicTacToeLogo from "../assets/images/logo.png";

const PlayOnline = () => {
	const socket = useSocket();
	const [game, setGame] = useState({
		moves: [],
		board: Array(9).fill(null),
		isYourTurn: null,
		isGameOver: null,
		you: {},
		opponent: {},
		chatMessages: [],
	});
	const [matchMaking, setMatchMaking] = useState({
		isLoading: true,
		yourname: null,
		message: "Connecting to server..",
	});
	useEffect(() => {
		if (!socket) return;

		socket.onmessage = (event) => {
			const { type, payload } = JSON.parse(event.data.toString());
			switch (type) {
				case INIT_GAME_RESPONSE: {
					handleGameStart(payload);
					break;
				}
				case PLACE: {
					handlePlacingSymbols(payload);
					break;
				}
				case CHAT_MESSAGE: {
					handleChat(payload);
					break;
				}
				case GAME_OVER: {
					handleGameOver(payload);
					break;
				}
			}
		};

		socket.onerror = (event) => {
			setMatchMaking((prevState) => ({
				...prevState,
				isLoading: true,
				message:
					"Could not able to connect to server. Please try again.",
			}));
		};
	}, [socket]);

	// Handle player's click
	const handleClick = (index) => {
		if (socket) {
			socket.send(
				JSON.stringify({
					type: PLACE,
					payload: {
						index: index,
					},
				})
			);
		} else {
			setMatchMaking((prevState) => ({
				...prevState,
				isLoading: true,
				message: "Connection failed. Please refresh the page.",
			}));
		}
	};

	//Start game
	const startGame = () => {
		if (socket) {
			socket.send(
				JSON.stringify({
					type: INIT_GAME,
					payload: {
						name: matchMaking.yourname,
					},
				})
			);
			setMatchMaking((prevState) => ({
				...prevState,
				isLoading: true,
				message: "Waiting for opponent..",
			}));
		} else {
			setMatchMaking((prevState) => ({
				...prevState,
				isLoading: true,
				message: "Connection failed. Please refresh the page.",
			}));
		}
	};
	//Initialise game between you and opponent
	const handleGameStart = (payload) => {
		const { opponent, ...you } = payload;

		setMatchMaking((prevState) => ({
			...prevState,
			isLoading: false,
			message: "Game started..",
		}));

		setGame((prevState) => ({
			...prevState,
			moves: [],
			board: Array(9).fill(null),
			isYourTurn: you.symbol === "X" ? true : false,
			isGameOver: null,
			you: you,
			opponent: opponent,
			chatMessages: [],
		}));
	};
	//Place symbols
	const handlePlacingSymbols = (payload) => {
		const { index, symbol } = payload;
		setGame((prevState) => ({
			...prevState,
			board: [...prevState.board].toSpliced(index, 1, symbol),
			isYourTurn:
				prevState.isYourTurn == null
					? symbol !== game.you.symbol
					: !prevState.isYourTurn,
			moves: [...prevState.moves].concat(payload),
		}));
	};
	// Restart the game
	const handleRestart = () => {
		startGame();
	};
	//Game Over
	const handleGameOver = (payload) => {
		setGame((prevState) => ({
			...prevState,
			isGameOver: payload,
		}));
	};
	//Render game board
	const renderSquare = (i) => (
		<button
			className="w-24 h-24 bg-red-200 border border-black-400 text-5xl"
			onClick={() => handleClick(i)}
			key={i}
		>
			{game.board[i]}
		</button>
	);
	//Send chat messages
	const handleSendChatMessage = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const message = formData.get("message");
		if (socket) {
			socket.send(
				JSON.stringify({
					type: CHAT_MESSAGE,
					payload: {
						message: message,
					},
				})
			);
		}
		e.target.reset();
	};
	//Render chat messages
	const handleChat = (payload) => {
		setGame((prevState) => ({
			...prevState,
			chatMessages: [...prevState.chatMessages].concat(payload),
		}));
	};
	const setYourName = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const yourname = formData.get("yourname");
		setMatchMaking((prevState) => ({ ...prevState, yourname: yourname }));
		startGame();
	};

	return (
		<div
			className="min-h-screen w-full flex text-white"
			style={{ backgroundColor: "#0D1B2A" }}
		>
			{matchMaking.isLoading ? (
				<div className="w-full mt-4 text-center flex justify-center">
					{!matchMaking.yourname ? (
						<form
							className="flex flex-col gap-2 items-center px-2"
							onSubmit={setYourName}
						>
							<img src={TicTacToeLogo} alt="Logo" width={150} />
							<p className="text-2xl mb-2 font-extrabold">
								TicTacToe <br />1 vs 1
							</p>
							<div className="flex gap-2 flex-wrap">
								<input
									type="text"
									className="flex-grow p-2 border rounded-lg bg-gray-600 text-white"
									placeholder="Enter your name to start"
									name="yourname"
								/>
								<button
									type="submit"
									className="mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
								>
									Start Game
								</button>
							</div>
						</form>
					) : (
						<p className="text-2xl">{matchMaking.message}</p>
					)}
				</div>
			) : (
				<div
					className="h-full w-full flex flex-col md:flex-row md:flex-wrap p-4 lg:p-6 text-white"
					style={{ backgroundColor: "#0D1B2A" }}
				>
					{/* Moves */}
					<div className="lg:w-1/3 flex flex-col mt-4 md:mt-0 justify-between md:p-4 order-2 flex-grow">
						<div className="bg-gray-800 shadow-lg md:p-6 p-4 pt-6 rounded-lg flex gap-2 flex-col flex-grow">
							<h2 className="text-2xl font-bold">Moves</h2>
							<div className="flex flex-col gap-2 h-[400px] overflow-y-auto">
								{game.moves.length == 0 ? (
									<p>Still no moves made.</p>
								) : (
									game.moves.map((move, index) => {
										return (
											<p
												key={index}
												className="bg-gray-600 text-white text-lg p-2 rounded"
											>
												<b>
													{move.symbol ==
													game.you.symbol
														? "You: "
														: "Opponent"}
												</b>
												&nbsp;:&nbsp;{move.index + 1}
												&nbsp;-&nbsp;
												{move.symbol}
											</p>
										);
									})
								)}
							</div>
						</div>
					</div>
					{/* Tic Tac Toe game */}
					<div className="lg:w-1/3 md:w-1/2 flex justify-center order-1">
						<div className="flex flex-col items-center">
							{!game.isGameOver ? (
								<div className="flex flex-col items-center">
									<div className="mb-6 w-full">
										<p className="text-3xl text-center text-orange-400">
											{game.isYourTurn
												? "Your turn to play."
												: "Opponent turn to play"}
										</p>
									</div>
									<div className="w-full flex justify-center items-center gap-2 my-2">
										<img
											src={UserLogo}
											alt="UserLogo"
											width={25}
										/>
										<p className="text-xl">
											<b>
												{game.opponent.name}
												&nbsp;-&nbsp;
												{game.opponent.symbol}
											</b>
										</p>
									</div>
									<div className="grid grid-cols-3 gap-2 my-4">
										{game.board.map((_, i) =>
											renderSquare(i)
										)}
									</div>
									<div className="w-full justify-center items-center flex gap-2 my-2">
										<img
											src={UserLogo}
											alt="UserLogo"
											width={25}
										/>
										<p className="text-xl">
											<b>
												{game.you.name}&nbsp;-&nbsp;
												{game.you.symbol}
											</b>
										</p>
									</div>
								</div>
							) : (
								<div className="mt-5 flex flex-col justify-center items-center">
									<p className="text-3xl text-orange-400 mb-4">
										{game.isGameOver.type == "draw"
											? "Game Draw!!"
											: game.isGameOver.winner ==
											  game.you.id
											? "You won the game."
											: "Opponent won the game."}
									</p>
									<button
										onClick={handleRestart}
										className="bg-blue-500 w-fit text-white px-4 py-2 rounded-lg mb-4"
									>
										Start New Game
									</button>
								</div>
							)}
						</div>
					</div>
					{/* try to make this as separate component by passing socket as prop */}
					{/*Chat */}
					<div className="lg:w-1/3 flex flex-col justify-between md:p-4 order-3">
						{/* Chatbox */}
						<div className="bg-gray-800 shadow-lg p-4 pt-6 md:p-6 mt-4 md:mt-0 rounded-lg flex flex-col flex-grow">
							<div className="flex flex-col flex-grow">
								<h2 className="text-2xl font-bold">Chatbox</h2>
								{game.chatMessages.length == 0 &&
									!game.isGameOver && (
										<p>Start Conversation</p>
									)}
								<div className="flex flex-col flex-grow overflow-y-auto p-4 rounded-lg h-[300px]">
									{game.chatMessages.map((chat, index) => {
										const messageAlignment = chat.sentByYou
											? "ml-auto"
											: "me-auto";
										return (
											<p
												key={index}
												className={`h-fit w-fit max-w-[80%] my-2 p-2 bg-blue-500 rounded-lg ${messageAlignment}`}
											>
												{chat.message}
											</p>
										);
									})}

									{game.isGameOver && (
										<p className="text-xl text-center">
											Start new game to start
											conversation.
										</p>
									)}
								</div>
								<form
									onSubmit={handleSendChatMessage}
									className="mt-4 flex flex-wrap gap-2"
									encType="multipart/form-data"
								>
									<input
										type="text"
										className="flex-grow p-2 border rounded-lg bg-gray-600 text-white"
										placeholder="Type a message"
										name="message"
										// value={input}
										// onChange={(e) => setInput(e.target.value)}
									/>

									<button
										type="submit"
										className="mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
									>
										Send
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayOnline;

