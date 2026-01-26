import { Product } from '../../domain/entities/product';
import { Money } from '../../domain/value-objects/money';
import { ProductId } from '../../domain/value-objects/product-id';
import { ProductOrmEntity } from '../persistence/product.orm-entity';

export class ProductMapper {
  static toDomain(entity: ProductOrmEntity): Product {
    return Product.restore({
      id: ProductId.fromString(entity.id),
      title: entity.title,
      description: entity.description,
      price: Money.fromCents(entity.priceCents),
      imageUrl: entity.imageUrl,
    });
  }

  static toOrm(product: Product): Partial<ProductOrmEntity> {
    const entity = new ProductOrmEntity();
    if (product.id) {
      entity.id = product.id.toString();
    }
    entity.title = product.title;
    entity.description = product.description;
    entity.priceCents = product.price.toCents();
    entity.isAvailable = product.isAvailable;
    entity.imageUrl = product.imageUrl;
    return entity;
  }
}
