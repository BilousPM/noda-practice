import fs from "node:fs/promises";
import { DB_PATH } from "../constants/path.js";

const getTotalPrice = async () => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const products = JSON.parse(data);
    const totalPrice = products.reduce(
      (acc, { price }) => acc + Number(price),
      0
    );
    console.log(totalPrice);
  } catch (e) {
    console.log(e);
  }
};

getTotalPrice();
