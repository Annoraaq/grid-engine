import {
  GameObject,
  MAX_MOVEMENT_PROGRESS,
} from "../../GridCharacter/GridCharacter";
import {
  CharacterData,
  CharLayer,
  GridEngineHeadless,
  WalkingAnimationMapping,
} from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { Utils } from "../../Utils/Utils/Utils";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Direction, directionVector } from "../../Direction/Direction";
import { GridTilemapPhaser } from "../GridTilemapPhaser/GridTilemapPhaser";

export class GridCharacterPhaser {
  private customOffset = new Vector2(0, 0);

  private sprite?: Phaser.GameObjects.Sprite;
  private layerOverlaySprite?: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private newSpriteSet$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private walkingAnimationMapping?: WalkingAnimationMapping | number;
  private animation?: CharacterAnimation;

  constructor(
    private charData: CharacterData,
    private scene: Phaser.Scene,
    private tilemap: GridTilemapPhaser,
    layerOverlay: boolean,
    private geHeadless: GridEngineHeadless
  ) {
    this.layerOverlaySprite =
      layerOverlay && charData.sprite
        ? this.scene.add.sprite(0, 0, charData.sprite.texture)
        : undefined;

    this.walkingAnimationMapping = charData.walkingAnimationMapping;

    this.customOffset = new Vector2(
      charData.offsetX || 0,
      charData.offsetY || 0
    );

    this.sprite = charData.sprite;
    this.container = charData.container;

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
  }

  getContainer(): Phaser.GameObjects.Container | undefined {
    return this.container;
  }

  getOffsetX(): number {
    return this.customOffset.x;
  }

  getOffsetY(): number {
    return this.customOffset.y;
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
        this.geHeadless.getFacingDirection(this.charData.id)
      ).multiply(
        this.tilemap
          .getTileDistance(this.geHeadless.getFacingDirection(this.charData.id))
          .scalarMult(movementProgressProportional)
      )
    );

    const gameObj = this.getGameObj();
    if (gameObj) {
      gameObj.x = newPixelPos.x;
      gameObj.y = newPixelPos.y;
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
        Number(this.sprite.frame.name)
      );
    }

    this.updateDepth();
  }

  private resetAnimation(sprite: Phaser.GameObjects.Sprite) {
    const animation = new CharacterAnimation(
      this.walkingAnimationMapping,
      sprite.texture.source[0].width /
        sprite.width /
        CharacterAnimation.FRAMES_CHAR_ROW
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
      this.geHeadless.getFacingDirection(this.charData.id)
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
      this.sprite.height - scaledTileHeight
    );
    this.layerOverlaySprite.setOrigin(0, 0);
  }

  private updateDepth() {
    const gameObject = this.getGameObj();

    if (!gameObject) return;
    const position = new Vector2(this.geHeadless.getPosition(this.charData.id));
    const layer = this.geHeadless.getCharLayer(this.charData.id);
    this.setDepth(gameObject, { position, layer });
    const layerOverlaySprite = this.getLayerOverlaySprite();

    if (layerOverlaySprite) {
      const posAbove = new Vector2({
        ...position,
        y: position.y - 1,
      });
      this.setDepth(layerOverlaySprite, {
        position: posAbove,
        layer,
      });
    }
  }

  private setDepth(gameObject: GameObject, position: LayerVecPos): void {
    gameObject.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) +
        this.getPaddedPixelDepth(gameObject)
    );
  }

  private getPaddedPixelDepth(gameObject: GameObject): number {
    return Utils.shiftPad(gameObject.y + gameObject.displayHeight, 7);
  }

  private getTransitionLayer(position: LayerVecPos): CharLayer {
    if (!position.layer) return undefined;
    return (
      this.geHeadless.getTransition(position.position, position.layer) ||
      position.layer
    );
  }
}
