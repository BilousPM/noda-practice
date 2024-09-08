import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";

const groupProducts = async () => {
  const groupProducts = {};

  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    products.forEach(({ name, category }) => {
      if (!groupProducts[category]) {
        groupProducts[category] = [];
      }

      groupProducts[category] = [...groupProducts[category], name];
    });

    console.log(groupProducts);
  } catch (e) {
    console.log(e);
  }
};

groupProducts();
