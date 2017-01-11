define([], function () {

    var PreloadState = (function () {
        function PreloadState() {

        }

        PreloadState.prototype = {
            preload: function () {
                this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
                this.preloadBar.anchor.setTo(0.5);
                this.load.setPreloadSprite(this.preloadBar);

                // Load images, sounds, tilesets and everything else for the game
                //this.game.load.image('bird', 'assets/images/gruhcho.png');
                this.game.load.spritesheet('bird', 'assets/images/prase.png',50,50);
                this.game.load.image('pipe', 'assets/images/pipe.png');
                this.game.load.image('logo', 'assets/images/logo.png');
                this.game.load.image('space-for-start', 'assets/images/space-for-start.png');
                this.game.load.image('mountains', 'assets/images/mountains-long.png');
                this.game.load.image('sky', 'assets/images/sky.jpg');
            },
            create: function () {
                this.state.start('MainMenuState');
            }
        };

        return PreloadState;
    }());
    return PreloadState;
});