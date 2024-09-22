import { ProductColection } from '../db/models/Product.js';

export const getAllProducts = () => ProductColection.find();
