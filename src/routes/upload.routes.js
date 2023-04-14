import { Router } from "express";

import {
  getImage,
  updateImage,
} from "../controllers/upload.controller.js";
import {
  checkExtension,
  checkSize,
  validateFile,
  validateToken,
} from "../middlewares/index.js";
import { validateParamsUpload } from "../validators/index.js";

export const routerUpload = Router();

routerUpload.put("/:collection/:id",
  validateToken,
  validateFile,
  checkExtension("jpg", "jpeg", "png"),
  checkSize,
  validateParamsUpload,
  updateImage,
);

routerUpload.get("/:collection/:id",
  validateParamsUpload,
  getImage,
);