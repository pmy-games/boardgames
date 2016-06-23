"use strict";

let BoardGameInstance = require("./BoardGameInstance.js");

let player_code_length = 5;

let BoardGame = function (conf) {
	this.engine = conf.engine;
	this.game_factory = conf.game_factory;
}

BoardGame.prototype = {
	"create_game" : function (conf) {
		var num_players = conf.players;
		var players = new Array();
		for (var i=0; i<num_players; i++) {
			players.push(random_string(player_code_length));
		}
		var initial_state = {
			"players"	: players,
			"board"		: {},
			"turn"		: players[0]
		};
		this.game_factory(initial_state, conf);
		return new BoardGameInstance(initial_state, this.engine);
	}
};

function random_string(length)
{
	var str = "";
	var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i=0; i<length; i++)
		str += symbols.charAt(Math.floor(Math.random() * symbols.length));
	return str;
}

module.exports = BoardGame;
