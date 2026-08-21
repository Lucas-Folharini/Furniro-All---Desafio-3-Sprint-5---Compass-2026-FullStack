import seedData from '../../db.json';
import { AppDataSource } from './data-source';
import { Product } from '../entities/product.entity';

export async function seedProducts() {
  const repository = AppDataSource.getRepository(Product);
  await repository.save(seedData.products.map((item) => repository.create(item)));
}
