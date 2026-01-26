import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { DataSource, Repository } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity';
import { POSTGRES_SOURCE } from 'src/shared/typeorm.providers';
import { Product } from '../../domain/entities/product';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  private repo: Repository<ProductOrmEntity>;

  constructor(@Inject(POSTGRES_SOURCE) ds: DataSource) {
    this.repo = ds.getRepository(ProductOrmEntity);
  }

  async findAvailable(): Promise<Product[]> {
    const rows = await this.repo.find({
      where: { isAvailable: true },
      order: { createdAt: 'DESC' },
    });

    return rows.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const row = await this.repo.findOneBy({ id });

    return row ? ProductMapper.toDomain(row) : null;
  }

  async save(product: Product) {
    const saved = await this.repo.save(ProductMapper.toOrm(product));

    return ProductMapper.toDomain(saved);
  }
}
