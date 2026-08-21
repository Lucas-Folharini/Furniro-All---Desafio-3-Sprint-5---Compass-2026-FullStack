import path from 'node:path';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, '../furniro.sqlite'),
  synchronize: true,
  logging: false,
  entities: [Product]
});
