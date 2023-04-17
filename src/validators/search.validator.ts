import { check } from "express-validator";

import { validateResult } from "../middlewares";

export const validateSearch = [
  check("collection", "Nombre de colección inválida")
    .isIn(["users", "products"]),
  validateResult,
];
