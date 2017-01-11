(function () {
    'use strict';

    requirejs.config({

        paths: {
            //  Edit the below path to point to where-ever you have placed the phaser.min.js file
            phaser: 'Libs/phaser',
            game: 'Models/game',
            bootState: 'States/BootState',
            preloadState: 'States/PreloadState',
            gameState: 'States/GameState'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            },
            'game': {
                exports: 'Game'
            },
            'preloadState': {
                exports: 'PreloadState'
            },
            'bootState': {
                exports: 'BootState'
            }
            ,
            'gameState': {
                exports: 'GameState'
            }
        }
    });

    require(['phaser', 'game'], function (Phaser, Game) {
        var game = new Game('phaser-container');
    });
}());