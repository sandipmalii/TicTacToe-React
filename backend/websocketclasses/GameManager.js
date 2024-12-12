import Player from "./Player.js";
import { INIT_GAME } from "./Constants.js";
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
				if (this.pendingUser) {
					const newGame = new Game(player, this.pendingUser);
					this.games.push(newGame);
					this.pendingUser = null;
					console.log("created game");
				}
				// else make the user wait until other user starts matchmaking
				else {
					this.pendingUser = player;
				}
			}
		});
	}
}

