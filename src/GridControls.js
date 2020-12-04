"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridControls = void 0;
var Direction_1 = require("./Direction");
var GridControls = /** @class */ (function () {
    function GridControls(input, gridPhysics) {
        this.input = input;
        this.gridPhysics = gridPhysics;
    }
    GridControls.prototype.update = function () {
        var cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.LEFT);
        }
        else if (cursors.right.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.RIGHT);
        }
        else if (cursors.up.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.UP);
        }
        else if (cursors.down.isDown) {
            this.gridPhysics.movePlayer(Direction_1.Direction.DOWN);
        }
    };
    return GridControls;
}());
exports.GridControls = GridControls;
