define([], function () {

    var BootState = (function () {
        function BootState() {

        }

        BootState.prototype = {
            preload: function () {
                this.load.image('preloadbar', 'assets/images/preloader-bar.png');
            },
            create: function () {
                this.game.stage.backgroundColor = '#ccc';
                this.state.start('PreloadState');
            }
        };

        return BootState;
    }());
    return BootState;
});