import { Router } from 'express';
import { getProductsController } from '../controllers/products.controller';

const controller = getProductsController();
const productsRoutes = Router();

productsRoutes.get('/', controller.findAll);
productsRoutes.get('/:identifier', controller.findByIdOrSlug);

export { productsRoutes };
