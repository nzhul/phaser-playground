define([], function () {

    var GameState = (function () {
        function GameState() {

        }

        GameState.prototype = {
            create: function () {
                console.log('GameState');
                debugger;
                var button = this.game.add.button(50,50,'button', this.actionOnClick, this, 2, 1, 0);
            },
            update: function () {

            },
            gameOver: function () {
                // additional method
            },
            actionOnClick: function(){
                console.log('buttonClicked');
            }
        };

        return GameState;
    }());
    return GameState;
});