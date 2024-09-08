import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";

const checkCategory = async () => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const firstItemCategory = products[0].category;
    const res = products.every(
      ({ category }) => category === firstItemCategory
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

checkCategory();
