import { Order } from '../../domain/aggregates/order.aggregate';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { OrderOrmEntity } from '../persistence/order.orm-entity';
import { OrderItemOrmEntity } from '../persistence/order-item.orm-entity';
import { ProductId } from 'src/modules/catalog/domain/value-objects/product-id';

export class OrderMapper {
  static toDomain(entity: OrderOrmEntity): Order {
    return Order.create({
      id: entity.id,
      userId: entity.userId,
      deliveryAddress: entity.deliveryAddress,
      comment: entity.comment,
      items: entity.items.map((i) =>
        OrderItem.create({
          productId: ProductId.fromString(i.productId),
          priceCents: i.priceCents,
          quantity: i.quantity,
        }),
      ),
    });
  }

  static toOrm(order: Order): OrderOrmEntity {
    const orm = new OrderOrmEntity();

    orm.id = order.id;
    orm.status = order.getStatus().toString();
    orm.totalCents = order.getTotalCents();
    orm.userId = order['userId'];
    orm.deliveryAddress = order['deliveryAddress'];
    orm.comment = order['comment'];

    orm.items = order.getItems().map((item) => {
      const i = new OrderItemOrmEntity();
      i.productId = item.productId.toString();
      i.priceCents = item.priceCents;
      i.quantity = item.getQuantity();
      return i;
    });

    return orm;
  }
}
