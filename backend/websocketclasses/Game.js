import {
	CHAT_MESSAGE,
	GAME_OVER,
	INIT_GAME_RESPONSE,
	INVALID_TURN,
	PLACE,
} from "./Constants.js";

export default class Game {
	id;
	board;
	player1;
	player2;
	moves;
	chat;
	constructor(player1, player2) {
		this.id = Math.floor(Math.random() * 100000 + 1);
		this.board = Array(9).fill(null);
		this.player1 = player1;
		this.player2 = player2;
		this.moves = [];
		this.chat = [];

		this.player1.setSymbol("X");
		this.player2.setSymbol("O");
		player1.socket.send(
			JSON.stringify({
				type: INIT_GAME_RESPONSE,
				payload: {
					id: player1.id,
					name: player1.name,
					symbol: player1.symbol,
					opponent: {
						name: player2.name,
						symbol: player2.symbol,
					},
				},
			})
		);
		player2.socket.send(
			JSON.stringify({
				type: INIT_GAME_RESPONSE,
				payload: {
					id: player2.id,
					name: player2.name,
					symbol: player2.symbol,
					opponent: {
						name: player1.name,
						symbol: player1.symbol,
					},
				},
			})
		);
	}
	placeSymbol(player, index) {
		//returns a message to game manager if game  is drawn or won by some player so that we can remove the game from games array
		//if game is not finished yet, places the symbol and returns null

		//check if it is valid square
		if (index < 0 || index > 8) {
			return;
		}

		if (this.moves.length % 2 == 0 && player.id !== this.player1.id) {
			player.socket.send(
				JSON.stringify({
					type: INVALID_TURN,
					message: "Wait for opponent to play.",
				})
			);
			return;
		}
		if (this.moves.length % 2 != 0 && player.id !== this.player2.id) {
			player.socket.send(
				JSON.stringify({
					type: INVALID_TURN,
					message: "Wait for opponent to play.",
				})
			);
			return;
		}

		if (this.board[index] != null) {
			player.socket.send(
				JSON.stringify({
					type: INVALID_INDEX,
					payload: {
						message: "Cannot place at that position.",
					},
				})
			);
		}

		//update board
		this.board[index] = player.symbol;
		this.moves.push(index);

		//check the game status
		const [isGameWon, isGameDraw, symbol] = this.getGameStatus();
		if (isGameDraw || isGameWon) {
			this.player1.socket.send(
				JSON.stringify({
					type: GAME_OVER,
					payload: {
						type: isGameDraw ? "draw" : "won",
						winner: isGameDraw
							? null
							: this.player1.symbol === symbol
							? this.player1.id
							: this.player2.id,
					},
				})
			);
			this.player2.socket.send(
				JSON.stringify({
					type: GAME_OVER,
					payload: {
						type: isGameDraw ? "draw" : "won",
						winner: isGameDraw
							? null
							: this.player1.symbol === symbol
							? this.player1.id
							: this.player2.id,
					},
				})
			);
			return isGameDraw ? "draw" : "won";
		}

		//send board status
		this.player1.socket.send(
			JSON.stringify({
				type: PLACE,
				payload: {
					index: index,
					symbol: this.board[index],
				},
			})
		);

		this.player2.socket.send(
			JSON.stringify({
				type: PLACE,
				payload: {
					index: index,
					symbol: this.board[index],
				},
			})
		);

		return null;
	}
	getGameStatus() {
		//Handling horizontal wins
		if (
			this.board[1] != null &&
			this.board[0] == this.board[1] &&
			this.board[1] == this.board[2]
		) {
			return [true, false, this.board[0]];
		}
		if (
			this.board[4] != null &&
			this.board[3] == this.board[4] &&
			this.board[4] == this.board[5]
		) {
			return [true, false, this.board[3]];
		}
		if (
			this.board[7] != null &&
			this.board[6] == this.board[7] &&
			this.board[7] == this.board[8]
		) {
			return [true, false, this.board[6]];
		}

		//Handling vertical wins
		if (
			this.board[3] != null &&
			this.board[0] == this.board[3] &&
			this.board[3] == this.board[6]
		) {
			return [true, false, this.board[0]];
		}
		if (
			this.board[4] != null &&
			this.board[1] == this.board[4] &&
			this.board[4] == this.board[7]
		) {
			return [true, false, this.board[1]];
		}
		if (
			this.board[5] != null &&
			this.board[2] == this.board[5] &&
			this.board[5] == this.board[8]
		) {
			return [true, false, this.board[2]];
		}

		//Handling diagonal wins
		if (
			this.board[4] != null &&
			this.board[0] == this.board[4] &&
			this.board[4] == this.board[8]
		) {
			return [true, false, this.board[0]];
		}
		if (
			this.board[4] != null &&
			this.board[2] == this.board[4] &&
			this.board[4] == this.board[6]
		) {
			return [true, false, this.board[2]];
		}

		//Handle draw or continue game
		return [false, this.moves.length == 9, null];
	}
	addMessage(player, message) {
		if (message.trim().length == 0) {
			return;
		}
		const payload = { name: player.name, message: message };
		this.chat.push({ ...payload, id: player.id });
		this.player2.socket.send(
			JSON.stringify({
				type: CHAT_MESSAGE,
				payload: {
					...payload,
					sentByYou: player.id == this.player2.id,
				},
			})
		);

		this.player1.socket.send(
			JSON.stringify({
				type: CHAT_MESSAGE,
				payload: {
					...payload,
					sentByYou: player.id == this.player1.id,
				},
			})
		);
	}
}

