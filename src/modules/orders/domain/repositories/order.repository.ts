import { Order } from '../aggregates/order.aggregate';
import { OrderId } from '../value-objects/order-id.vo';

export interface OrderRepository {
  save(order: Order): Promise<void>;

  findById(id: OrderId): Promise<Order | null>;

  findByUserId(userId: string): Promise<Order[]>;

  findDraftByUserId(userId: string): Promise<Order | null>;
}
