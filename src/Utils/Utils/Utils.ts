export class Utils {
  static shiftPad(num: number, places: number): number {
    const floor = Math.floor(num);
    const str = `${floor}`.padStart(places, "0");
    const strPlaces = str.length;
    return floor / Math.pow(10, strPlaces);
  }
}
