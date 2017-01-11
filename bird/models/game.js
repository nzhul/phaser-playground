define([
    'phaser',
    'bootState',
    'preloadState',
    'mainMenuState',
    'gameState'
], function (Phaser, BootState, PreloadState, MainMenuState, GameState) {
    'use strict';

    function Game(container) {
        this.container = container;
        this.game = new Phaser.Game(400, 490, Phaser.AUTO, this.container);
        this.BootState = new BootState();
        this.PreloadState = new PreloadState();
        this.MainMenuState = new MainMenuState();
        this.GameState = new GameState();

        this.game.state.add('BootState', this.BootState);
        this.game.state.add('PreloadState', this.PreloadState);
        this.game.state.add('MainMenuState', this.MainMenuState);
        this.game.state.add('GameState', this.GameState);
        this.game.state.start('BootState');
    }

    return Game;
});