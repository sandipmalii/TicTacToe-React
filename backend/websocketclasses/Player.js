export default class Player {
	id;
	name;
	symbol;
	socket;
	constructor(socket) {
		this.id = Math.floor(Math.random() * 100000 + 1);
		this.name = "Player" + this.id; //default
		this.symbol = "X";
		this.socket = socket;
	}
	setName(name) {
		this.name = name;
	}
	setSymbol(symbol) {
		this.symbol = symbol;
	}
}

