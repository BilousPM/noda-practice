import createHttpError from 'http-errors';
import {
  getAllProducts,
  createProduct,
  deleteProductById,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const data = await getAllProducts(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data,
  });
};

export const createProductController = async (req, res) => {
  const newProduct = await createProduct({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const deleteProductByIdController = async (req, res) => {
  const productId = req.params.productId;
  const removedProduct = await deleteProductById(productId, req.user._id);

  if (!removedProduct) {
    throw createHttpError(404, 'Product is not found');
  }

  // res.status(204).end();
  res.sendStatus(204);
};

export const patchProductController = async (req, res) => {
  const { productId } = req.params;
  const { body } = req;

  const updatedProduct = await updateProduct(productId, body);
  if (!updatedProduct) {
    throw createHttpError(404, 'Product is not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: updatedProduct,
  });
};
