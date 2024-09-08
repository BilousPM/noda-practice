import fs from "node:fs/promises";
import { FOLDER_PATH } from "../constants/path.js";

const getFiles = async () => {
  try {
    const dir = await fs.readdir(FOLDER_PATH);
    dir.forEach((item) => console.log(item));
  } catch (e) {
    console.log(e);
  }
};

getFiles();
