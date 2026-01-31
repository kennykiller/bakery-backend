export type OrderStatusType = 'draft' | 'created' | 'paid' | 'cancelled';

export class OrderStatus {
  static readonly DRAFT = new OrderStatus('draft');
  static readonly CREATED = new OrderStatus('created');
  static readonly PAID = new OrderStatus('paid');
  static readonly CANCELLED = new OrderStatus('cancelled');

  private constructor(private readonly value: OrderStatusType) {}
  toString(): OrderStatusType {
    return this.value;
  }

  fromString(value: string): OrderStatus {
    switch (value) {
      case 'draft':
        return OrderStatus.DRAFT;
      case 'created':
        return OrderStatus.CREATED;
      case 'paid':
        return OrderStatus.PAID;
      case 'cancelled':
        return OrderStatus.CANCELLED;
      default:
        throw new Error(`Invalid order status: ${value}`);
    }
  }

  canBePaid(): boolean {
    return this.value === OrderStatus.CREATED.value;
  }

  canBeCancelled(): boolean {
    return this.value === OrderStatus.DRAFT.value || this.value === OrderStatus.CREATED.value;
  }

  equals(other: OrderStatus): boolean {
    return this.value === other.value;
  }
}
