import { GAME_OVER, INIT_GAME, PLACE } from "./Constants.js";

export default class Game {
	board;
	player1;
	player2;
	moves;
	chat;
	constructor(player1, player2) {
		this.board = Array(9).fill(null);
		this.player1 = player1;
		this.player2 = player2;
		this.moves = [];
		this.chat = [];

		this.player1.setSymbol("X");
		this.player2.setSymbol("O");
		player1.socket.send(
			JSON.stringify({
				type: INIT_GAME,
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
				type: INIT_GAME,
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
}

