import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { ProductQueryDto } from '../dtos/product-query.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  findAll = async (req: Request, res: Response) => {
    const result = await this.productsService.findAll(ProductQueryDto.from(req.query));
    const products = result.data.map((product) => ProductResponseDto.from(product));

    res.status(200).json({
      data: products,
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages
    });
  };

  findByIdOrSlug = async (req: Request<{ identifier: string }>, res: Response) => {
    const result = await this.productsService.findByIdOrSlug(req.params.identifier);
    const product = ProductResponseDto.from(result);
    res.status(200).json(product);
  };
}

export function getProductsController(): ProductsController {
  const productRepository = AppDataSource.getRepository(Product);
  const productsService = new ProductsService(productRepository);
  return new ProductsController(productsService);
}
