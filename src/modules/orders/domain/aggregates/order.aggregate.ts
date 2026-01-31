import { OrderStatus } from '../value-objects/order-status.vo';
import { OrderItem } from '../entities/order-item.entity';

export class Order {
  private constructor(
    public readonly id: string,
    private status: OrderStatus,
    private readonly items: OrderItem[],
    private totalCents: number,
    private readonly userId?: string,
    private deliveryAddress?: string,
    private comment?: string,
  ) {}

  static create(props: {
    id: string;
    userId?: string;
    items: OrderItem[];
    deliveryAddress?: string;
    comment?: string;
  }): Order {
    if (props.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    const total = props.items.reduce((sum, item) => sum + item.subtotal, 0);

    return new Order(
      props.id,
      OrderStatus.CREATED,
      props.items,
      total,
      props.userId,
      props.deliveryAddress,
      props.comment,
    );
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  getTotalCents(): number {
    return this.totalCents;
  }

  markAsPaid() {
    if (!this.status.canBePaid()) {
      throw new Error('Order cannot be paid in current status');
    }

    this.status = OrderStatus.PAID;
  }

  cancel() {
    if (!this.status.canBeCancelled()) {
      throw new Error('Order cannot be cancelled');
    }

    this.status = OrderStatus.CANCELLED;
  }
  addItem(item: OrderItem) {
    this.ensureModifiable();

    const existing = this.items.find((i) => i.productId.equals(item.productId));

    if (existing) {
      existing.increase(item.getQuantity());
    } else {
      this.items.push(item);
    }

    this.recalculateTotal();
  }

  removeItem(productId: string) {
    this.ensureModifiable();

    const index = this.items.findIndex((i) => i.productId.toString() === productId);

    if (index === -1) {
      throw new Error('Order item not found');
    }

    this.items.splice(index, 1);

    if (!this.items.length) {
      throw new Error('Order must contain at least one item');
    }

    this.recalculateTotal();
  }

  private ensureModifiable() {
    if (!this.status.equals(OrderStatus.CREATED)) {
      throw new Error('Order cannot be modified in current status');
    }
  }

  private recalculateTotal() {
    this.totalCents = Order.calculateTotal(this.items);
  }

  private static calculateTotal(items: OrderItem[]): number {
    return items.reduce((sum, i) => sum + i.subtotal, 0);
  }
}
