define([], function () {

    var GameState = (function () {
        function GameState() {

        }

        GameState.prototype = {
            create: function () {
                console.log('GameState');
                var keyboardData =  this.game.cache.getJSON('classickeyboard');
                this.renderKeyboard(keyboardData);

                
                // var button = this.game.add.button(50,50,'button', this.actionOnClick, this, 2, 1, 0);
            },
            update: function () {

            },
            gameOver: function () {
                // additional method
            },
            actionOnClick: function(){
                console.log('buttonClicked');
            },
            renderKeyboard: function(keyboardData){
                for(i = 0; i < keyboardData.length; i++){
                    console.log(keyboardData[i]);
                }
            }
        };

        return GameState;
    }());
    return GameState;
});