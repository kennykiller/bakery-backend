import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCatalogQuery } from '../../application/queries/get-catalog.query';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getCatalog() {
    return this.queryBus.execute(new GetCatalogQuery());
  }
}
