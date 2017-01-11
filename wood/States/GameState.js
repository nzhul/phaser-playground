define([], function () {

    var GameState = (function () {
        function GameState() {
            this.playerSpeed = 50;
        }

        GameState.prototype = {
            create: function () {
                this.map = this.game.add.tilemap('level1');
                this.woodCollectSound = this.game.add.audio('wood-collect');
                this.ironCollectSound = this.game.add.audio('iron-collect');

                // The first parameter is the tileset name as specified in Tiled, the second is the key to the asset
                this.map.addTilesetImage('big-tileset', 'gameTiles');

                //create layer
                this.backgroundLayer = this.map.createLayer('background');
                this.blockedLayer = this.map.createLayer('Obstacles');

                // collision on blockedLayer
                this.map.setCollisionBetween(1, 2000, true, 'Obstacles');

                // resize the game world to match the layer dimentions
                this.backgroundLayer.resizeWorld();

                this.createItems();
                this.createPlayer();
            },
            update: function () {
                // Collision
                this.game.physics.arcade.collide(this.player, this.blockedLayer);
                this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);


              // player movement
                this.player.body.velocity.y = 0;
                this.player.body.velocity.x = 0;

                if(this.cursors.up.isDown) {
                    this.player.body.velocity.y -= this.playerSpeed;
                    this.player.animations.play('walk-up', 10, true);
                }
                else if(this.cursors.down.isDown) {
                    this.player.body.velocity.y += this.playerSpeed;
                    this.player.animations.play('walk-down', 10, true);
                }
                if(this.cursors.left.isDown) {
                    this.player.body.velocity.x -= this.playerSpeed;
                    this.player.animations.play('walk-left', 10, true);
                }
                else if(this.cursors.right.isDown) {
                    this.player.body.velocity.x += this.playerSpeed;
                    this.player.animations.play('walk-right', 10, true);
                }
            },
            createItems: function () {
                //Create items
                this.items = this.game.add.group();
                this.items.enableBody = true;
                var item;
                result = this.findObjectsByType('item', this.map, 'ObjectsLayer');
                result.forEach(function (element) {
                    this.createFromTiledObject(element, this.items);
                }, this);
            },
            createPlayer: function () {
              var result = this.findObjectsByType('playerStart', this.map, 'ObjectsLayer')

                // we know there is just one result
                //this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
                this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');

                this.player.animations.add('walk-down', [0,1,2]);
                this.player.animations.add('walk-left', [3,4,5]);
                this.player.animations.add('walk-right', [6,7,8]);
                this.player.animations.add('walk-up', [9,10,11]);

                this.game.physics.arcade.enable(this.player);

                // the camera will follow the player in the world
                this.game.camera.follow(this.player);

                // move player with cursor keys
                this.cursors = this.game.input.keyboard.createCursorKeys();
            },
            collect: function (player, collectable) {
                console.log('Got some resource! - ' + collectable.sprite);
                if(collectable.sprite == 'wood'){
                    this.woodCollectSound.play();
                } else {
                    this.ironCollectSound.play();
                }
                collectable.destroy();
            },
            findObjectsByType: function (type, map, layer) {
                var result = new Array();
                map.objects[layer].forEach(function (element) {
                    if(element.properties.type == type){
                        // Phaser uses top left, Tiled bottom left so we have to adjust the y position
                        // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                        // so they might not be placed in the exact pixel position as in Tiled

                        element.y -= map.tileHeight;
                        result.push(element);
                    }
                });

                return result;
            },
            createFromTiledObject: function (element, group) {
                var sprite = group.create(element.x, element.y, element.properties.sprite);

                // Copy all properties to the sprite
                Object.keys(element.properties).forEach(function (key) {
                    sprite[key] = element.properties[key];
                });
            }
        };

        return GameState;
    }());
    return GameState;
});