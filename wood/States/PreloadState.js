define([], function () {

    var PreloadState = (function () {
        function PreloadState() {

        }

        PreloadState.prototype = {
            preload: function () {
                this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
                this.preloadBar.anchor.setTo(0.5);

                this.load.setPreloadSprite(this.preloadBar);

                this.load.tilemap('level1', 'Graphics/assets/tilemaps/wood-map.json', null, Phaser.Tilemap.TILED_JSON);
                this.load.image('gameTiles', 'Graphics/assets/images/big-tileset.png');
                this.load.image('wood', 'Graphics/assets/images/wood.png');
                this.load.image('stone', 'Graphics/assets/images/stone.png');
                //this.load.image('player', 'Graphics/assets/images/hero-single.png');
                this.load.spritesheet('player', 'Graphics/assets/images/hero.png', 32, 32);
                this.load.audio('wood-collect', 'Sound/wood3.ogg');
                this.load.audio('iron-collect', 'Sound/metal10.ogg');

            },
            create: function () {
                this.state.start('GameState');
            }
        };

        return PreloadState;
    }());
    return PreloadState;
});