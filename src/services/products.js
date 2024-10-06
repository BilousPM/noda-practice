import { ProductColection } from '../db/models/Product.js';

export const getAllProducts = (userId) => ProductColection.find({ userId });
export const createProduct = (productData) =>
  ProductColection.create(productData);

export const deleteProductById = (productId, userId) =>
  ProductColection.findOneAndDelete({ _id: productId, userId });

export const updateProduct = (id, productData) =>
  ProductColection.findByIdAndUpdate(id, productData, { new: true });
