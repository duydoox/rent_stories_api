export class DateValidation {
  static isValid(date: string) {
    const d = new Date(date);
    return !isNaN(d.getTime());
  }
}
