(function () {
    'use strict';

    requirejs.config({

        paths: {
            //  Edit the below path to point to where-ever you have placed the phaser.min.js file
            phaser: 'Libs/phaser',
            game: 'Models/game',
            bootState: 'States/BootState',
            preloadState: 'States/PreloadState',
            mainMenuState: 'States/MainMenuState',
            gameState: 'States/GameState'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            },
            'game': {
                exports: 'Game'
            },
            'gameState': {
                exports: 'GameState'
            },
            'mainMenuState': {
                exports: 'MainMenuState'
            },
            'preloadState': {
                exports: 'PreloadState'
            },
            'bootState': {
                exports: 'BootState'
            }
        }
    });

    require(['phaser', 'game'], function (Phaser, Game) {
        var game = new Game('phaser-container');
    });
}());