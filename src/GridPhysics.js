"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridPhysics = void 0;
var Direction_1 = require("./Direction");
var Vector2 = Phaser.Math.Vector2;
var GridPhysics = /** @class */ (function () {
    function GridPhysics(player, tileMap, tileSize, speed) {
        var _a;
        this.player = player;
        this.tileMap = tileMap;
        this.tileSize = tileSize;
        this.speed = speed;
        this.movementDirection = Direction_1.Direction.NONE;
        this.tileSizePixelsWalked = 0;
        this.decimalPlacesLeft = 0;
        this.movementDirectionVectors = (_a = {},
            _a[Direction_1.Direction.UP] = Vector2.UP,
            _a[Direction_1.Direction.DOWN] = Vector2.DOWN,
            _a[Direction_1.Direction.LEFT] = Vector2.LEFT,
            _a[Direction_1.Direction.RIGHT] = Vector2.RIGHT,
            _a);
        this.speedPixelsPerSecond = this.tileSize * this.speed;
    }
    GridPhysics.prototype.movePlayer = function (direction) {
        if (this.isMoving())
            return;
        if (this.isBlockingDirection(direction)) {
            this.player.setStandingFrame(direction);
        }
        else {
            this.startMoving(direction);
        }
    };
    GridPhysics.prototype.update = function (delta) {
        if (this.isMoving()) {
            this.updatePlayerPosition(delta);
        }
    };
    GridPhysics.prototype.isMoving = function () {
        return this.movementDirection != Direction_1.Direction.NONE;
    };
    GridPhysics.prototype.startMoving = function (direction) {
        this.movementDirection = direction;
    };
    GridPhysics.prototype.tilePosInDirection = function (direction) {
        return this.player
            .getTilePos()
            .add(this.movementDirectionVectors[direction]);
    };
    GridPhysics.prototype.isBlockingDirection = function (direction) {
        return this.hasBlockingTile(this.tilePosInDirection(direction));
    };
    GridPhysics.prototype.hasNoTile = function (pos) {
        var _this = this;
        return !this.tileMap.layers.some(function (layer) {
            return _this.tileMap.hasTileAt(pos.x, pos.y, layer.name);
        });
    };
    GridPhysics.prototype.hasBlockingTile = function (pos) {
        var _this = this;
        if (this.hasNoTile(pos))
            return true;
        return this.tileMap.layers.some(function (layer) {
            var tile = _this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
            return tile && tile.properties.collides;
        });
    };
    GridPhysics.prototype.updatePlayerPosition = function (delta) {
        this.decimalPlacesLeft = this.getDecimalPlaces(this.getSpeedPerDelta(delta) + this.decimalPlacesLeft);
        var pixelsToWalkThisUpdate = this.getIntegerPart(this.getSpeedPerDelta(delta) + this.decimalPlacesLeft);
        if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
            this.movePlayerSpriteRestOfTile();
        }
        else {
            this.movePlayerSprite(pixelsToWalkThisUpdate);
        }
    };
    GridPhysics.prototype.getIntegerPart = function (float) {
        return Math.floor(float);
    };
    GridPhysics.prototype.getDecimalPlaces = function (float) {
        return float % 1;
    };
    GridPhysics.prototype.getSpeedPerDelta = function (delta) {
        var deltaInSeconds = delta / 1000;
        return this.speedPixelsPerSecond * deltaInSeconds;
    };
    GridPhysics.prototype.willCrossTileBorderThisUpdate = function (pixelsToWalkThisUpdate) {
        return this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= this.tileSize;
    };
    GridPhysics.prototype.movePlayerSpriteRestOfTile = function () {
        this.movePlayerSprite(this.tileSize - this.tileSizePixelsWalked);
        this.stopMoving();
    };
    GridPhysics.prototype.movePlayerSprite = function (speed) {
        var newPlayerPos = this.player
            .getPosition()
            .add(this.movementDistance(speed));
        this.player.setPosition(newPlayerPos);
        this.tileSizePixelsWalked += speed;
        this.updatePlayerFrame(this.movementDirection, this.tileSizePixelsWalked);
        this.tileSizePixelsWalked %= this.tileSize;
    };
    GridPhysics.prototype.updatePlayerFrame = function (direction, tileSizePixelsWalked) {
        if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
            this.player.setStandingFrame(direction);
        }
        else {
            this.player.setWalkingFrame(direction);
        }
    };
    GridPhysics.prototype.hasWalkedHalfATile = function (tileSizePixelsWalked) {
        return tileSizePixelsWalked > this.tileSize / 2;
    };
    GridPhysics.prototype.stopMoving = function () {
        this.movementDirection = Direction_1.Direction.NONE;
    };
    GridPhysics.prototype.movementDistance = function (speed) {
        return this.movementDirectionVectors[this.movementDirection]
            .clone()
            .multiply(new Vector2(speed));
    };
    return GridPhysics;
}());
exports.GridPhysics = GridPhysics;
