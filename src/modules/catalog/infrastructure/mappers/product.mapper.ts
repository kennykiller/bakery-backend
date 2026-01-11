import { Product } from "../../domain/entities/product";
import { Money } from "../../domain/value-objects/money";
import { ProductId } from "../../domain/value-objects/product-id";
import { ProductOrmEntity } from "../persistence/product.orm-entity";

export class ProductMapper {
    static toDomain(entity: ProductOrmEntity): Product {
        return new Product(
            ProductId.fromString(entity.id),
            entity.title,
            entity.description,
            Money.fromCents(entity.priceCents),
            entity.isAvailable,
            entity.imageUrl
        )
    }

    static toOrm(product: Product): Partial<ProductOrmEntity> {
        return {
            id: product.id.toString(),
            title: product.title,
            description: product.description,
            priceCents: product.price.toCents(),
            isAvailable: product.isAvailable,
            imageUrl: product.imageUrl
        }
    }
}