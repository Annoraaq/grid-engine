import { GridTilemap, LayerName } from "./../../GridTilemap/GridTilemap";
import {
  CharConfig,
  GameObject,
  GridCharacter,
} from "../../GridCharacter/GridCharacter";
import { CharacterData, Direction } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharacterAnimation } from "../../GridCharacter/CharacterAnimation/CharacterAnimation";
import { LayerPosition } from "../../Pathfinding/ShortestPathAlgorithm";
import { Utils } from "../../Utils/Utils/Utils";

export class GridCharacterPhaser {
  private sprite?: Phaser.GameObjects.Sprite;
  private layerOverlaySprite?: Phaser.GameObjects.Sprite;
  private container?: Phaser.GameObjects.Container;
  private gridCharacter: GridCharacter = this.createChar(
    this.charData,
    this.layerOverlay
  );

  constructor(
    private charData: CharacterData,
    private scene: Phaser.Scene,
    private tilemap: GridTilemap,
    private layerOverlay: boolean
  ) {}

  getGridCharacter(): GridCharacter {
    return this.gridCharacter;
  }

  setSprite(sprite?: Phaser.GameObjects.Sprite): void {
    this.sprite = sprite;
  }

  getSprite(): Phaser.GameObjects.Sprite | undefined {
    return this.sprite;
  }

  setLayerOverlaySprite(sprite?: Phaser.GameObjects.Sprite): void {
    this.layerOverlaySprite = sprite;
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

  private createChar(
    charData: CharacterData,
    layerOverlay: boolean
  ): GridCharacter {
    this.layerOverlaySprite =
      layerOverlay && charData.sprite
        ? this.scene.add.sprite(0, 0, charData.sprite.texture)
        : undefined;

    const charConfig: CharConfig = {
      speed: charData.speed || 4,
      tilemap: this.tilemap,
      walkingAnimationMapping: charData.walkingAnimationMapping,
      offsetX: charData.offsetX,
      offsetY: charData.offsetY,
      collidesWithTiles: true,
      collisionGroups: ["geDefault"],
      charLayer: charData.charLayer,
    };

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

    if (this.sprite) {
      this.sprite.setOrigin(0, 0);

      const offsetX =
        this.tilemap.getTileWidth() / 2 -
        Math.floor((this.sprite.displayWidth ?? 0) / 2);
      const offsetY =
        -(this.sprite.displayHeight ?? 0) + this.tilemap.getTileHeight();
      gridChar.engineOffset = new Vector2(offsetX, offsetY);

      const animation = new CharacterAnimation(
        gridChar.getWalkingAnimationMapping(),
        gridChar.getCharacterIndex(),
        this.sprite.texture.source[0].width /
          this.sprite.width /
          CharacterAnimation.FRAMES_CHAR_ROW
      );
      gridChar.setAnimation(animation);
      animation.frameChange().subscribe((frameNo) => {
        this.sprite?.setFrame(frameNo);
      });

      animation.setIsEnabled(
        gridChar.getWalkingAnimationMapping() !== undefined ||
          gridChar.getCharacterIndex() !== -1
      );
      animation.setStandingFrame(Direction.DOWN);

      if (this.sprite && this.layerOverlaySprite) {
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

      // TODO: maybe move to GridCharacter since it has nothing to do with phaser
      if (charData.facingDirection) {
        gridChar.turnTowards(charData.facingDirection);
      }

      if (charData.startPosition) {
        gridChar.setTilePosition({
          position: new Vector2(charData.startPosition),
          layer: gridChar.getTilePos().layer,
        });
      }

      // no need to set detph here because tilePOsition is set later to set start position
      // it is sufficient if this will trigger it
      // So this needs to be checked in a different test for setting the sprite or tile pos I guess

      // this.sprite.setDepth(
      //   this.tilemap.getDepthOfCharLayer(
      //     this.getTransitionLayer(gridChar.getNextTilePos())
      //   ) + this.getPaddedPixelDepth(this.sprite)
      // );
    }

    // TODO takeUntil
    gridChar.pixelPositionChanged().subscribe((pixelPos: Vector2) => {
      const gameObj = this.container || this.sprite;
      if (gameObj) {
        gameObj.x = pixelPos.x;
        gameObj.y = pixelPos.y;
      }

      if (this.sprite) {
        if (gridChar.isMoving()) {
          gridChar
            .getAnimation()
            ?.updateCharacterFrame(
              gridChar.getMovementDirection(),
              gridChar.hasWalkedHalfATile(),
              Number(this.sprite.frame.name)
            );
        } else {
          // I don't think this is necessary because if a char's tile pos is changed
          // when it is not moving, the animation should not be changed either.
          // gridChar
          //   .getAnimation()
          //   ?.setStandingFrame(gridChar.getFacingDirection());
        }
      }

      this.updateDepth();
    });

    return gridChar;
  }

  private updateDepth() {
    const gameObject = this.getContainer() || this.getSprite();

    if (!gameObject) return;
    this.setDepth(gameObject, this.getGridCharacter().getNextTilePos());
    const layerOverlaySprite = this.getLayerOverlaySprite();

    if (layerOverlaySprite) {
      const posAbove = new Vector2({
        ...this.getGridCharacter().getNextTilePos().position,
        y: this.getGridCharacter().getNextTilePos().position.y - 1,
      });
      this.setDepth(layerOverlaySprite, {
        position: posAbove,
        layer: this.getGridCharacter().getNextTilePos().layer,
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
