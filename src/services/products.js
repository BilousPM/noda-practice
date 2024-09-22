import { ProductColection } from '../db/models/Product.js';

export const getAllProducts = () => ProductColection.find();
export const createProduct = (productData) =>
  ProductColection.create(productData);

export const deleteProductById = (productId) =>
  ProductColection.findByIdAndDelete(productId);

export const updateProduct = (id, productData) =>
  ProductColection.findByIdAndUpdate(id, productData, { new: true });
