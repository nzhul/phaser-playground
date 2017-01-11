define([], function () {

    var BootState = (function () {
        function BootState() {

        }

        BootState.prototype = {
            preload: function () {
                this.load.image('preloadbar', 'Graphics/assets/images/preloader-bar.png');
            },
            create: function () {
                this.game.stage.backgroundColor = '#ccc';

//                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//
//                this.scale.pageAlignHorizontally = true;
//                this.scale.pageAlignVertically = true;
//
//                this.scale.setScreenSize(true);

                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.state.start('PreloadState');
            }
        };

        return BootState;
    }());
    return BootState;
});