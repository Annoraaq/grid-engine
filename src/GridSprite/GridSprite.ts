export class GridSprite {
  constructor(private rawSprite: Phaser.GameObjects.Sprite) {
    rawSprite.setOrigin(0, 0);
  }

  getRawSprite(): Phaser.GameObjects.Sprite {
    return this.rawSprite;
  }

  get x(): number {
    return this.rawSprite.x;
  }

  set x(x: number) {
    this.rawSprite.x = x;
  }
  set y(y: number) {
    this.rawSprite.y = y;
  }

  get y(): number {
    return this.rawSprite.y;
  }

  get width(): number {
    return this.rawSprite.width;
  }

  get height(): number {
    return this.rawSprite.height;
  }

  get scale(): number {
    return this.rawSprite.scale;
  }

  set scale(scale: number) {
    this.rawSprite.scale = scale;
  }

  setDepth(depth: number): void {
    this.rawSprite.setDepth(depth);
  }
}
