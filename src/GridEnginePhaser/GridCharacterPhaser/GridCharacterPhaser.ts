import {
  GameObject,
  MAX_MOVEMENT_PROGRESS,
} from "../../GridCharacter/GridCharacter.js";
import {
  CharacterData,
  CharLayer,
  GridEngineHeadless,
  WalkingAnimationMapping,
} from "../../GridEngine.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { Utils } from "../../Utils/Utils/Utils.js";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Direction, directionVector } from "../../Direction/Direction.js";
import { GridTilemapPhaser } from "../GridTilemapPhaser/GridTilemapPhaser.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

export class GridCharacterPhaser {
  private customOffset = new Vector2(0, 0);
  private depthOffset = 0;

  private sprite?: Phaser.GameObjects.Sprite;
  private layerOverlaySprite?: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private cachedContainerHeight = 0;
  private newSpriteSet$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private walkingAnimationMapping?: WalkingAnimationMapping | number;
  private animation?: CharacterAnimation;

  constructor(
    private charData: CharacterData,
    private scene: Phaser.Scene,
    private tilemap: GridTilemapPhaser,
    layerOverlay: boolean,
    private geHeadless: GridEngineHeadless,
  ) {
    this.layerOverlaySprite =
      layerOverlay && charData.sprite
        ? this.scene.add.sprite(0, 0, charData.sprite.texture)
        : undefined;

    this.walkingAnimationMapping = charData.walkingAnimationMapping;

    this.customOffset = new Vector2(
      charData.offsetX || 0,
      charData.offsetY || 0,
    );

    this.depthOffset = charData.depthOffset ?? 0;

    this.sprite = charData.sprite;
    this.container = charData.container;
    this.cachedContainerHeight = charData.container?.getBounds().height ?? 0;

    this.geHeadless
      .directionChanged()
      .pipe(filter(({ charId }) => charId === this.charData.id))
      .subscribe(({ direction }) => {
        this.animation?.setStandingFrame(direction);
      });

    if (this.sprite) {
      this.sprite.setOrigin(0, 0);

      this.resetAnimation(this.sprite);

      this.updateOverlaySprite();
      this.updateGridChar();
    }
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.newSpriteSet$.complete();
  }

  setSprite(sprite?: Phaser.GameObjects.Sprite): void {
    if (sprite) {
      if (this.sprite) {
        sprite.x = this.sprite.x;
        sprite.y = this.sprite.y;
      }
      this.sprite = sprite;
      this.newSpriteSet$.next();
      this.layerOverlaySprite = this.layerOverlaySprite
        ? this.scene.add.sprite(0, 0, this.sprite.texture)
        : undefined;
      this.updateOverlaySprite();
      this.resetAnimation(this.sprite);
      this.updateDepth();
    } else {
      this.layerOverlaySprite = undefined;
      this.sprite = undefined;
    }
  }

  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }

  getLayerOverlaySprite(): Phaser.GameObjects.Sprite | undefined {
    return this.layerOverlaySprite;
  }

  setContainer(container?: Phaser.GameObjects.Container): void {
    this.container = container;
    this.cachedContainerHeight = container?.getBounds().height ?? 0;
  }

  getContainer(): Phaser.GameObjects.Container | undefined {
    return this.container;
  }

  getOffsetX(): number {
    return this.customOffset.x;
  }

  setOffsetX(offsetX: number): void {
    this.customOffset.x = offsetX;
  }

  getOffsetY(): number {
    return this.customOffset.y;
  }

  setOffsetY(offsetY: number): void {
    this.customOffset.y = offsetY;
  }

  getWalkingAnimationMapping(): WalkingAnimationMapping | number | undefined {
    return this.walkingAnimationMapping;
  }

  turnTowards(direction: Direction): void {
    if (this.geHeadless.isMoving(this.charData.id)) return;
    if (direction == Direction.NONE) return;
    this.geHeadless.turnTowards(this.charData.id, direction);
    this.animation?.setStandingFrame(direction);
  }

  getAnimation(): CharacterAnimation | undefined {
    return this.animation;
  }

  setAnimation(animation: CharacterAnimation): void {
    this.animation = animation;
  }

  update(_delta: number): void {
    this.updateGridChar();
  }

  getDepthOffset(): number {
    return this.depthOffset;
  }

  private getEngineOffset(): Vector2 {
    if (!this.sprite) {
      return Vector2.ZERO;
    }
    const offsetX =
      this.tilemap.getTileWidth() / 2 -
      Math.floor((this.sprite?.displayWidth ?? 0) / 2);
    const offsetY =
      -(this.sprite?.displayHeight ?? 0) + this.tilemap.getTileHeight();
    return new Vector2(offsetX, offsetY);
  }

  private updatePixelPos() {
    const tp = new Vector2(this.geHeadless.getPosition(this.charData.id));
    const movementProgressProportional =
      this.geHeadless.getMovementProgress(this.charData.id) / 1000;

    const basePixelPos = this.tilemap
      .tilePosToPixelPos(tp)
      .add(this.getEngineOffset())
      .add(this.customOffset);
    const newPixelPos = basePixelPos.add(
      directionVector(
        this.geHeadless.getFacingDirection(this.charData.id),
      ).multiply(
        this.tilemap
          .getTileDistance(this.geHeadless.getFacingDirection(this.charData.id))
          .scalarMult(movementProgressProportional),
      ),
    );

    const gameObj = this.getGameObj();
    if (gameObj) {
      gameObj.x = Math.floor(newPixelPos.x);
      gameObj.y = Math.floor(newPixelPos.y);
    }
  }

  private getGameObj(): GameObject | undefined {
    return this.container || this.sprite;
  }

  private updateGridChar() {
    this.updatePixelPos();
    if (this.sprite && this.geHeadless.isMoving(this.charData.id)) {
      const hasWalkedHalfATile =
        this.geHeadless.getMovementProgress(this.charData.id) >
        MAX_MOVEMENT_PROGRESS / 2;
      this.getAnimation()?.updateCharacterFrame(
        this.geHeadless.getFacingDirection(this.charData.id),
        hasWalkedHalfATile,
        Number(this.sprite.frame.name),
      );
    }

    this.updateDepth();
  }

  private resetAnimation(sprite: Phaser.GameObjects.Sprite) {
    const animation = new CharacterAnimation(
      this.walkingAnimationMapping,
      sprite.texture.source[0].width /
        sprite.width /
        CharacterAnimation.FRAMES_CHAR_ROW,
    );
    this.setAnimation(animation);
    animation
      .frameChange()
      .pipe(takeUntil(this.newSpriteSet$))
      .subscribe((frameNo) => {
        sprite?.setFrame(frameNo);
      });

    animation.setIsEnabled(this.walkingAnimationMapping !== undefined);
    animation.setStandingFrame(
      this.geHeadless.getFacingDirection(this.charData.id),
    );
  }

  private updateOverlaySprite() {
    if (!this.layerOverlaySprite || !this.sprite) return;

    this.layerOverlaySprite.scale = this.sprite.scale;
    const scaledTileHeight =
      this.tilemap.getTileHeight() / this.layerOverlaySprite.scale;
    this.layerOverlaySprite.setCrop(
      0,
      0,
      this.layerOverlaySprite.displayWidth,
      this.sprite.height - scaledTileHeight,
    );
    this.layerOverlaySprite.setOrigin(0, 0);
  }

  private updateDepth() {
    const gameObj = this.getGameObj();
    if (!gameObj) return;

    const position = new Vector2(this.geHeadless.getPosition(this.charData.id));
    const layer = this.geHeadless.getCharLayer(this.charData.id);

    if (this.container) {
      this.setContainerDepth(this.container, { position, layer });
    } else if (this.sprite) {
      this.setSpriteDepth(this.sprite, { position, layer });
    }
    const layerOverlaySprite = this.getLayerOverlaySprite();

    if (layerOverlaySprite) {
      const posAbove = new Vector2({
        ...position,
        y: position.y - 1,
      });
      this.setSpriteDepth(layerOverlaySprite, {
        position: posAbove,
        layer,
      });
    }
  }

  private setSpriteDepth(
    sprite: Phaser.GameObjects.Sprite,
    position: LayerVecPos,
  ): void {
    sprite.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) +
        this.getPaddedPixelDepthSprite(sprite),
    );
  }

  private setContainerDepth(
    container: Phaser.GameObjects.Container,
    position: LayerVecPos,
  ): void {
    container.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) +
        this.getPaddedPixelDepthContainer(container),
    );
  }

  private getPaddedPixelDepthContainer(
    container: Phaser.GameObjects.Container,
  ): number {
    return Utils.shiftPad(
      container.y + this.cachedContainerHeight,
      GridTilemapPhaser.Z_INDEX_PADDING,
    );
  }

  private getPaddedPixelDepthSprite(sprite: Phaser.GameObjects.Sprite): number {
    return Utils.shiftPad(
      sprite.y + sprite.displayHeight + this.depthOffset,
      GridTilemapPhaser.Z_INDEX_PADDING,
    );
  }

  private getTransitionLayer(position: LayerVecPos): CharLayer {
    if (!position.layer) return undefined;
    return (
      this.geHeadless.getTransition(position.position, position.layer) ||
      position.layer
    );
  }
}
