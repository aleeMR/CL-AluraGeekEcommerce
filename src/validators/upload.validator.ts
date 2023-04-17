import { check } from "express-validator";

import { validateResult } from "../middlewares";

export const validateParamsUpload = [
  check("collection", "Nombre de colección inválida")
    .isIn(["users", "products"]),
  check("id", "ID inválido")
    .isMongoId(),
  validateResult,
];