import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/create-product.command';
import { Inject } from '@nestjs/common';
import { PRODUCT_REPO_API, type ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product';
import { ProductId } from '../../domain/value-objects/product-id';
import { Money } from '../../domain/value-objects/money';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(@Inject(PRODUCT_REPO_API) private readonly repo: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<ProductId> {
    const product = Product.createNew({
      title: command.title,
      description: command.description,
      price: Money.fromCents(command.priceCents),
      imageUrl: command.imageUrl,
    });

    const saved = await this.repo.save(product);
    return saved.id!;
  }
}
