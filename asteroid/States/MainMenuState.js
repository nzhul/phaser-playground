define([], function () {

    var MainMenuState = (function () {
        function MainMenuState() {

        }

        MainMenuState.prototype = {
            init: function (score) {
                var score = score || 0;
                this.highestScore = this.highestScore || 0;

                this.highestScore = Math.max(score, this.highestScore);
            },
            create: function () {
                // Show the space tile, repeated

                this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

                // give it speed in x
                this.background.autoScroll(-20, 0);

                // Start game text
                var text = "Tap to begin";
                var style = {font: '30px Arial', fill: "#fff", align: "center"};
                var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
                t.anchor.set(0.5);

                // Highest score
                text = 'Highest score: ' + this.highestScore;
                style = {font: '16px Arial', fill: "#fff", align: "center"};

                var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
                h.anchor.set(0.5, 1);
            },
            update: function () {
                if(this.game.input.activePointer.justPressed()){
                    this.game.state.start('GameState');
                }
            }
        };

        return MainMenuState;
    }());
    return MainMenuState;
});