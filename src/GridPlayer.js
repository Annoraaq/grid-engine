"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridPlayer = void 0;
var Direction_1 = require("./Direction");
var GridPlayer = /** @class */ (function () {
    function GridPlayer(sprite, characterIndex, tileSize) {
        var _a;
        this.sprite = sprite;
        this.characterIndex = characterIndex;
        this.tileSize = tileSize;
        this.directionToFrameRow = (_a = {},
            _a[Direction_1.Direction.DOWN] = 0,
            _a[Direction_1.Direction.LEFT] = 1,
            _a[Direction_1.Direction.RIGHT] = 2,
            _a[Direction_1.Direction.UP] = 3,
            _a);
        this.lastFootLeft = false;
        this.charsInRow =
            this.sprite.texture.source[0].width /
                this.sprite.width /
                GridPlayer.FRAMES_CHAR_ROW;
        this.sprite.setFrame(this.framesOfDirection(Direction_1.Direction.DOWN).standing);
    }
    GridPlayer.prototype.getPosition = function () {
        return this.sprite.getCenter();
    };
    GridPlayer.prototype.setTilePosition = function (tilePosition) {
        this.sprite.setPosition(tilePosition.x * this.tileSize + this.playerOffsetX(), tilePosition.y * this.tileSize + this.playerOffsetY());
    };
    GridPlayer.prototype.setPosition = function (position) {
        this.sprite.setPosition(position.x, position.y);
    };
    GridPlayer.prototype.setWalkingFrame = function (direction) {
        var frameRow = this.framesOfDirection(direction);
        this.sprite.setFrame(this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot);
    };
    GridPlayer.prototype.setStandingFrame = function (direction) {
        if (this.isCurrentFrameStanding(direction)) {
            this.lastFootLeft = !this.lastFootLeft;
        }
        this.sprite.setFrame(this.framesOfDirection(direction).standing);
    };
    GridPlayer.prototype.getTilePos = function () {
        var x = (this.sprite.getCenter().x - this.playerOffsetX()) / this.tileSize;
        var y = (this.sprite.getCenter().y - this.playerOffsetY()) / this.tileSize;
        return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
    };
    GridPlayer.prototype.isCurrentFrameStanding = function (direction) {
        return (Number(this.sprite.frame.name) !=
            this.framesOfDirection(direction).standing);
    };
    GridPlayer.prototype.playerOffsetX = function () {
        return this.tileSize / 2;
    };
    GridPlayer.prototype.playerOffsetY = function () {
        return -(this.sprite.height % this.tileSize) / 2;
    };
    GridPlayer.prototype.framesOfDirection = function (direction) {
        var playerCharRow = Math.floor(this.characterIndex / this.charsInRow);
        var playerCharCol = this.characterIndex % this.charsInRow;
        var framesInRow = this.charsInRow * GridPlayer.FRAMES_CHAR_ROW;
        var framesInSameRowBefore = GridPlayer.FRAMES_CHAR_ROW * playerCharCol;
        var rows = this.directionToFrameRow[direction] +
            playerCharRow * GridPlayer.FRAMES_CHAR_COL;
        var startFrame = framesInSameRowBefore + rows * framesInRow;
        return {
            leftFoot: startFrame,
            standing: startFrame + 1,
            rightFoot: startFrame + 2,
        };
    };
    GridPlayer.FRAMES_CHAR_ROW = 3;
    GridPlayer.FRAMES_CHAR_COL = 4;
    return GridPlayer;
}());
exports.GridPlayer = GridPlayer;
