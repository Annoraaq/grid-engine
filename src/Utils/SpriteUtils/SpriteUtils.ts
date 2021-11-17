export class SpriteUtils {
  static copyOverImportantProperties(
    source: Phaser.GameObjects.Sprite,
    target: Phaser.GameObjects.Sprite
  ): void {
    target.x = source.x;
    target.y = source.y;
    target.tint = source.tint;
    target.alpha = source.alpha;
    target.scale = source.scale;
    target.setFrame(source.frame.name);
    target.active = source.active;
    target.alphaBottomLeft = source.alphaBottomLeft;
    target.alphaBottomRight = source.alphaBottomRight;
    target.alphaTopLeft = source.alphaTopLeft;
    target.alphaTopRight = source.alphaTopRight;
    target.angle = source.angle;
  }
}
