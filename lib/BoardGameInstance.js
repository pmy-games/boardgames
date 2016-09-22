"use strict";
const EventEmitter = require('events');

class BoardGameInstance extends EventEmitter {
    constructor(initial_state, engine) {
        super();
        this.state = initial_state;
        this.engine = engine;
        this.subscribers = new Array();
    }

	players() {
		return this.state.players;
	}

	board() {
		return this.state.board;
	}

	play(player, play) {
		var result = this.engine(
			this.state,
			player,
			play
		);

		if (result) {
			this.emit(this.state.turn, {"type": "turn", "value": this.state.turn});
		}

		return result;
	}
}

module.exports = BoardGameInstance;
