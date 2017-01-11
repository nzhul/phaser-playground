define([], function () {

    var BootState = (function () {
        function BootState() {

        }

        BootState.prototype = {
            preload: function () {
                this.load.image('logo', 'Graphics/assets/images/logo.png');
                this.load.image('preloadbar', 'Graphics/assets/images/preloader-bar.png');
            },
            create: function () {
                // Loading screen will have a white background
                this.game.stage.backgroundColor = '#fff';

                // scaling options
//                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//                this.scale.minWidth = 240;
//                this.scale.minHeight = 170;
//                this.scale.maxWidth = 2880;
//                this.scale.minHeight = 1920;

                // have the game centered horizontally
//                this.scale.pageAlignHorizontally = true;

                // screen size will be set automatically
//                this.scale.setScreenSize(true);

                // physics system for movement
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.state.start('PreloadState');
            }
        };

        return BootState;
    }());
    return BootState;
});