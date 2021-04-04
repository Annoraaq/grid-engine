import { GridCharacter } from "./../GridCharacter/GridCharacter";
export interface Movement {
  setCharacter(character: GridCharacter): void;
  update(delta: number): void;
}
