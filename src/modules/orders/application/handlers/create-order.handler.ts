import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import type { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/aggregates/order.aggregate';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { OrderId } from '../../domain/value-objects/order-id.vo';
import { ProductId } from 'src/modules/catalog/domain/value-objects/product-id';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepo: OrderRepository) {}

  async execute(command: CreateOrderCommand): Promise<{ orderId: string }> {
    const items = command.items.map((i) =>
      OrderItem.create({
        productId: ProductId.fromString(i.productId),
        priceCents: i.priceCents,
        quantity: i.quantity,
      }),
    );

    const order = Order.create({
      id: OrderId.generate().toString(),
      userId: command.userId ?? undefined,
      items,
      deliveryAddress: command.deliveryAddress,
      comment: command.comment,
    });

    await this.orderRepo.save(order);

    return { orderId: order.id };
  }
}
