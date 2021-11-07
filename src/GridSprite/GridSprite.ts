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

  get displayHeight(): number {
    return this.rawSprite.displayHeight;
  }

  get displayWidth(): number {
    return this.rawSprite.displayWidth;
  }

  setDepth(depth: number): void {
    this.rawSprite.setDepth(depth);
  }
}
