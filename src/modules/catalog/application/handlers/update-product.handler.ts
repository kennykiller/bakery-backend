import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../commands/update-product.command';
import { Inject } from '@nestjs/common';
import { PRODUCT_REPO_API, type ProductRepository } from '../../domain/repositories/product.repository';
import { ProductId } from '../../domain/value-objects/product-id';
import { Money } from '../../domain/value-objects/money';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(@Inject(PRODUCT_REPO_API) private readonly repo: ProductRepository) {}
  async execute(command: UpdateProductCommand): Promise<any> {
    const product = await this.repo.findById(ProductId.fromString(command.productId).toString());

    if (!product) {
      throw new Error('Product not found');
    }

    product.update({
      title: command.title,
      description: command.description,
      price: command.priceCents !== undefined ? Money.fromCents(command.priceCents) : undefined,
      isAvailable: command.isAvailable,
      imageUrl: command.imageUrl,
    });

    await this.repo.save(product);
  }
}
