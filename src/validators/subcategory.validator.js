import { check } from "express-validator";

import {
  existsSubcategoryById,
  validateSubcategory,
  validateResult
} from "../middlewares/index.js";

export const validateCreateSubcategory = [
  check("name", "Ingrese un nombre de subcategoría válido")
    .notEmpty()
    .custom(validateSubcategory),
  validateResult,
];

export const validateExistsSubcategoryByIdWithBody = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsSubcategoryById),
  check("name", "Ingrese un nombre de subcategoría válido")
    .notEmpty(),
  validateResult,
];

export const validateExistsSubcategoryById = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsSubcategoryById),
  validateResult,
];