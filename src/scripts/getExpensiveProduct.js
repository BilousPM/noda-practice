import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";

const getExpensiveProduct = async () => {
  const PRICE = 300;
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const expensiveProducts = products.filter(
      (product) => product.price >= PRICE
    );
    console.log(expensiveProducts);
  } catch (error) {
    console.log(error);
  }
};
getExpensiveProduct();
