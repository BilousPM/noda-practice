import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";
import { createFakeProduct } from "../utils/createFakeProduct.js";

const generateProduct = async (amount) => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);
    for (let i = 1; i <= amount; i++) {
      products.push(createFakeProduct());
    }

    await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.log(error);
  }
};

generateProduct(5);
