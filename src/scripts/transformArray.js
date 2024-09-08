import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";

const transformArray = async () => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);

    const newArr = products.map(({ description, ...item }) => item);

    await fs.writeFile(DB_PATH, JSON.stringify(newArr, null, 2), "utf-8");
  } catch (e) {
    console.log(e);
  }
};

transformArray();
