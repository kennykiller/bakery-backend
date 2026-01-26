import { Product } from '../entities/product';

export const PRODUCT_REPO_API = Symbol('PRODUCT_REPOSITORY');

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAvailable(): Promise<Product[]>;
  save(product: Product): Promise<Product>;
}
