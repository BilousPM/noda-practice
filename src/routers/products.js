import { Router } from 'express';
import {
  getAllProductsController,
  createProductController,
  deleteProductByIdController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getAllProductsController));
productsRouter.post('/', ctrlWrapper(createProductController));
productsRouter.delete('/:productId', ctrlWrapper(deleteProductByIdController));
productsRouter.patch('/:productId', ctrlWrapper(patchProductController));

export default productsRouter;
