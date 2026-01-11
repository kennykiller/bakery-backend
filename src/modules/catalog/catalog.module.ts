import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CatalogController } from "./infrastructure/controllers/catalog.controller";
import { GetCatalogHandler } from "./application/handlers/get-catalog.handler";
import { PRODUCT_REPO_API } from "./domain/repositories/product.repository";
import { TypeOrmProductRepository } from "./infrastructure/persistence/typeorm-product.repository";

@Module({
    imports: [CqrsModule],
    controllers: [CatalogController],
    providers: [GetCatalogHandler, {
        provide: PRODUCT_REPO_API,
        useClass: TypeOrmProductRepository
    }],
})
export class CatalogModule {}