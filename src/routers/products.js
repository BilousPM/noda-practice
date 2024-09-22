import { Router } from 'express';
import { getAllProductsController } from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/products', ctrlWrapper(getAllProductsController));

export default productsRouter;
