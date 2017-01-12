var demo = {};
demo.state0 = function () { };
demo.state0.prototype = {
	preload: function () { },
	create: function () {
		game.stage.backgroundColor = '#80ff80';
		console.log('state0');
		game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(changeState, null, null, 1);
	},
	update: function () { }
}

function changeState(i, stateNumber) {
	console.log(i);
	game.state.start('state' + stateNumber);
}