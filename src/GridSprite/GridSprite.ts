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

  setDepth(depth: number): void {
    this.rawSprite.setDepth(depth);
  }

  getScaledWidth(): number {
    return this.rawSprite.width * this.rawSprite.scale;
  }

  getScaledHeight(): number {
    return this.rawSprite.height * this.rawSprite.scale;
  }
}
