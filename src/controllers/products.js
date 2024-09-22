import { getAllProducts } from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const data = await getAllProducts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data,
  });
};
