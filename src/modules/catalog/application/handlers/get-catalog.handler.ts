import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCatalogQuery } from '../queries/get-catalog.query';
import { Inject } from '@nestjs/common';
import { PRODUCT_REPO_API, type ProductRepository } from '../../domain/repositories/product.repository';

@QueryHandler(GetCatalogQuery)
export class GetCatalogHandler implements IQueryHandler<GetCatalogQuery> {
  constructor(@Inject(PRODUCT_REPO_API) private readonly repo: ProductRepository) {}

  execute(query: GetCatalogQuery): Promise<any> {
    return this.repo.findAvailable();
  }
}
