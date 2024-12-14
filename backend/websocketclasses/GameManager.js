import Player from "./Player.js";
import { CHAT_MESSAGE, INIT_GAME, PLACE } from "./Constants.js";
import Game from "./Game.js";

export class GameManager {
	games;
	pendingUser;
	constructor() {
		this.games = [];
		this.pendingUser = null;
	}
	createUser(socket) {
		const newPlayer = new Player(socket);
		this.attachHandlers(newPlayer);
	}
	attachHandlers(player) {
		player.socket.on("message", (buffer) => {
			const { type, payload } = JSON.parse(buffer.toString());
			if (type === INIT_GAME) {
				//check if a previous player is waiting and make a match if present
				player.setName(payload.name);
				console.log(player.name);
				if (this.pendingUser) {
					const newGame = new Game(player, this.pendingUser);
					this.games.push(newGame);
					this.pendingUser = null;
				}
				// else make the user wait until other user starts matchmaking
				else {
					this.pendingUser = player;
				}
			}
			if (type === PLACE) {
				const currentGame = this.games.find(
					(game) => game.player1 == player || game.player2 == player
				);
				//If there is no game associated with the player just do nothing.
				if (!currentGame) {
					return;
				}
				const message = currentGame.placeSymbol(player, payload.index);
				if (message == "draw" || message == "won") {
					this.games = this.games.filter(
						(game) => game.id != currentGame.id
					);
					console.log(this.games);
				}
			}
			if (type == CHAT_MESSAGE) {
				const game = this.games.find(
					(game) => game.player1 == player || game.player2 == player
				);
				//If there is no game associated with the player just do nothing.
				if (!game) {
					return;
				}
				game.addMessage(player, payload.message);
			}
		});
	}
}

