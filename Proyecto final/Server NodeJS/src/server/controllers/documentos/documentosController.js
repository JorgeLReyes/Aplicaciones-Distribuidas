import path from "path";
import multer from "multer";
import fs from "node:fs";

const dest = path.resolve("./src/server/uploads/");

const upload = multer({ dest });

const saveFile = (file) => {
  const newPath = path.resolve(`./src/server/uploads/${file.originalname}`);
  fs.renameSync(file.path, newPath);
  return newPath;
};

export default {
  upload,
  saveFile,
};
