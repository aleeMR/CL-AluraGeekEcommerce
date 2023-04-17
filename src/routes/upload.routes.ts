import { Router } from "express";

import { UploadController } from "../controllers/upload.controller";
import {
  validateFile,
  validateToken,
} from "../middlewares";
import { validateParamsUpload } from "../validators";

const uploadController = new UploadController();

export const routerUpload = Router();

routerUpload.put("/:collection/:id",
  validateToken,
  validateFile("jpg", "jpeg", "png"),
  validateParamsUpload,
  uploadController.updateImage,
);

routerUpload.get("/:collection/:id",
  validateParamsUpload,
  uploadController.getImage,
);