import { check } from "express-validator";

import {
  existsCategoryById,
  validateCategory,
  validateResult
} from "../middlewares";

export const validateCreateCategory = [
  check("name", "Ingrese un nombre de categoría válido")
    .notEmpty()
    .custom(validateCategory),
  validateResult,
];

export const validateExistsCategoryByIdWithBody = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsCategoryById),
  check("name", "Ingrese un nombre de categoría válido")
    .notEmpty(),
  validateResult,
];

export const validateExistsCategoryById = [
  check("id", "ID inválido")
    .isMongoId()
    .custom(existsCategoryById),
  validateResult,
];