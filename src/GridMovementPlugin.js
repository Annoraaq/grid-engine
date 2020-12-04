"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridMovementPlugin = void 0;
require("phaser");
var Direction_1 = require("./Direction");
var GridPhysics_1 = require("./GridPhysics");
var GridPlayer_1 = require("./GridPlayer");
var GridMovementPlugin = /** @class */ (function (_super) {
    __extends(GridMovementPlugin, _super);
    function GridMovementPlugin(scene, pluginManager) {
        var _this = _super.call(this, scene, pluginManager) || this;
        _this.scene = scene;
        return _this;
    }
    GridMovementPlugin.prototype.boot = function () {
        var eventEmitter = this.systems.events;
        eventEmitter.on("update", this.update, this);
    };
    GridMovementPlugin.prototype.create = function (playerSprite, tilemap, config) {
        this.config = __assign({ speed: 4, startPosition: new Phaser.Math.Vector2(0, 0) }, config);
        var tilemapScale = tilemap.layers[0].tilemapLayer.scale;
        var tileSize = tilemap.tileWidth * tilemapScale;
        this.gridPlayer = new GridPlayer_1.GridPlayer(playerSprite, 6, tileSize);
        this.gridPlayer.setTilePosition(this.config.startPosition);
        this.gridPhysics = new GridPhysics_1.GridPhysics(this.gridPlayer, tilemap, tileSize, this.config.speed);
        // this.gridControls = new GridControls(this.scene.input, this.gridPhysics);
    };
    GridMovementPlugin.prototype.movePlayerLeft = function () {
        this.gridPhysics.movePlayer(Direction_1.Direction.LEFT);
    };
    GridMovementPlugin.prototype.movePlayerRight = function () {
        this.gridPhysics.movePlayer(Direction_1.Direction.RIGHT);
    };
    GridMovementPlugin.prototype.movePlayerUp = function () {
        this.gridPhysics.movePlayer(Direction_1.Direction.UP);
    };
    GridMovementPlugin.prototype.movePlayerDown = function () {
        this.gridPhysics.movePlayer(Direction_1.Direction.DOWN);
    };
    GridMovementPlugin.prototype.update = function (_time, delta) {
        var _a, _b;
        (_a = this.gridControls) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.gridPhysics) === null || _b === void 0 ? void 0 : _b.update(delta);
    };
    return GridMovementPlugin;
}(Phaser.Plugins.ScenePlugin));
exports.GridMovementPlugin = GridMovementPlugin;
