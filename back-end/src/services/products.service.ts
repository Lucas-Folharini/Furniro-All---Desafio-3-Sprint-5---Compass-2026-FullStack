import { FindOptionsWhere, Like, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationDto } from '../dtos/pagination.dto';
import { ProductQueryDto } from '../dtos/product-query.dto';
import { Product } from '../entities/product.entity';
import { NotFoundException } from '../shared/utils/http-exception';

export class ProductsService {
  constructor(private readonly productRepository: Repository<Product>) {}

  async findAll(query?: ProductQueryDto): Promise<PaginationDto<Product>> {
    const filters = query ?? new ProductQueryDto();
    const { category, search, minPrice, maxPrice } = filters;

    const where: FindOptionsWhere<Product> = {};

    if (category) where.category = Like(`%${category}%`);
    if (search) where.name = Like(`%${search}%`);
    if (minPrice !== undefined) where.price = MoreThanOrEqual(minPrice);
    if (maxPrice !== undefined) where.price = LessThanOrEqual(maxPrice);

    const [products, total] = await this.productRepository.findAndCount({
      where,
      order: { [filters.sort]: filters.order },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit
    });

    return new PaginationDto(products, filters.page, filters.limit, total, Math.ceil(total / filters.limit));
  }

  async findByIdOrSlug(identifier: string): Promise<Product> {
    const where: FindOptionsWhere<Product> = {};
    const id = Number(identifier);

    if (Number.isInteger(id)) {
      where.id = id;
    } else {
      where.slug = identifier;
    }

    const product = await this.productRepository.findOne({ where });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
