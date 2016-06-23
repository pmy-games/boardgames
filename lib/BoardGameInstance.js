"use strict";

let BoardGameInstance = function(initial_state, engine) {
	this.state = initial_state;
	this.engine = engine;
	this.subscribers = new Array();
};

BoardGameInstance.prototype = {

	"players" : function () {
		return this.state.players;
	},

	"board" : function () {
		return this.state.board;
	},

	"subscribe" : function (player, subscriber) {
		var player_subscribers = this.subscribers[player];
		if (player_subscribers == undefined) {
			player_subscribers = new Array();
			this.subscribers[player] = player_subscribers;
		}
		player_subscribers.push(subscriber);
	},

	"publish" : function (player, event) {
		var subscribers = this.subscribers[player];
		if (subscribers) {
			for (var i=0; i<subscribers.length; i++) {
				try {
					subscribers[i](event);
				} catch (e) {
					console.error(e);
				}
			}
		}
	},

	"play" : function (player, play) {
		var result = this.engine(
			this.state,
			player,
			play
		);

		if (result) {
			this.publish(this.state.turn, {"type": "turn", "value": this.state.turn});
		}

		return result;
	}
}

module.exports = BoardGameInstance;
