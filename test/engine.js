var assert = require('chai').assert;

var BoardGame = require("../lib/index.js");

var boardGame;

describe('boardgame', function() {
	describe('Creating game instance', function () {
		beforeEach(function() {
			boardGame = new BoardGame({
				"game_factory" : (initial_state, conf) => {
					initial_state.board = {
						"count":0
					};
					initial_state.turn = initial_state.players[0];
				},
				"engine" : (state, player, play) => {
					if (play.action == "up")
						state.board.count++;
					var players = state.players;
					state.turn = players[(players.indexOf(player)+1) % players.length];
					return true;
				}
			});
		});

		it('should create a game instance when the framework is properly configured', function () {
			var game_instance = boardGame.create_game({"players": 2});
			var players = game_instance.players();

			assert.equal(players.length, 2);
			assert.equal(game_instance.board().count, 0)

			var player1 = players[0];
			var player2 = players[1];

			var player1_events = new Array();
			var player2_events = new Array();

			game_instance.on(player1, (event) => player1_events.push(event));
			game_instance.on(player2, (event) => player2_events.push(event));

			game_instance.play(player1, {"action" : "nothing"});
			assert.equal(game_instance.board().count, 0);
			assert.deepEqual(player2_events.pop(), {"type":"turn", "value":player2})

			game_instance.play(player2, {"action" : "up"});
			assert.equal(game_instance.board().count, 1);
			assert.deepEqual(player1_events.pop(), {"type":"turn", "value":player1})
		});
	});
});
