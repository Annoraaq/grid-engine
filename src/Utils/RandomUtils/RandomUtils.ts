export class RandomUtils {
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
