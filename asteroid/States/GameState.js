define([], function () {

    var GameState = (function () {
        function GameState() {

        }

        GameState.prototype = {
            create: function () {
                // Set world dimentions
                this.game.world.setBounds(0,0,1920,1920);
                this.background = this.game.add.tileSprite(0,0,this.game.world.width, this.game.world.height, 'space');

                // Create player
                this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
                this.player.scale.setTo(2);

                this.player.animations.add('fly', [0,1,2,3], 5, true);
                this.player.animations.play('fly');

                // Player initial score of zero
                this.playerScore = 0;

                // enable player physics
                this.game.physics.arcade.enable(this.player);
                this.playerSpeed = 120;
                this.player.body.collideWorldBounds = true;

                //the camera will follow the player in the world
                this.game.camera.follow(this.player);

                // Generate game elements
                this.generateCollectables();
                this.generateAsteroids();

                //sounds
                this.explosionSound = this.game.add.audio('explosion');
                this.collectSound = this.game.add.audio('collect');

                // Show score
                this.showLabels();
            },
            update: function () {
                if(this.game.input.activePointer.justPressed()){

                    // move on the direction of the input
                    if (this.player.exists) {
                        this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
                    }
                }

                // Collision between player and asteroids
                this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

                // Collision ( overlapping ) between player and collectables
                this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
            },
            generateAsteroids: function () {
                this.asteroids = this.game.add.group();

                // Enable physics in them
                this.asteroids.enableBody = true;
                this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

                // Phaser random number generator
                var asteroidsCount = this.game.rnd.integerInRange(150, 200);
                var asteroid;

                for (var i = 0; i < asteroidsCount; i++) {
                    // Add Sprite
                    asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
                    asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);

                    // physics properties
                    asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
                    asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);

                    asteroid.body.immovable = true;
                    asteroid.body.collideWorldBounds = true;
                }
            },
            generateCollectables: function () {
                this.collectables = this.game.add.group();

                // Enable physics in them
                this.collectables.enableBody = true;
                this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

                // Phaser random number generator
                var collectablesCount = this.game.rnd.integerInRange(100, 150);
                var collectable;

                for (var i = 0; i < collectablesCount; i++) {
                    collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
                    collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
                    collectable.animations.play('fly');
                }
            },
            hitAsteroid: function (player, asteroid) {
                // play explosion sound
                this.explosionSound.play();

                // Player explosion - particle
                var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
                emitter.makeParticles('playerParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 1000, null, 100);
                this.player.destroy();

                this.game.time.events.add(800, this.gameOver, this);
            },
            collect: function (player, collectable) {

                // Play collect sound
                this.collectSound.play();

                // Update score
                this.playerScore++;
                console.log("Player score: " + this.playerScore);
                this.scoreLabel.text = this.playerScore;

                //remove sprite
                collectable.destroy();
            },
            showLabels: function () {
                // Score text
                var text = "0";
                var style = {font: "20px Arial", fill: "#fff", align: "center"};
                this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height-50, text, style);
                this.scoreLabel.fixedToCamera = true;
            },
            gameOver: function () {
                // Pass the score as a parameter
                this.game.state.start('MainMenuState', true, false, this.playerScore);
            }
        };

        return GameState;
    }());
    return GameState;
});