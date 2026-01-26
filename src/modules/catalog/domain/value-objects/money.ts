export class Money {
  private constructor(readonly cents: number) {}

  static fromCents(cents: number): Money {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error('Invalid price');
    }

    return new Money(cents);
  }

  toCents(): number {
    return this.cents;
  }
}
