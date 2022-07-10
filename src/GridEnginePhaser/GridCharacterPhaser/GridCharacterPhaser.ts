import { GridTilemap, LayerName } from "./../../GridTilemap/GridTilemap";
import {
  CharConfig,
  GameObject,
  GridCharacter,
} from "../../GridCharacter/GridCharacter";
import { CharacterData, WalkingAnimationMapping } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { LayerPosition } from "../../Pathfinding/ShortestPathAlgorithm";
import { Utils } from "../../Utils/Utils/Utils";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Direction, directionVector } from "../../Direction/Direction";

export class GridCharacterPhaser {
  private customOffset: Vector2;
  private engineOffset: Vector2;

  private sprite?: Phaser.GameObjects.Sprite;
  private layerOverlaySprite?: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private newSpriteSet$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private gridCharacter: GridCharacter = this.createChar(
    this.charData,
    this.layerOverlay
  );
  private walkingAnimationMapping?: WalkingAnimationMapping | number;
  private animation?: CharacterAnimation;

  constructor(
    private charData: CharacterData,
    private scene: Phaser.Scene,
    private tilemap: GridTilemap,
    private layerOverlay: boolean
  ) {}

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.newSpriteSet$.complete();
  }

  getGridCharacter(): GridCharacter {
    return this.gridCharacter;
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
      this.resetAnimation(this.gridCharacter, this.sprite);
      this.updateDepth(this.gridCharacter);
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

  getEngineOffset(): Vector2 {
    return this.engineOffset;
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
    if (this.gridCharacter.isMoving()) return;
    if (direction == Direction.NONE) return;
    this.gridCharacter.turnTowards(direction);
    this.animation?.setStandingFrame(direction);
  }

  getAnimation(): CharacterAnimation | undefined {
    return this.animation;
  }

  setAnimation(animation: CharacterAnimation): void {
    this.animation = animation;
  }

  update(delta: number): void {
    this.gridCharacter.update(delta);
    this.updateGridChar(this.gridCharacter);
  }

  private updatePixelPos(gridChar: GridCharacter) {
    const tp = gridChar.getTilePos().position.clone();
    const movementProgressProportional = gridChar.getMovementProgress() / 1000;

    const basePixelPos = this.tilemap
      .tilePosToPixelPos(tp)
      .add(this.engineOffset)
      .add(this.customOffset);
    const newPixelPos = basePixelPos.add(
      directionVector(gridChar.getMovementDirection()).multiply(
        this.tilemap
          .getTileDistance(gridChar.getMovementDirection())
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

  private createChar(
    charData: CharacterData,
    layerOverlay: boolean
  ): GridCharacter {
    this.layerOverlaySprite =
      layerOverlay && charData.sprite
        ? this.scene.add.sprite(0, 0, charData.sprite.texture)
        : undefined;

    this.walkingAnimationMapping = charData.walkingAnimationMapping;

    const charConfig: CharConfig = {
      speed: charData.speed || 4,
      tilemap: this.tilemap,
      collidesWithTiles: true,
      collisionGroups: ["geDefault"],
      charLayer: charData.charLayer,
      facingDirection: charData.facingDirection,
    };

    this.customOffset = new Vector2(
      charData.offsetX || 0,
      charData.offsetY || 0
    );

    if (typeof charData.collides === "boolean") {
      if (charData.collides === false) {
        charConfig.collidesWithTiles = false;
        charConfig.collisionGroups = [];
      }
    } else if (charData.collides !== undefined) {
      if (charData.collides.collidesWithTiles === false) {
        charConfig.collidesWithTiles = false;
      }
      if (charData.collides.collisionGroups) {
        charConfig.collisionGroups = charData.collides.collisionGroups;
      }
    }

    this.sprite = charData.sprite;
    this.container = charData.container;

    const gridChar = new GridCharacter(charData.id, charConfig);

    gridChar.directionChanged().subscribe((direction) => {
      this.animation?.setStandingFrame(direction);
    });

    if (this.sprite) {
      this.sprite.setOrigin(0, 0);

      const offsetX =
        this.tilemap.getTileWidth() / 2 -
        Math.floor((this.sprite.displayWidth ?? 0) / 2);
      const offsetY =
        -(this.sprite.displayHeight ?? 0) + this.tilemap.getTileHeight();
      this.engineOffset = new Vector2(offsetX, offsetY);

      this.resetAnimation(gridChar, this.sprite);

      this.updateOverlaySprite();

      if (charData.startPosition) {
        gridChar.setTilePosition({
          position: new Vector2(charData.startPosition),
          layer: gridChar.getTilePos().layer,
        });
        this.updateGridChar(gridChar);
      }
    }

    return gridChar;
  }

  private updateGridChar(gridChar: GridCharacter) {
    this.updatePixelPos(gridChar);
    if (this.sprite && gridChar.isMoving()) {
      this.getAnimation()?.updateCharacterFrame(
        gridChar.getMovementDirection(),
        gridChar.hasWalkedHalfATile(),
        Number(this.sprite.frame.name)
      );
    }

    this.updateDepth(gridChar);
  }

  private resetAnimation(
    gridChar: GridCharacter,
    sprite: Phaser.GameObjects.Sprite
  ) {
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
    animation.setStandingFrame(gridChar.getFacingDirection());
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

  private updateDepth(gridChar: GridCharacter) {
    const gameObject = this.getGameObj();

    if (!gameObject) return;
    this.setDepth(gameObject, gridChar.getNextTilePos());
    const layerOverlaySprite = this.getLayerOverlaySprite();

    if (layerOverlaySprite) {
      const posAbove = new Vector2({
        ...gridChar.getNextTilePos().position,
        y: gridChar.getNextTilePos().position.y - 1,
      });
      this.setDepth(layerOverlaySprite, {
        position: posAbove,
        layer: gridChar.getNextTilePos().layer,
      });
    }
  }

  private setDepth(gameObject: GameObject, position: LayerPosition): void {
    gameObject.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) +
        this.getPaddedPixelDepth(gameObject)
    );
  }

  private getPaddedPixelDepth(gameObject: GameObject): number {
    return Utils.shiftPad(gameObject.y + gameObject.displayHeight, 7);
  }

  private getTransitionLayer(position: LayerPosition): LayerName {
    return (
      this.tilemap.getTransition(position.position, position.layer) ||
      position.layer
    );
  }
}
