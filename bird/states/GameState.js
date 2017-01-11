define([], function () {

    var GameState = (function () {
        function GameState() {

        }

        GameState.prototype = {
            create: function () {

                // Background
                this.sky = this.game.add.sprite(0,0, 'sky');
                this.mountains = this.game.add.sprite(0,345, 'mountains');

                // The Bird
                this.bird = this.game.add.sprite(100,245, 'bird');
                this.bird.anchor.setTo(-0.2, 0.5);
                this.bird.animations.add('fly');
                this.bird.animations.play('fly',5,true);
                this.game.physics.arcade.enable(this.bird);
                this.bird.body.gravity.y = 1000;

                var jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                jumpKey.onDown.add(this.jump, this);

                // Pipes
                this.pipes = this.game.add.group();
                this.pipes.enableBody = true;
                this.pipes.physicsBodyType = Phaser.Physics.ARCADE;
                this.pipes.createMultiple(20,'pipe');
                this.pipes.setAll('checkWorldBounds', true);
                this.pipes.setAll('outOfBoundsKill', true);

                this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

                // Scoring
                this.playerScore = 0;
                this.showLabels();

            },
            update: function () {
                if(this.bird.inWorld == false){
                    this.playerCollision();

                    // Switch to MainMenu State
                }

                // Collision
                this.game.physics.arcade.overlap(this.bird, this.pipes, this.playerCollision, null, this );

//                // Rotate animation
//                if(this.bird.angle < 20){
//                    this.bird.angle += 1;
//                }


                if (this.mountains.x <= -600) {
                    this.mountains.x = 0;
                }
                this.mountains.x-=2;

                if (this.sky.x <= -1284) {
                    this.sky.x = 0;
                }
                this.sky.x--;
            },
            jump: function () {

                if(this.bird.alive == false){
                    return;
                }

                this.bird.body.velocity.y = -350;

//                var animation = this.game.add.tween(this.bird);
//
//                // Set the animation to change the angle of the sprite to -20 in 100 milliseconds
//                animation.to({angle: -20},100);
//                animation.start();
            },
            playerCollision: function () {
                if(this.bird.alive == false){
                    return;
                }

                this.bird.alive = false;

                this.game.time.events.remove(this.timer);
                
                this.pipes.forEachAlive(function (p) {
                    p.body.velocity.x = 0;
                }, this);

                this.game.time.events.add(1200, this.gameOver, this);
            },
            addOnePipe: function (x, y) {
                // Get the first dead pipe of our group
                var pipe = this.pipes.getFirstDead();

                pipe.reset(x, y);

                // Set the new position of the pipe
                pipe.body.velocity.x = -200;

            },
            addRowOfPipes: function () {
                var hole = Math.floor(Math.random()*5) + 1;

                for (var i = 0; i < 8; i++) {
                    if(i != hole && i != hole+1){
                        this.addOnePipe(400, i*60+10);
                    }
                }

                // Update score
                this.playerScore++;
                this.scoreLabel.text = this.playerScore;
            },
            showLabels: function () {
                var text = "0";
                var style = {font: "20px Arial", fill:"#000", align: "center"};
                this.scoreLabel = this.game.add.text(this.game.width-50, this.game.height-50, text, style);
            },
            gameOver: function () {
                this.game.state.start('MainMenuState', true, false, this.playerScore);
            }
        };

        return GameState;
    }());
    return GameState;
});