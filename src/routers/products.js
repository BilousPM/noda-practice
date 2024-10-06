import { Router } from 'express';
import {
  getAllProductsController,
  createProductController,
  deleteProductByIdController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const productsRouter = Router();

productsRouter.get('/', authenticate, ctrlWrapper(getAllProductsController));
productsRouter.post('/', authenticate, ctrlWrapper(createProductController));
productsRouter.delete(
  '/:productId',
  authenticate,
  ctrlWrapper(deleteProductByIdController),
);
productsRouter.patch(
  '/:productId',
  authenticate,
  ctrlWrapper(patchProductController),
);

export default productsRouter;
