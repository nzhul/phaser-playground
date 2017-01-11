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

                // Background
                this.sky = this.game.add.sprite(0,0, 'sky');
                this.mountains = this.game.add.sprite(0,345, 'mountains');


                this.game.add.sprite(100,70,'logo');
                this.bird = this.game.add.sprite(172,230,'bird');
                this.bird.animations.add('fly');
                this.bird.animations.play('fly',5,true);
                this.game.add.sprite(145,340,'space-for-start');
            },
            update: function () {
                if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
                    this.game.state.start('GameState');
                }


                if (this.mountains.x <= -600) {
                    this.mountains.x = 0;
                }
                this.mountains.x-=2;

                if (this.sky.x <= -1284) {
                    this.sky.x = 0;
                }
                this.sky.x--;
            }
        };

        return MainMenuState;
    }());
    return MainMenuState;
});