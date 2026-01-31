import { uuidv7 } from 'uuidv7';

export class OrderId {
  constructor(private readonly id: string) {}
  toString(): string {
    return this.id;
  }
  equals(orderId: OrderId): boolean {
    return this.id === orderId.id;
  }
  static generate(): OrderId {
    return new OrderId(uuidv7());
  }
}
